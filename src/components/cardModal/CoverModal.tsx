import { useEffect, useState } from "react"
import { cardProps, coverPropertiesProps } from "../../@types/board"
import { UseBoardContext } from "../../context/boardcontext"
import {PortionControl } from "./CoverCoolness"

const coverColors = {
    'seal brown': '#582F0E',
    'russet': '#7F4F24',
    'heliotrope': '#D972FF',
    'reseda green': '#656D4A',
    'verdigris': '#68B0AB',
    'blush': '#DA627D',
    'raspberry rose': '#A53860',
    'light sea green': '#2EC4B6',
    'pantone': '#E71D36',
    'orange peel': '#FF9F1C'
}

  const convertColorListToArray = (data: Record<string, string>) => {
    return Object.keys(data).map<string[]>( (color) => {  
      return [color, data[color]]
    })
  }


type coverModalProps = {
    card: cardProps
    isCool: boolean 
}

const defaultCoverProps = {
    isActive: false,
    colorName: '',
    colorCode: '',
    size: 'half'
} as coverPropertiesProps
export const CoverFeature: React.FC<coverModalProps> = ({card, isCool}) => {
    const {dispatch} = UseBoardContext()
    const [coverToggle, setCoverToggle] = useState(false)
    const colors = convertColorListToArray(coverColors)
    const [coverProps, setCoverProps] = useState<coverPropertiesProps>(defaultCoverProps) 
    
    const coverPropsSizeHandler = (size: string) => {

        if(coverProps.isActive && size === 'half' || size === 'full' && coverProps.size !== size){
            
            const newSize = size === 'half' ? 'half' : 'full'

            setCoverProps( (prev) => {
                const updatedCoverProps = {...prev, size: newSize} as coverPropertiesProps
  
                const updatedCard = {...card, coverProperties: updatedCoverProps}
                dispatch({
                    type: 'UPDATE_CARD',
                    payload: updatedCard
             
                })
                return updatedCoverProps as coverPropertiesProps
            }) 
        }
    }
    const coverPropsHandler = (name: string, code: string) => {

        const newCard = {...card}
        newCard.coverProperties = {
            isActive: true, 
            colorName: name,
            colorCode: code,
            size: 'full'
        }

        setCoverProps(newCard.coverProperties)
        //call dispatch function to update card 
        dispatch({type: 'UPDATE_CARD', payload: newCard})
    }
    const removeCoverPropsHandler = () => {
        if(coverProps.isActive){
            const updatedCard = {...card}
            updatedCard.coverProperties = undefined
            dispatch({type: 'UPDATE_CARD', payload:updatedCard})
            setCoverProps(defaultCoverProps)
        }
    }
    useEffect( () => {
        if(card.coverProperties && card.coverProperties.isActive){
            setCoverProps({
                ...card.coverProperties 
            })
        }
    }, [card.coverProperties])

    return (
        <div className="rhs-row--item">
            <a className={isCool ? 'btn-darker' : undefined} onClick={() => setCoverToggle(!coverToggle)}>
                <span className="rhs-row--item__svg">
                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0" fill="none" width="20" height="20"/>
                        <g>
                            <path d="M2.2 1h15.5c.7 0 1.3.6 1.3 1.2v11.5c0 .7-.6 1.2-1.2 1.2H2.2c-.6.1-1.2-.5-1.2-1.1V2.2C1 1.6 1.6 1 2.2 1zM17 13V3H3v10h14zm-4-4s0-5 3-5v7c0 .6-.4 1-1 1H5c-.6 0-1-.4-1-1V7c2 0 3 4 3 4s1-4 3-4 3 2 3 2zM4 17h12v2H4z"/>
                        </g>
                    </svg>
                </span>
                <span className="rhs-row--item__text">Cover</span>
            </a>
            {
            coverToggle && <div className="coverModal">
            <div className="coverModal-container">
            <div className="coverModal-row header">Cover</div>
            <div className="coverModal-row">
                <p>Size</p>
                <div className="coverModal-grid x2">
                <PortionControl isActive={coverProps.isActive} size={coverProps.size} sizeHandler={coverPropsSizeHandler}/>
                </div>
            </div>
            {
                coverProps.isActive 
                && 
                <div className="coverModal-row">
                    <button className="btn-darker" onClick={() => removeCoverPropsHandler()}>Remove cover</button>
                </div>
            }
            <div className="coverModal-row">
                <p>Colors</p>
                <div className="coverModal-grid x5">
                {
                    colors.map( (color) => (
                        <div className="colors-item" style={{border: coverProps.isActive && coverProps.colorCode === color[1] ? `2px solid blue` : `2px solid transparent`}}>
                            <div className="colors-item--container" style={{backgroundColor: color[1]}} onClick={() => coverPropsHandler(color[0], color[1])}>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
            <div className="coverModal-absolute--exitbtn">
                <button className="btn-nobg" onClick={() => setCoverToggle(false)}>x</button>
            </div>
            </div>
        </div>
            }
        </div>
    )
}