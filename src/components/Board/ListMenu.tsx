
import { ReactNode, useState } from "react"
import { listProps } from "../../@types/board"
import { LoadingAnimation } from "./LoadingAnimation"
import { UseBoardContext } from "../../context/boardcontext"

const listColorPalette = ['#EE7EA0', '#ffA9BA', '#EA7D70', '#F69F95', '#ffAf6E', '#FFCC80', '#7D88E0', '#B5BEFS', '#ABCDDE', '#CDBDEB']
//helper function that moves an item from one index to another 


type listActionMenuProps = {
    list: listProps
    addCardToggleHandler: () => void
    parentCloseHandler: () => void;
    copyList: (list: listProps) => void;
    setNotification: (str: ReactNode, type: string) => void 
}

type listActionMenuStatesProps = 'menu' | 'add' | 'copy' | 'move' | 'moveAll' | 'sort'


export const ListActionMenu: React.FC<listActionMenuProps> = ({list, addCardToggleHandler, parentCloseHandler, copyList, setNotification}) => {
    // const listActionMenuStates = ['menu', 'add', 'copy', 'move', 'moveAll', 'sort']
    const {state, dispatch} = UseBoardContext() 
    const [currentState, setCurrentState] = useState<listActionMenuStatesProps>('menu')
    //copy list name tings 
    const [copyListName, setCopyListName] = useState(list.listName)
    const [copyListSubmitPorn, setCopyListSubmitPorn] = useState(false) 
    const copyListNameHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCopyListName(event.target.value)
    }
    const copyListSubmitFn = () => {
        if(copyListName.length > 0){
       
            setCopyListSubmitPorn(true)
            const newList = {...list, listName: copyListName, id: state.currentBoard.lists.length} as listProps
            const inlineNotificationMessage = <span>Copying list <span className="blood underlined">{list.listName}</span> to new list <span className="trees underlined">{copyListName}</span></span>
            setNotification(inlineNotificationMessage, 'success')
            setTimeout( () => {
                setCopyListSubmitPorn(false)
                copyList(newList)
            }, 2000)
        }
    }
    const getListLengthFromBoardName = (name: string) => {
        const listLength = state.boards.find( (b) => b.boardName === name)
    }
    const [moveList, setMoveList] = useState({
        boardname: state.currentBoard.boardName, 
        position: -1 
    })

    const boardNameSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMoveList({...moveList, boardname: event.target.value})
    }

    const boardPositionSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMoveList({...moveList, position: Number(event.target.value)})
    }

    //id refers to the destination list 

    const moveAllHandler = (id: number) => {
        const updatedLists = state.currentBoard.lists.map( (local) => {
            if(local.id === list.id) {
                return {...local, items: []}
            } else if(local.id === id) {
                return {...local, items: [...local.items, ...list.items]}
            } else {
                return local
            }
        })
        dispatch({type: "UPDATE_LISTS", payload: updatedLists})
        parentCloseHandler()
        const inlineMessage = <span>Moving all items from <span className="underlined">{list.listName}</span> to <span className="green underlined">list {id}</span></span>
        setNotification(inlineMessage, 'warning')
       
    }

    const listWatchHandler = () => {
        if(!list.isWatching) {
            dispatch({type: 'UPDATE_LIST', payload: {...list, isWatching: true}})
            const inlineMessage = <span>Now watching <span className="green underlined">{list.listName}</span></span>
            setNotification(inlineMessage, 'success')
        } else {
            dispatch({type: 'UPDATE_LIST', payload: {...list, isWatching: false}})
            const inlineMessage = <span>No more watching of <span className="red underlined">{list.listName}</span></span>
            setNotification(inlineMessage, 'info')
        }
    }
    const delay = (ms: number) => new Promise( resolve => setTimeout(resolve, ms))
    const listColorChange = async (color: string) => {
        if(color.length > 0){
            const updatedList = {...list, listColor: color}
            await delay(500)
            dispatch({type: 'UPDATE_LIST', payload: updatedList})
        }
    }

    const removeListColorChange = async () => {
        const updatedList = {...list, listColor: undefined}
        dispatch({type: 'UPDATE_LIST', payload: updatedList})
    }

    //sorting function 
    const sortList = (type: string) => {
        switch(type) {
            case 'ascending':
                return list.items.sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
            case 'descending':
                return list.items.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
            case 'name':
                return list.items.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return list.items
        }
    }

    const sortListHandler =async  (type: string) => {
        const sortedList = sortList(type) 
        const updatedList = {...list, items: sortedList}
        dispatch({type: 'UPDATE_LIST', payload: updatedList})
        parentCloseHandler() 
        let inlineMessage = <span>Sorting List</span>
        setNotification(inlineMessage, 'warning')
        await delay(2000)
        inlineMessage = <span>Listed Successfully Sorted!</span>
        setNotification(inlineMessage, 'success')
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
                        {
                            list.items.length > 0 
                            && 
                            <>
                            <div className={`link-item`} onClick={() => setCurrentState('move')}>Move list</div>
                            <div className={`link-item`} onClick={() => setCurrentState('moveAll')}>Move all cards in this list</div>
                            <div className="link-item" onClick={() => setCurrentState('sort')}>Sort by ...</div>
                            </>  
                        }
                        <div className={`link-item ${list.isWatching ? 'watchActive' : undefined}`} onClick={() => listWatchHandler()}>Watch</div>
                    </div>
                    <div className="listactionmenu-row divider">
                        <div className="divider-container"></div>
                    </div>
                    <div className="listactionmenu-row listcolor">
                        <p>Change list color</p>
                        <div className="listcolor-row grid">
                        
                            {
                                listColorPalette.map( (color, i) => (
                                    <div key={i} className="listcolor-col" style={{border: list.listColor === color ? '1px solid black' : '1px solid transparent'}}>
                                        <div className="colcoloritem" style={{backgroundColor: color}} onClick={() => listColorChange(color)}></div>
                                    </div>
                                ))
                            }
                           
                        </div>
                        <div className="listcolor-row buttons">
                            <button className={`btn-darker ${list.listColor === undefined ? 'disabled' : undefined}`} onClick={removeListColorChange}>x Remove Color</button>
                        </div>
                    </div>
                    <div className="listactionmenu-row divider">
                        <div className="divider-container"></div>
                    </div>
                    <div className="listactionmenu-row links">
                        <div className="link-item">Archive this list</div>
                        {
                            list.items.length > 0 
                            && 
                            <div className="link-item">Archive all cards in this list</div>
                        }
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
                        <select name="" id="" className="movelistselect">
                            {
                                state.boards.map( (board, i) => (
                                                <option value={board.boardName} key={i}>{board.boardName}</option>
                                            ))
                            }
                        </select>
                    </div>
                    <div className="listactionmenu-row selection movelist">
                        <p>Position</p>
                        <select name="" id="" >
                          
                        </select>
                    </div>
                    <div className="listactionmenu-row button movelist">
                        <button className="btn-primary">Move</button>
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
                            state.currentBoard.lists.map( (l) => (
                                <div className={`selectionlist-item ${l.listName === list.listName ? 'muted' : undefined}`} onClick={() => moveAllHandler(l.id)}>{l.listName}{l.listName === list.listName ? '-(current)' : undefined}</div>
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
                        <div className="selectionlist-item" onClick={() => sortListHandler('ascending')}>Date created (newest first)</div>
                        <div className="selectionlist-item" onClick={() => sortListHandler('descending')}>Date created (oldest first)</div>
                        <div className="selectionlist-item" onClick={() => sortListHandler('name')}>Card name (alphabetically)</div>
                    </div>
                </div>
            }
    </div>
    )
}