
import {useState } from "react"
import { listProps } from "../../@types/board"
import { LoadingAnimation } from "./LoadingAnimation"
import { UseBoardContext } from "../../context/boardcontext"
import { UseNotificationContext } from "../../context/notificationcontext"

const listColorPalette = ['#EE7EA0', '#ffA9BA', '#EA7D70', '#F69F95', '#ffAf6E', '#FFCC80', '#7D88E0', '#B5BEFS', '#ABCDDE', '#CDBDEB']
//helper function that moves an item from one index to another 


type listActionMenuProps = {
    list: listProps
    listIndex: number
    addCardToggleHandler: () => void
    parentCloseHandler: () => void;
    copyList: (list: listProps) => void;
}

type listActionMenuStatesProps = 'menu' | 'add' | 'copy' | 'move' | 'moveAll' | 'sort'


export const ListActionMenu: React.FC<listActionMenuProps> = ({list, listIndex, addCardToggleHandler, parentCloseHandler, copyList}) => {
    // const listActionMenuStates = ['menu', 'add', 'copy', 'move', 'moveAll', 'sort']
    const {state, dispatch} = UseBoardContext() 
    const {showNotification} = UseNotificationContext()
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
            const inlineMessage = `Making a copy of list ${list.listName}.`
            showNotification(inlineMessage, 'info', 1000)
            setTimeout( () => {
                showNotification(`Successfully copy ${list.listName}`, 'success', 2000)
                setCopyListSubmitPorn(false)
                copyList(newList)
            }, 2000)
        }
    }

    const [moveList, setMoveList] = useState({
        boardname: state.currentBoard.boardName, 
        positionsLength: state.currentBoard.lists.length,
        positionIndex: 0
    })

    const boardNameSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const listLength = getBoardListLengthByName(event.target.value)
        console.log(listLength)
        setMoveList({...moveList, boardname: event.target.value, positionsLength: listLength })
        //do something that sets position 
        

    }

    const boardPositionSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMoveList({...moveList, positionIndex: Number(event.target.value)})
    }

    const getBoardListLengthByName = (name: string) => {
        return state.boards.filter( (board) => board.boardName === name)[0].lists.length
    }

    const moveListHandler = () => {
        console.log(moveList)
        if(moveList.boardname === state.currentBoard.boardName) {
            if(listIndex === moveList.positionIndex) {
                showNotification('cant move it because its the same position bro!', 'error', 2000)
            } else {
                //position is different and can move 
                const tempList = state.currentBoard.lists
                const list = tempList.splice(listIndex,1)[0]
                tempList.splice(moveList.positionIndex, 0, list)
                dispatch({type: 'UPDATE_CURRENT_BOARD', payload: {...state.currentBoard, lists: tempList}})
                showNotification(`Moving List from position ${listIndex + 1} to ${moveList.positionIndex + 1}`, 'success', 2000)
                parentCloseHandler()
            }
        } else {
            const updatedCurrentList = state.currentBoard.lists 
            const removedItem = updatedCurrentList.splice(listIndex, 1)[0]
            const otherBoard = state.boards.filter( (b) => b.boardName === moveList.boardname)[0]
            otherBoard.lists.push(removedItem)
            const updatedBoards = state.boards.map( (b) => {
                if(b.boardName === otherBoard.boardName){
                    return otherBoard
                } else {
                    return b
                }
            })
            dispatch({type: 'UPDATE_BOARDS', payload: updatedBoards})
            dispatch({type: 'UPDATE_CURRENT_BOARD', payload: {...state.currentBoard, lists: updatedCurrentList}})
            showNotification(`Moving List from ${state.currentBoard.boardName} to ${moveList.boardname}`, 'success', 2000)
            parentCloseHandler()

        }
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
        showNotification(`Moving all items from ${list.listName} to your choice.`, 'success', 1500)
       
    }

    const listWatchHandler = () => {
        if(!list.isWatching) {
            dispatch({type: 'UPDATE_LIST', payload: {...list, isWatching: true}})
            showNotification(`Now watching ${list.listName}`, 'success', 1200)
        } else {
            dispatch({type: 'UPDATE_LIST', payload: {...list, isWatching: false}})
            showNotification(`No more watching of ${list.listName}`, 'info', 1200)
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
        showNotification(`Sorting list`, 'info', 1000)
        await delay(2000)
        showNotification(`Successfully sorted list`, 'success', 2000)
    }


    const transformedBoardNames = state.boards.filter( (b) => b.boardName !== state.currentBoard.boardName).map( (b) => b.boardName)
    transformedBoardNames.unshift(state.currentBoard.boardName)

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
                        <select name="" id="" className="movelistselect" onChange={boardNameSelectHandler}>
                            {
                                transformedBoardNames.map( (name, i) => (
                                                <option value={name} key={i}>{name}</option>
                                            ))
                            }
                        </select>
                    </div>
                    <div className="listactionmenu-row selection movelist">
                       
                        {
                            moveList.boardname === state.currentBoard.boardName
                            && 
                            <>
                             <p>Position</p>
                             <select name="" id="" onChange={boardPositionSelectHandler}>
                            {
                                moveList.positionsLength >= 0 
                                ?
                                Array(moveList.positionsLength).fill(69).flatMap( (_, i) => <option key={i} value={i}>{i+1}</option>)
                                : 
                                undefined
                            }
                            </select>
                            </>
                           
                        }
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