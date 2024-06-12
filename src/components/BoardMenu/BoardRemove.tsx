import { UseBoardContext } from "../../context/boardcontext"

type boardRemoveProps = {
    boardState: string 
}

export const BoardRemove: React.FC<boardRemoveProps> = ({boardState}) => {
    const {state, dispatch} = UseBoardContext() 
    const delay = (ms: number) => new Promise( resolve => setTimeout(resolve, ms))
    const removeBoardHandler = async () => {
        const filteredBoards = state.boards.filter( (b) => b.boardName !== state.currentBoard.boardName)
        dispatch({type: 'TOGGLE_BOARD_MENU', payload: false})
        await delay(1000)
        dispatch({type: 'UPDATE_CURRENT_BOARD', payload: filteredBoards[0]})
        await delay(2000)
        dispatch({type: 'UPDATE_BOARDS', payload: filteredBoards})
       
    }

    if(boardState !== 'remove board') return null 
    return (
        <>
        <div className="app-menu--row boardremove">
          <p>R u sure? </p>
          <button className="btn-danger" style={{width: '100%'}} onClick={removeBoardHandler}>Close Board</button>
        </div>  
  
        </>
    )
}