import { ReactNode } from "react";


type notificationMessageProps = {
    isActive: boolean
    message: ReactNode 
    closeHandler: () => void; 
}
export const NotificationMessage: React.FC<notificationMessageProps> = ({isActive, message, closeHandler}) => {

    return (
        <div className={`app-absolute-notification ${isActive ? 'active' : undefined}`}>
          <div className="absolute-notification--container">
            <div>
              <span>
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="anc-icon" id="Vector" d="M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#01fe32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
            <div className="message">{message}</div>
            <div>
              <button className="btn-nobg" onClick={closeHandler}>x</button>
            </div>
          </div>
        </div>
    )
}