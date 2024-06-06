import { UserOverlayContext } from "../context/overlaycontext"

export const AbsoluteOverlay = () => {
    const {isVisible} = UserOverlayContext() 

    if(!isVisible) {
      return null;
    }
    
    return (
      <div className="app-absolute--gobal"></div>
    )
  }
  

