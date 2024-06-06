import { boardColors, categorizedColors } from "../../data/colors"
import { useState } from "react";


type boardColorModalProps = {
    gradient: string 
    closeHandler: () => void;
    setPreviewHandler: (p: string, s: string, g: string, e: string) => void;
}
export const BoardColorModal: React.FC<boardColorModalProps> = ({gradient, closeHandler, setPreviewHandler}) => {
    const firstSix = boardColors.slice(6, 12);
    const [moreColors, setMoreColors] = useState(false)
    return (
    <div className="app-sidebar--absolute morecolors">
        <div className="colormodal-container">
            {
                moreColors 
                && 
                <div className="colormodal-absolute--btn left">
                    <button className="btn-nobg" onClick={() => setMoreColors(false)}>{`<`}</button>
                </div>
            }
            <div className="colormodal-absolute--btn right">
                <button className="btn-nobg" onClick={closeHandler}>x</button>
            </div>
            <div className="colormodal-row header">
                <div>Board background</div>
            </div>
            {
                !moreColors 
                && 
                <div className="colormodal-row selection">
                <div className="colormodal-selection-row header">
                    <p>Colors</p>
                    <button className="btn-darker" onClick={() => setMoreColors(!moreColors)}>See More</button>
                </div>
                <div className="colormodal-selection-row grid3x">
                    {
                        firstSix.map( (c) => <div style={{backgroundImage: c.gradient }} onClick={() => setPreviewHandler(c.primary, c.secondary, c.gradient, c.emoji)}>
                            <div className="xyz-absolute">{c.emoji}</div>
                            {
                                c.gradient === gradient 
                                && 
                                <div className="colors-row--item selected">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 7.34189C18.6095 6.95136 17.9763 6.95136 17.5858 7.34189L10.3407 14.587C9.95016 14.9775 9.31699 14.9775 8.92647 14.587L6.38507 12.0456C5.99454 11.6551 5.36138 11.6551 4.97085 12.0456C4.58033 12.4361 4.58033 13.0693 4.97085 13.4598L7.51774 16C8.68969 17.1689 10.5869 17.1677 11.7574 15.9974L19 8.7561C19.3905 8.36558 19.3905 7.73241 19 7.34189Z" fill="#0F0F0F"/>
                                    </svg>
                                </div>
                            }
                        </div>)
                    }
                </div>
            </div>
            }
            {
                moreColors 
                && 
                <div className="colormodal-row moreview">
                   {
                    Object.keys(categorizedColors).map( (color) => (
                        <div className="moreview-row">
                            <p>{color}</p>
                            <div className="moreview-items">
                            {
                                categorizedColors[color].map( (c, i) => (
                                    <div className="moreview-item" style={{backgroundImage: c.gradient}} key={i} onClick={() => setPreviewHandler(c.primary, c.secondary, c.gradient, c.emoji)}>
                                        <div className="vbc123">{c.emoji}</div>
                                        {
                                            c.gradient === gradient 
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
                            </div>
                        </div>
                    ))
                   }
            </div>
            }
        </div>
    </div>
    )
}