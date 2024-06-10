
import { boardColors } from "../../data/colors"
import { UseBoardContext } from "../../context/boardcontext"
import { boardColorProps } from "../../@types/board"

type boardBackgroundProps = {
    boardState: string 
}

export const BoardBackground: React.FC<boardBackgroundProps> = ({boardState}) => {
    const {state, dispatch} = UseBoardContext() 
    const firstHalf = boardColors.slice(0, 10)
    const secondHalf = boardColors.slice(10)

    const changeBackground = (data: boardColorProps) => {
       setTimeout( () => {
        dispatch({type: 'UPDATE_COLORS', payload: data})
        dispatch({type: "UPDATE_CURRENT_BOARD", payload: {...state.currentBoard, boardColor: data}})
       }, 2000)
    }
    if(boardState !== 'change background') return null 
    return (
        <>
       
        <div className="app-menu--row boardbackgroundselection">
            {
                firstHalf.map( (color, i) => (
                    <div className="boardbackgroundselection-item" style={{backgroundImage: color.gradient}} onClick={() => changeBackground(color)} key={i}>
                        <div className="boardbackgroundselection-absolute--emoji">{color.emoji}</div>    
                        {
                            color.primary === state.colors.asideColor 
                            &&
                            <div className="boardbackgroundselection-absolute--selected">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 7.34189C18.6095 6.95136 17.9763 6.95136 17.5858 7.34189L10.3407 14.587C9.95016 14.9775 9.31699 14.9775 8.92647 14.587L6.38507 12.0456C5.99454 11.6551 5.36138 11.6551 4.97085 12.0456C4.58033 12.4361 4.58033 13.0693 4.97085 13.4598L7.51774 16C8.68969 17.1689 10.5869 17.1677 11.7574 15.9974L19 8.7561C19.3905 8.36558 19.3905 7.73241 19 7.34189Z" fill="#0F0F0F"/>
                                </svg>
                            </div>
                        }
                    </div>  
                ))
            }
            <div className="boardbackgroundselection-divider"></div>
            <div className="boardbackgroundselection-fw">
                {
                    secondHalf.map( (color, i) => (
                        <div className="boardbackgroundselection-item2" style={{backgroundImage: color.gradient}} onClick={() => changeBackground(color)} key={i}>
                            {
                            color.primary === state.colors.asideColor 
                            &&
                            <div className="boardbackgroundselection-absolute--selected">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 7.34189C18.6095 6.95136 17.9763 6.95136 17.5858 7.34189L10.3407 14.587C9.95016 14.9775 9.31699 14.9775 8.92647 14.587L6.38507 12.0456C5.99454 11.6551 5.36138 11.6551 4.97085 12.0456C4.58033 12.4361 4.58033 13.0693 4.97085 13.4598L7.51774 16C8.68969 17.1689 10.5869 17.1677 11.7574 15.9974L19 8.7561C19.3905 8.36558 19.3905 7.73241 19 7.34189Z" fill="#0F0F0F"/>
                                </svg>
                            </div>
                        }
                        </div>
                    ))
                }
            </div>
        </div>         
    
        </>
    )
}