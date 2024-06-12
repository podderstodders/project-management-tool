import './App.css'
import './CardViewModal.css'
import './CardViewModalChecklist.css'
import './stupid.css'
import './sidebar.css'
import './animation.css'
import { AbsoluteOverlay } from './components/absolutes'
import { CurrentBoardContainer } from './components/Board/BoardContainer'
import { UseBoardContext } from './context/boardcontext'
import { BoardMenu } from './components/BoardMenu/BoardMenu'
import { SidebarContainer } from './components/sidebar/SidebarContainer'



function App() {
  const {state} = UseBoardContext() 

  return (
    <>
        <header className="app-header" style={{backgroundColor: state.colors.headerColor}}></header>
        <main className="app">
          <SidebarContainer />
          <CurrentBoardContainer tester123={() => console.log('hey dawg. yeah dawg. free water.')}/>
          <BoardMenu active={state.boardMenuToggle}/>
        </main>
        <AbsoluteOverlay />
      
    </>
  )
}





export default App
