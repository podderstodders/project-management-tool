
import { ReactNode, useState } from "react"
import { boardProps, listProps } from "../../@types/board"
import { LoadingAnimation } from "./LoadingAnimation"
import { UseBoardContext } from "../../context/boardcontext"


//helper function that moves an item from one index to another 

const moveListInPlace = (lists: listProps[], fromIndex: number, toIndex: number) => {
    const copy = [...lists]
    if(fromIndex >= 0 && fromIndex <  copy.length && toIndex >= 0 && toIndex < copy.length) {
        //equivalent to doing const item = copy.splice(fromIndex, 1)[0] 
        const [item] = copy.splice(fromIndex, 1)
        copy.splice(toIndex, 0, item)
    }

    return copy 
}


//helper function, returns an array of options based on the boardName
const BoardPositions = (boardName: string, boards: boardProps[]) => {

    const board = boards.find( (board) => board.boardName === boardName)
    if(!board){
       throw new Error('wtf')
    } 
    return board.lists.length 
}

type listActionMenuProps = {
    boardName: string 
    list: listProps
    listIndex: number 
    addCardToggleHandler: () => void
    parentCloseHandler: () => void;
   
    setWatching: (list: listProps) => void
    copyList: (list: listProps) => void;
    setNotification: (str: ReactNode) => void 
}

type listActionMenuStatesProps = 'menu' | 'add' | 'copy' | 'move' | 'moveAll' | 'sort'


