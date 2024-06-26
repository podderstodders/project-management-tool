import { useState, useEffect} from "react"
import { UseBoardContext } from "../../context/boardcontext"
import { boardProps, boardColorProps } from "../../@types/board"
import { SidebarBoardContainer } from "./BoardItem"
import { AddBoardModal } from "./AddBoardModal"


export const SidebarContainer = () => {
    const {state, dispatch} = UseBoardContext()
    const [sidebarInstructionToggle, setSidebarInstructionToggle] = useState(false)
    const [newBoardToggle, setNewBoardToggle] = useState(false)
    const sidebarToggleHandler = () => {
        if(state.sidebarToggle){
          
          setTimeout( () => {
            dispatch({type: 'TOGGLE_SIDEBAR', payload: false})
          }, 200)
        } else {
            dispatch({type: 'TOGGLE_SIDEBAR', payload: true})
        }
      }
      const changeBoard = async (boardname: string) => {
    
        await delay(500)
        dispatch({type: 'LOAD_BOARD', payload: {board: state.currentBoard, boardName: boardname}})
      }
    
       const delay = (ms: number) => new Promise( resolve => setTimeout(resolve, ms))
       //also check if boardName is present in boards 
      const addNewBoardHandler = async (boardName: string, colors: boardColorProps) => {
    
        dispatch({type: 'UPDATE_HAPPENING', payload: true})
        dispatch({type: 'TOGGLE_BOARD_MENU', payload: false})
        await delay(2000);
        dispatch({type: 'UPDATE_HAPPENING', payload: false})
        setNewBoardToggle(false)
        
        await delay(300) 
        dispatch({type: 'UPDATE_COLORS', payload: colors})
        //effect 4 
        
        //lastly, a dispatch to update the global board 
        const newBoard: boardProps = {
          id: state.boards.length,
          boardName: boardName, 
          isFavorite: false, 
          description: '',
          isWatching: false,
          lists: state.currentBoard.lists,
          boardColor: colors
        }
        dispatch({type: 'UPDATE_CURRENT_BOARD', payload: newBoard})
        await delay(500)
        dispatch({type: 'ADD_BOARD', payload: {...newBoard, lists: []}}) 
        await delay(700)
        dispatch({type: 'UPDATE_CURRENT_BOARD', payload: {...newBoard, lists: []}})
      }
    useEffect( () => {

    if(sidebarInstructionToggle) {
        const interval = setInterval( () => {
        setSidebarInstructionToggle(false)
        }, 1000)

        return () => clearInterval(interval)
    }
    }, [sidebarInstructionToggle])

    useEffect ( () => {
      return () => {
        setNewBoardToggle(false)
      }
    }, [state.sidebarToggle])
    return (
        <aside className="app-sidebar"  style={{width: state.sidebarToggle ? '17.5rem' : '1.2rem', transition: state.sidebarToggle ? 'width 0.5s ease' : 'width 0.3s ease-out', cursor: !state.sidebarToggle ? 'pointer' : '', backgroundColor: state.colors.asideColor}} onClick={!state.sidebarToggle ? () => dispatch({type: 'TOGGLE_SIDEBAR', payload: true}) : undefined}>
            <div className={`app-sidebar--openIcon ${state.sidebarToggle ? 'opened' : 'unopened'}`} onClick={sidebarToggleHandler} onMouseEnter={() => setSidebarInstructionToggle(true)} onMouseLeave={() => setSidebarInstructionToggle(false)}>
            {
                state.sidebarToggle 
                ?<svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h3a2 2 0 0 1 2 2v1m-5 13h3a2 2 0 0 0 2-2v-1M4.425 19.428l6 1.8A2 2 0 0 0 13 19.312V4.688a2 2 0 0 0-2.575-1.916l-6 1.8A2 2 0 0 0 3 6.488v11.024a2 2 0 0 0 1.425 1.916zM9.001 12H9m7 0h5m0 0-2-2m2 2-2 2"/></svg>
                : <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h3a2 2 0 0 1 2 2v1m-5 13h3a2 2 0 0 0 2-2v-1M4.425 19.428l6 1.8A2 2 0 0 0 13 19.312V4.688a2 2 0 0 0-2.575-1.916l-6 1.8A2 2 0 0 0 3 6.488v11.024a2 2 0 0 0 1.425 1.916zM9.001 12H9m12 0h-5m0 0 2-2m-2 2 2 2"/></svg>

            }
            </div>

            {
            sidebarInstructionToggle ? (state.sidebarToggle ? <div className="app-sidebar--openMessage active">
            <p>Collapse sidebar</p>
            </div> : <div className="app-sidebar--openMessage">
            <p>Expand sidebar</p>
            </div> ) : null
        }
        {
            state.sidebarToggle 
            &&  
            <div className="app-sidebar--container">
            <div className="app-sidebar--header">
                <ReallyStupidJuan />
                <div>
                  <p>Your Dashboard</p>
                </div>
            </div>
            <SidebarBoardContainer current={state.currentBoard.boardName} changeBoardHandler={changeBoard} newBoardToggle={() => setNewBoardToggle(!newBoardToggle)}/>
            {
                newBoardToggle
                && 
                <AddBoardModal  addNewBoard={addNewBoardHandler} closeHandler={() => setNewBoardToggle(false)}/>
            }
            
            </div>
        }
      </aside>
    )
}

const ReallyStupidJuan = () => {
    return (
      <div className="sidebar-header--svg"><span className="s1">6</span>
        <span className="s2">9</span>
        <div className="absolute-tester1"><span className="s3">6</span><span className="s4">9</span></div>
        <div className="absolute-tester2"><span className="s5">6</span><span className="s6">9</span></div>
        <div className="absolute-tester3"><span className="s7">6</span><span className="s8">9</span></div>
      </div>
    )
  }