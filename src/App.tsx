import './App.css'
import './styles/CardViewModal.css'
import './styles/CardViewModalChecklist.css'
import './styles/stupid.css'
import './styles/sidebar.css'
import './styles/animation.css'
import { AbsoluteOverlay } from './components/absolutes'
import { CurrentBoardContainer } from './components/Board/BoardContainer'
import { BoardMenu } from './components/BoardMenu/BoardMenu'
import { SidebarContainer } from './components/sidebar/SidebarContainer'



function App() {
  
  return (
    <>
        <main className="app">
          <SidebarContainer />
          <CurrentBoardContainer />
          <BoardMenu />
        </main>
        <AbsoluteOverlay />
      
    </>
  )
}





export default App
