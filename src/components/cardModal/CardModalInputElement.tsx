import { useState, useEffect } from "react"
import { cardProps } from "../../@types/board"
import { UseBoardContext } from "../../context/boardcontext"
type cardModalInputElementProps = {
    card: cardProps,
  }
  
export const CardModalTitleInput: React.FC<cardModalInputElementProps> = ({ card}) => {
    const {dispatch} = UseBoardContext() 
    const [cardTitle, setCardTitle] = useState('')
    const cardTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCardTitle(event.target.value)
    }
    useEffect(() => {
      setCardTitle(card.title)
    }, [card.title])

    //i need a dispatch for updating 
    const onBlurHandler = () => {
        if(cardTitle.length === 0 || cardTitle === card.title){
            setCardTitle(card.title)
        }else {
            const newCard = {...card, title: cardTitle} as cardProps
            dispatch({type: 'UPDATE_CARD', payload: newCard})
        }
    }

  
    return (
      <div className="titleInput" onBlur={onBlurHandler}>
        <input type="text" name="cardTitle" id="cardTitle" value={cardTitle} onChange={cardTitleHandler}/>
      </div>
    )
  }


  export const CardModalDescriptionInput: React.FC<cardModalInputElementProps> = ({ card}) => {
    const {dispatch} = UseBoardContext() 
    const [cardDescription, setCardDescription] = useState('')

    const cardDescriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardDescription(event.target.value)
    }
    useEffect(() => {
        setCardDescription(card.description)
    }, [card.description])

    //i need a dispatch for updating 
    const onBlurHandler = () => {
        if(cardDescription.length === 0 || cardDescription === card.description){
  
            setCardDescription(card.description)
        }else {
         
            const newCard = {...card, description: cardDescription} as cardProps
            dispatch({type: 'UPDATE_CARD', payload: newCard})
        }
    }

  
    return (
      <div className="titleInput" onBlur={onBlurHandler}>
        <input type="text" name="cardDescription" id="cardDescription" value={cardDescription} onChange={cardDescriptionHandler} style={{textDecoration: cardDescription.length === 0 ? 'underline' : undefined}} placeholder="Enter a description for this card right here"/>
      </div>
    )
  }