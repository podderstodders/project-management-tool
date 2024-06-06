import { createContext, useContext, ReactNode, useState} from 'react'

type OverlayContextProps = {
    isVisible: boolean;
    showOverlay: () => void;
    hideOverlay: () => void;
}


const OverlayContext = createContext<OverlayContextProps | undefined>(undefined)

export const UserOverlayContext = () => {
    const context = useContext(OverlayContext)
    if(!context) {
        throw new Error('useOverlay must be used within an OverlayProvider');
    }
    return context;
}

export const OverlayProvider: React.FC<{ children: ReactNode}> = ({children}) => {
    const [isOverlayActive, setIsOverLayActive] = useState(false) 

    const showOverlay = () => setIsOverLayActive(true)
    const hideOverlay = () => setIsOverLayActive(false)

    return (
        <OverlayContext.Provider value={{isVisible: isOverlayActive,showOverlay, hideOverlay }}>{children}</OverlayContext.Provider>
    )
}