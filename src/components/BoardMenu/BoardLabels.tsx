
import {useState, useEffect} from "react"
import { UseBoardContext } from "../../context/boardcontext"

type boardLabelProps = {
    boardState: string 
}

export const BoardLabels: React.FC<boardLabelProps> = ({boardState}) => {
    const {state} = UseBoardContext() 
    const [localCurrentBoard, setLocalCurrentBoard] = useState(state.currentBoard)
    const activeLabels = localCurrentBoard.lists.flatMap( (list) => 
        list.items.flatMap( (card) => 
            card.labels.filter(label => label.labelIsChecked === true)
        )
    )   
    console.log(activeLabels)

    activeLabels.sort( (a,b) => {
       
        if (a.labelColorName < b.labelColorName) return -1;
        if (a.labelColorName > b.labelColorName) return 1;
        return 0;
 
    })
    console.log(activeLabels.length)

    useEffect( () => {
        setLocalCurrentBoard(state.currentBoard)
    }, [state.currentBoard])

    
    if(boardState !== 'labels') return null 
    return (
        <>
       
        <div className="app-menu--row boardlabel">
         
            <div className="boardlabel-row searchinput">
                <input type="search" name="" id="" placeholder="Search Labels..."/>
            </div>

            <div className="boardlabel-row labels">
                <p style={{fontWeight: '600'}}>Labels</p>

                <div className="labels-container">
                    {
                        activeLabels.map( (label, index) => (
                            <div className="labels-row" key={index}>
                                <div className="labels-col--color" style={{backgroundColor: label.labelColorCode}}>
                                    {
                                        label.labelTitle
                                    }
                                    <div className="labels-col--color__absolute message">Color: {label.labelColorName}, title: {label.labelTitle.length > 0 ? label.labelTitle : 'none'}</div>
                                </div>
                                <div className="labels-col--btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="#000000"/></svg>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="boardlabel-row buttons">
                <button className="btn-darker">Create a new label</button>
                <button className="btn-darker">Show more Labels</button>
            </div>
        </div>         
    
        </>
    )
}