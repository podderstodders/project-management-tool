import { boardColors } from "../../data/colors"
import { useState } from "react"
import { BoardColorModal } from "./BoardColorModal";
import { boardColorProps, boardProps } from "../../@types/board";

type addBoardModalProps = {
    closeHandler: () => void;
}

const defaultBoardColorState = {
    primary: '',
    secondary: '',
    gradient: '', 
    emoji: '',
} as boardColorProps

export const AddBoardModal: React.FC<addBoardModalProps> = ({ closeHandler}) => {
    const firstFive = boardColors.slice(0, 5)
    const [boardTitle, setBoardTitle] = useState('')
    const [previewGradient, setPreviewGradient] = useState(defaultBoardColorState)

    const boardTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBoardTitle(event.target.value)
    }
    const [moreColorsToggle, setMoreColorsToggle] = useState(false)

    const bgColorHandler = (p: string, s: string, g: string, e: string) => {
        setPreviewGradient({primary: p, secondary: s, gradient: g, emoji: e})
    }

    const addBoard = () => {
       if(boardTitle.length > 0 && previewGradient.primary.length > 0) {
            const newBoard: boardProps = {
                boardName: boardTitle, 
                isFavorite: false, 
                description: '', 
                isWatching: false, 
                lists: [],
                boardColor: previewGradient
            }
       }
    }

    return (
        <div className="app-sidebar--absolute addboard">
            <div className="addboard-container">
                {
                    moreColorsToggle
                    && 
                    <BoardColorModal gradient={previewGradient.gradient} closeHandler={() => setMoreColorsToggle(false)} setPreviewHandler={bgColorHandler}/>
                }
                <div className="addboard-absolute exitbtn">
                    <button className="btn-nobg" onClick={closeHandler}>x</button>
                </div>
                <div className="addboard-row header">Create board</div>
                <div className="addboard-row divider"></div>
                <div className="addboard-row preview">
                    <div className="preview-container" style={{backgroundImage: previewGradient.gradient.length > 0 ? previewGradient.gradient : undefined}}>
                        <div className="preview-item a"></div>
                        <div className="preview-item b"></div>
                        <div className="preview-item c"></div>
                    </div>
                </div>
                <div className="addboard-row colors">
                    <p>Background</p>
                    <div className="colors-container">
                    <div className="colors-row grid6x">
                        {
                            firstFive.map( (color, i) => (
                                <div key={i} style={{backgroundImage: color.gradient}} onClick={() => setPreviewGradient({...color})}>
                                   {
                                    previewGradient.gradient === color.gradient
                                    && 
                                    <div className="colors-row--item selected">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 7.34189C18.6095 6.95136 17.9763 6.95136 17.5858 7.34189L10.3407 14.587C9.95016 14.9775 9.31699 14.9775 8.92647 14.587L6.38507 12.0456C5.99454 11.6551 5.36138 11.6551 4.97085 12.0456C4.58033 12.4361 4.58033 13.0693 4.97085 13.4598L7.51774 16C8.68969 17.1689 10.5869 17.1677 11.7574 15.9974L19 8.7561C19.3905 8.36558 19.3905 7.73241 19 7.34189Z" fill="#0F0F0F"/>
                                        </svg>
                                   </div>
                                   }
                                </div>
                            ))
                        }
                        <div className="colors-row--add" onClick={() => setMoreColorsToggle(!moreColorsToggle)}>
                        
                            <span>
                            <svg fill="#000000" height="24" width="32" id="Layer_1" data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path className="cls-1" d="M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z"/>
                            </svg>
                            </span>
                        
                        </div>
                    </div>
                    </div>
                </div>
                <div className="addboard-row input">
                    <label htmlFor="">Board Title</label>
                    <input type="text" name="" id="" value={boardTitle} onChange={boardTitleHandler}/>
                </div>
            
                <div className="addboard-row button">
                    <button className={`btn-darker ${boardTitle.length === 0 ? 'disabled' : undefined}`}>Create</button>
                </div>
            </div>
        </div>
    )
}