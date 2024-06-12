import { useState, useEffect} from "react"
import { BoardMenuDefaultView } from "./BoardMenuDefault"
import { BoardDescription } from "./BoardAbout"
import { UseBoardContext } from "../../context/boardcontext"
import { BoardActivity } from "./BoardActivity"
import { BoardBackground } from "./BoardBackground"
import { BoardArchive } from "./BoardArchive"
import { BoardCopyForm } from "./BoardCopy"
import { BoardRemove } from "./BoardRemove"




export const BoardMenu = () => {
    const {state, dispatch} = UseBoardContext() 
    const [currentState, setCurrentState] = useState('menu')
    const styles = {
        width: state.boardMenuToggle ? '340px' : '0',
        padding: state.boardMenuToggle ? '0.5rem' : '0',
        overflow: !state.boardMenuToggle ? 'hidden' : undefined,
    }
    const boardMenuCloserHandler = () => {
      dispatch({type: 'TOGGLE_BOARD_MENU', payload: false})
    }

    useEffect( () => {
      setCurrentState('menu')
    }, [state.boardMenuToggle])

    return (
        <article className="app-menu" style={styles}>
        
          <div className="app-menu--row centered flexed">
            <div className="magicbtn">
              <div className="magicbtn-item">
                <button className={`btn-nobg magicbtn-item-item ${currentState !== 'menu' ? 'active' : undefined}`} onClick={() => setCurrentState('menu')}>{`<`}</button>
              </div>
           
            </div>          
            <div className="centeredcentered">{currentState}</div>
            <div>
              <button className="btn-nobg" onClick={boardMenuCloserHandler}>x</button>
            </div>
          </div>
          <div className="app-menu--row divider"></div>
          <BoardMenuDefaultView currentState={currentState} stateChange={setCurrentState}/>
          <BoardDescription boardState={currentState} />
          <BoardActivity state={currentState} />
          <BoardBackground boardState={currentState}/>
          <BoardCopyForm boardState={currentState}/>
          <BoardArchive boardState={currentState} />
          <BoardRemove boardState={currentState} />
      </article>
    )
}