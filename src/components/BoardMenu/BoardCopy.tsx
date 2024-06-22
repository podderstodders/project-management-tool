import { useState, useEffect } from "react"
import { UseBoardContext } from "../../context/boardcontext"
import { UseNotificationContext } from "../../context/notificationcontext"


type boardCopyProps = {
    boardState: string
}

export const BoardCopyForm: React.FC<boardCopyProps> = ({ boardState }) => {
    const {state, dispatch} = UseBoardContext() 
    const {showNotification} = UseNotificationContext()
    const [newBoard, setNewBoard] = useState({
        name: '',
        keepCards: false
    })
    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBoard({ ...newBoard, name: event.target.value })
    }
    const keepCardsCheckedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        setNewBoard({...newBoard, keepCards: event.target.checked})
    }
    const delay = (ms: number) => new Promise( resolve => setTimeout(resolve, ms))
    const copyBoardHandler = async () => {
        if(newBoard.name.length > 0){
       
            const currentBoard = {...state.currentBoard}
            currentBoard.id = state.boards.length 
            currentBoard.boardName = newBoard.name
            currentBoard.description = '' 
           if(!newBoard.keepCards){
            currentBoard.lists = [] 
           }
           
           dispatch({type: 'TOGGLE_BOARD_MENU', payload: false})
           showNotification(`Copying board ${state.currentBoard.boardName} to new board ${currentBoard.boardName}, ${newBoard.keepCards ? ' and their kids' : ' and done.'}`, 'info', 3000)
           await delay(1000)
           dispatch({type: 'ADD_BOARD', payload: currentBoard})



        }
    }

    useEffect( () => {
        setNewBoard({name: '', keepCards: false})
    }, [])
    if (boardState !== 'copy board') return null
    return (
        <>
            <div className="app-menu--row boardcopyform">
                <div className="boardcopyform-row">
                    <label htmlFor="boardtitle">Title</label>
                    <input type="text" name="boardtitle" id="boardtitle" value={newBoard.name} placeholder={`Like "New Pets Onboarding" for example`} onChange={nameChangeHandler} />
                </div>
                <div className="boardcopyform-row">
                    <label htmlFor="keepcards">
                        <input type="checkbox" name="keepcards" id="keepcards" onChange={keepCardsCheckedHandler} />
                        Keep Cards
                    </label>
                </div>
                <div className="boardcopyform-row">
                    <button className={newBoard.name.length === 0 ? 'disabled' : 'btn-primary'} onClick={copyBoardHandler}>Create</button>
                </div>
            </div>
            <div className="app-menu--row divider"></div>
            <div className="app-menu--row items">


            </div>
        </>
    )
}