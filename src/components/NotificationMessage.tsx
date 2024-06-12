import { ReactNode } from "react";


type notificationMessageProps = {
    type: string
    isActive: boolean
    message: ReactNode 
}
export const NotificationMessage: React.FC<notificationMessageProps> = ({type, isActive, message}) => {
    const icons: Record<string, ReactNode> = {
      success: <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#06d6a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      error: <svg width="50" height="50" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 16V14.5M12.5 9V13M20.5 12.5C20.5 16.9183 16.9183 20.5 12.5 20.5C8.08172 20.5 4.5 16.9183 4.5 12.5C4.5 8.08172 8.08172 4.5 12.5 4.5C16.9183 4.5 20.5 8.08172 20.5 12.5Z" stroke="#d00000" strokeWidth="1.2"/></svg>,
      info: <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="17" r="1" fill="#ffd166"/><path d="M12 10L12 14" stroke="#ffd166" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.44722 18.1056L10.2111 4.57771C10.9482 3.10361 13.0518 3.10362 13.7889 4.57771L20.5528 18.1056C21.2177 19.4354 20.2507 21 18.7639 21H5.23607C3.7493 21 2.78231 19.4354 3.44722 18.1056Z" stroke="#ffd166" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    }

    const notificationType = icons[type] || icons['info']
    return (
        <div className={`app-absolute-notification ${isActive ? 'active' : undefined}`}>
          <div className="absolute-notification--container">
            <div>
              <span>
                {
                  notificationType
                }
              </span>
            </div>
            <div className="message">{message}</div>
            <div>
              <button className="btn-nobg">x</button>
            </div>
          </div>
        </div>
    )
}