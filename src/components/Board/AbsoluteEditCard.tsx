import { cardProps } from "../../@types/board"
import { useState, useEffect } from "react"
type absoluteEditCardProps = {
    isActive: boolean
    card: cardProps
    cardId: number,
    openCardModal: () => void; 
    closeHandler: () => void;
    saveCardHandler: (str: string, card: cardProps) => void;
  }
  
export const AbsoluteEditCard: React.FC<absoluteEditCardProps> = ({isActive, card, cardId, openCardModal, closeHandler, saveCardHandler}) => {
    const [cardTitle, setCardTitle] = useState('')
    const setCardTitleHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCardTitle(event.target.value)
    }


    useEffect( () => {
      setCardTitle(card.title)
    }, [card.title])

    const onSubmitHandler = () => {
      if(cardTitle.length > 0){
  
        saveCardHandler(cardTitle, card)

      }
    }

    
    if(isActive && card.id === cardId) {
      return (
        <div className="list-item--card__absolute--editcard">
              <div className="editcard-container">
                <textarea name="" id="" rows={4} value={cardTitle} onChange={setCardTitleHandler}></textarea>
                <div className="editcard-absolute--savebtn">
                  <button className="btn-primary" onClick={onSubmitHandler}>Save</button>
                  <button className="btn-third" onClick={closeHandler}>Exit</button>
                </div>
                <div className="editcard-absolute--menu">
                  <div className="editcard-menu--container">
                    <div className="editcard-menu--item" onClick={openCardModal}>
                        <span>&#128512;</span>
                        <span>Open Card</span>
                    </div>
                    <div className="editcard-menu--item">
                        <span>&#128513;</span>
                        <span>Edit labels</span>
                    </div>
                    
                    <div className="editcard-menu--item">
                        <span>&#128515;</span>
                        <span>Change cover</span>
                    </div>
                   
                    <div className="editcard-menu--item">
                        <span>&#128518;</span>
                        <span>Copy</span>
                    </div>
                    <div className="editcard-menu--item">
                        <span>&#128519;</span>
                        <span>Archive</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      )
    }
    
    return null;
  }
  