export const ListActionMenu: React.FC<listActionMenuProps> = ({boardName, list, listIndex, addCardToggleHandler, parentCloseHandler, setWatching, copyList, setNotification}) => {
    console.log('on mount list index is ', listIndex)
    // const listActionMenuStates = ['menu', 'add', 'copy', 'move', 'moveAll', 'sort']
    const {state, dispatch} = UseBoardContext() 
    const [currentState, setCurrentState] = useState<listActionMenuStatesProps>('menu')
    const [listWatch, setListWatch] = useState<boolean>(list.isWatching !== undefined ? list.isWatching : false )
    //copy list name tings 
    const [copyListName, setCopyListName] = useState(list.listName)
    const [copyListSubmitPorn, setCopyListSubmitPorn] = useState(false) 
    const copyListNameHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCopyListName(event.target.value)
    }
    const copyListSubmitFn = () => {
        if(copyListName.length > 0){
            let parsedListName = copyListName
            if(parsedListName === list.listName){
                const randomId = Math.floor(Math.random() * (10 - 0 + 1)) + 1;
                parsedListName = `${parsedListName}_${randomId}`
            }

            setCopyListSubmitPorn(true)
            const newList = {...list, listName: parsedListName} as listProps
            const inlineNotificationMessage = <span>Copying list <span className="blood underlined">{list.listName}</span> to new list <span className="trees underlined">{parsedListName}</span></span>
            setNotification(inlineNotificationMessage)
            setTimeout( () => {
                setCopyListSubmitPorn(false)
                copyList(newList)
            }, 2000)
        }
    }

     // end of copy list name tings 
     //initially its set to the current boardName 
     //position can be the prop listIndex, because to invoke this movelist feature,
     // this component would need to be toggle, and we have the specific list index. 
     const [moveListVals, setMoveListVals] = useState({
        boardName: boardName,
        position: listIndex 
     })

     const moveListBoardSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
            console.log('board selected: ', event.target.value)
            setMoveListVals({...moveListVals, boardName: event.target.value})
     }

     const moveListBoardPositionSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('Board position selected: ', event.target.value)
        setMoveListVals({...moveListVals, position: Number(event.target.value)})
    }

    //confusing b/c im rendering index + 1, and also the key value was i+1, instead of i.
    // <option key={i}>{i+1}</option> is more correct

    const moveListHandler = () => {
        console.log('initial horny')
        console.log('list index is ', listIndex, 'selected index is ', moveListVals.position)
        if(moveListVals.boardName !== boardName){
            //delete from current list 
            //splice into other list 
            setMoveListVals({boardName: list.listName, position: -1})
        } else {
            if(moveListVals.position !== listIndex) {
                  //source index - listIndex 
                  // destination Index - moveListVals.position 
                  //move within the same list 
                  const board = state.boards.find( (board) => board.boardName === boardName)
                  if(board) {
                    const lists = moveListInPlace(board.lists, listIndex, moveListVals.position)
                    dispatch({type: 'UPDATE_LISTS', payload: {boardName: boardName, lists}})
                  }
                  parentCloseHandler()
                  setMoveListVals({boardName: list.listName, position: -1})
            } else {
                //do nothing 
                const {boardName, position} = moveListVals 
                console.log(`${boardName} - position:${position} is happening`)
                console.log('do nothing horny')
                parentCloseHandler() 
                setMoveListVals({boardName: list.listName, position: -1})
            }
            
        }
    }

    const moveAllHandler = (str: string) => {
        if(str.length > 0) {
            const theBoard = state.boards.find( (board) => board.boardName === boardName)
            if(theBoard) {
                const theList = theBoard.lists.map( (lll) => {
                    if(lll.listName === list.listName) {
                        return {...lll, items: []}
                    } else if(lll.listName === str){
                        return {...lll, items: [...lll.items, ...list.items]}
                    } else {
                        return lll
                    }
                })
                dispatch({type: "UPDATE_LISTS", payload: {boardName: boardName, lists: theList}})
                parentCloseHandler()
                const inlineMessage = <span>Moving all items from <span className="underlined">{list.listName}</span> to <span className="green underlined">{str}</span></span>
                setNotification(inlineMessage)
            }
        }
    }

    const listWatchHandler = () => {
        if(!listWatch) {
            const updatedList = {...list, isWatching: true} as listProps
            setWatching(updatedList)
            setListWatch(true) 
            const inlineMessage = <span>Now watching <span className="green underlined">{list.listName}</span></span>
            setNotification(inlineMessage)
        } else {
            const updatedList = {...list, isWatching: false} as listProps
            setWatching(updatedList)
            setListWatch(false) 
            const inlineMessage = <span>No more watching of <span className="red underlined">{list.listName}</span></span>
            setNotification(inlineMessage)
        }
    }

    return ( 
        <div className="list-item--header__absolute">
            {
                currentState === 'menu'
                && 
                <div className="listactionmenu">
                    <div className="listactionmenu-row header">List Actions</div>
                    <div className="listactionmenu-row links">
    
                        <div className="link-item" onClick={addCardToggleHandler}>Add card</div>
                        <div className="link-item" onClick={() => setCurrentState('copy')}>Copy list</div>
                        <div className="link-item" onClick={() => setCurrentState('move')}>Move list</div>
                        <div className={`link-item ${list.items.length === 0 ? 'empty' : undefined}`} onClick={list.items.length > 0 ? () => setCurrentState('moveAll') : undefined}>Move all cards in this list</div>
                        <div className="link-item" onClick={() => setCurrentState('sort')}>Sort by ...</div>
                        <div className={`link-item ${listWatch ? 'watchActive' : undefined}`} onClick={() => listWatchHandler()}>Watch</div>
                    </div>
                    <div className="listactionmenu-row divider">
                        <div className="divider-container"></div>
                    </div>
                    <div className="listactionmenu-row listcolor">
                        <p>Change list color</p>
                    </div>
                    <div className="listactionmenu-row divider">
                        <div className="divider-container"></div>
                    </div>
                    <div className="listactionmenu-row links">
                        <div className="link-item">Archive this list</div>
                        <div className="link-item">Archive all cards in this list</div>
                    </div>
                    <div className="listactionmenu-absolute--exitbtn">
                        <button className="btn-nobg" onClick={parentCloseHandler}>x</button>
                    </div>
                </div>
            }
            {
                currentState === 'copy'
                && 
                <div className="listactionmenu copylist">
                    <div className="listactionmenu-row header copylist">
                        <button className="btn-nobg" onClick={() => setCurrentState('menu')}>{`<`}</button>
                        <span>Copy list</span>
                        <button className="btn-nobg" onClick={parentCloseHandler}>x</button>
                    </div>
                    <div className="listactionmenu-row input copylist">
                        <p>Name</p>
                        <textarea name="" id="" value={copyListName} onChange={copyListNameHandler}></textarea>
                    </div>
                    <div className="listactionmenu-row button">
                        <button className="btn-primary" onClick={copyListSubmitFn}>
                            {
                                copyListSubmitPorn 
                                ? 
                                <LoadingAnimation /> 
                                : 
                                `Create list`
                            }
                        </button>
                    </div>
                </div>
            }
           
            {
                currentState === 'move'
                && 
                <div className="listactionmenu movelist">
                    <div className="listactionmenu-row header movelist">
                        <button className="btn-nobg" onClick={() => setCurrentState('menu')}>{`<`}</button>
                        <span>Move list</span>
                        <button className="btn-nobg" onClick={parentCloseHandler}>x</button>
                    </div>
                    <div className="listactionmenu-row selection movelist">
                        <p>Board</p>
                        <select name="" id="" className="movelistselect" onChange={moveListBoardSelectHandler}>
                            {
                                state.boards.map( (board) => <option value={board.boardName} style={{color: board.boardName === boardName ? 'red': undefined}}>{board.boardName}{board.boardName === boardName ? ' - (current)' : undefined}</option>)
                            }
                        </select>
                    </div>
                    <div className="listactionmenu-row selection movelist">
                        <p>Position</p>
                        <select name="" id="" onChange={moveListBoardPositionSelectHandler}>
                           {
                             Array(BoardPositions(moveListVals.boardName, state.boards)).fill(69).map((n, i) => <option value={i}>{i + 1}{i === listIndex && moveListVals.boardName === boardName ? ' - (current)' : undefined}</option>)
                           }
                        </select>
                    </div>
                    <div className="listactionmenu-row button movelist">
                        <button className="btn-primary" onClick={moveListHandler}>Move</button>
                    </div>
                </div>
            }

            {
                currentState === 'moveAll'
                && 
                <div className="listactionmenu moveAll">
                    <div className="listactionmenu-row header moveAll">
                        <button className="btn-nobg" onClick={() => setCurrentState('menu')}>{`<`}</button>
                        <span>Move all cards in list</span>
                        <button className="btn-nobg" onClick={parentCloseHandler}>x</button>
                    </div>
                    <div className="listactionmenu-row selectionlist moveAll">
                        {
                            state.boards.find( board => board.boardName === boardName)
                                        ?.lists.map( l => (
                                            <div className={`selectionlist-item ${l.listName === list.listName ? 'muted' : undefined}`} onClick={() => moveAllHandler(l.listName)}>{l.listName}{l.listName === list.listName ? '-(current)' : undefined}</div>
                                        ))
                        }
                    </div>
                </div>
            }

{
                currentState === 'sort'
                && 
                <div className="listactionmenu moveAll">
                    <div className="listactionmenu-row header moveAll">
                        <button className="btn-nobg" onClick={() => setCurrentState('menu')}>{`<`}</button>
                        <span>Sort list</span>
                        <button className="btn-nobg" onClick={parentCloseHandler}>x</button>
                    </div>
                    <div className="listactionmenu-row selectionlist moveAll">
                        <div className="selectionlist-item">Date created (newest first)</div>
                        <div className="selectionlist-item">Date created (oldest first)</div>
                        <div className="selectionlist-item">Card name (alphabetically)</div>
                    </div>
                </div>
            }
    </div>
    )
}