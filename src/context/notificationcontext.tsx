import { createContext, useContext, ReactNode, useState, useCallback} from 'react'
import { NotificationMessage } from '../components/NotificationMessage';

type notificationContext = {
    showNotification: (message: string, type: string, time: number) => void
}


const NotificationContext = createContext<notificationContext | undefined>(undefined)

export const UseNotificationContext = () => {
    const context = useContext(NotificationContext)
    if(!context) {
        throw new Error('UseNotificationContext must be used within an NotificationProvider');
    }
    return context;
}

export const NotificationProvider: React.FC<{ children: ReactNode}> = ({children}) => {
    const [notification, setNotification] = useState({
        message: '',
        type: '', 
        visible: false
    })

    const showNotification = useCallback( (message: string, type: string, time: number): void => {
        setNotification({message, type, visible: true})
        setTimeout( () => {
            setNotification({message: '', type: '', visible: false})
        }, time)
    },[])


    return (
        <NotificationContext.Provider value={{showNotification}}>
            {children}
            
            <NotificationMessage message={notification.message} type={notification.type} isActive={notification.visible}/>
          
        </NotificationContext.Provider>
    )
}