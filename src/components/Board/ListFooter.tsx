import { useState } from "react"
import { UseBoardContext } from "../../context/boardcontext"

type listFooterProps = {
    boardName: string
    listName: string,
    formToggle: boolean
}
export const ListFooter: React.FC<listFooterProps> = ({boardName, listName, formToggle}) => {
const {dispatch} = UseBoardContext() 

const [cardTitle, setCardTitle] = useState('')
const [isUp, setIsUp] = useState(false) 
const textAreaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardTitle(event.target.value)
}
const submitHandler = () => {
    if(cardTitle.length > 0){
        dispatch({type: 'ADD_CARD', payload: {boardName, listName, cardTitle: cardTitle}})
        setCardTitle('')
        setIsUp(false)
    }
}


return (
    <div className="list-item--footer">
        {
            isUp 
            && 
            <div className="lif-active">
                <div className="lif-active--row">
                    <textarea name="" id="" placeholder="Enter a title for this card" autoFocus onChange={textAreaHandler}></textarea>
                </div>
                <div className="lif-active--row">
                    <button className="btn-primary" onClick={submitHandler}>Add Card</button>
                    <button className="btn-nobg" onClick={() => setIsUp(false)}>x</button>
                </div>
            </div> 
        }
        {
            !isUp && <div className="lif-unactive">
            <div className='flex1'>
                <button className="btn-nobg" onClick={() => setIsUp(true)}>Add a card</button>
            </div>
            <div className="flex0"></div>
        </div>
        }
    </div>
)
}