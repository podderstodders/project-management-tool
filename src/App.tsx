import { useState, useEffect} from 'react'
import './App.css'
import './CardViewModal.css'
import './CardViewModalChecklist.css'
import './stupid.css'
import './sidebar.css'
import './animation.css'
import { AbsoluteOverlay } from './components/absolutes'
import { SidebarBoardContainer } from './components/sidebar/BoardItem'
import { CurrentBoardContainer } from './components/Board/BoardContainer'
import { AddBoardModal } from './components/sidebar/AddBoardModal'
import { UseBoardContext } from './context/boardcontext'


function App() {
  const {state, dispatch} = UseBoardContext() 
  const currentBoard = state.currentBoard
  const [sidebarToggle, setSidebarToggle] = useState(false)
  const [sidebarInstructionToggle, setSidebarInstructionToggle] = useState(false)
  const [newBoardToggle, setNewBoardToggle] = useState(false)
 
  const changeBoard = (str: string) => {
    const theBoard = state.boards.find( (board) => board.boardName === str)
    if(theBoard){
      dispatch({type: 'UPDATE_CURRENT_BOARD', payload: theBoard})
    }
  }
  const sidebarToggleHandler = () => {
    if(sidebarToggle){
      
      setNewBoardToggle(false)
      setTimeout( () => {
        setSidebarToggle(false) 
      }, 200)
    } else {
      setSidebarToggle(true)
    }
  }
  // const delay = (ms: number) => new Promise( resolve => setTimeout(resolve, ms))
  // const addNewBoardHandler = () => {
    
  // }
  useEffect( () => {

    if(sidebarInstructionToggle) {
      const interval = setInterval( () => {
        setSidebarInstructionToggle(false)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [sidebarInstructionToggle])

  if(!currentBoard) {
    return <h2> something went wrong </h2>
  }
  
  return (
    <>
        <header className="app-header"></header>
        <main className="app">
          <aside className="app-sidebar"  style={{width: sidebarToggle ? '17.5rem' : '1.2rem', transition: sidebarToggle ? 'width 0.5s ease' : 'width 0.3s ease-out', cursor: !sidebarToggle ? 'pointer' : ''}} onClick={!sidebarToggle ? () => setSidebarToggle(true) : undefined}>
            <div className={`app-sidebar--openIcon ${sidebarToggle ? 'opened' : 'unopened'}`} onClick={sidebarToggleHandler} onMouseEnter={() => setSidebarInstructionToggle(true)} onMouseLeave={() => setSidebarInstructionToggle(false)}>
              <svg className="sideBar-svgCircle" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 7L15 12L10 17" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {
              sidebarInstructionToggle ? (sidebarToggle ? <div className="app-sidebar--openMessage active">
              <p>Collapse sidebar</p>
            </div> : <div className="app-sidebar--openMessage">
              <p>Expand sidebar</p>
            </div> ) : null
          }
          {
            sidebarToggle 
            &&  
            <div className="app-sidebar--container">
              <div className="app-sidebar--header">
                <ReallyStupidJuan />
                <div>Your's Workspace</div>
              </div>
              <SidebarBoardContainer current={currentBoard.boardName} changeBoardHandler={changeBoard} newBoardToggle={() => setNewBoardToggle(!newBoardToggle)}/>
              {
                newBoardToggle
                && 
                <AddBoardModal  closeHandler={() => setNewBoardToggle(false)}/>
              }
              
            </div>
          }
          </aside>
          <CurrentBoardContainer sidebarCloser={() => setNewBoardToggle(false)}/>
        </main>
        <AbsoluteOverlay />
      
    </>
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
export default App