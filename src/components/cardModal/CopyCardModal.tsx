import { useState } from "react"
import { cardProps } from "../../@types/board"
type copyCardModalProps = {
    card: cardProps,
    boardName: string,
    parentListName: string
}

type copyCardModalDataType = {
    title: string, 
    keepLabels?: boolean 
    keepChecklists?: boolean 
    destinationBoard: string 
    destinationList: string 
    listPosition: number 
}
export const CopyCardModal: React.FC<copyCardModalProps> = ({card, boardName, parentListName}) => {
    const [cardModalToggle, setCardModalToggle] = useState(false)
    return (
        <div className="rhs-row--item">
            <a className="btn-darker" onClick={() => setCardModalToggle(!cardModalToggle)}>
                <span className="rhs-row--item__svg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z" fill="#0F0F0F"/>
                        <path d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z" fill="#0F0F0F"/>
                    </svg>
                </span>
                <span className="rhs-row--item__text">Copy</span>
            </a>
            {
                cardModalToggle
                && 
                <article className="copyModal">
                    <div className="copyModal-container">
                        <div className="copyModal-row header">
                            <p>Copy card</p>
                            <button className="btn-nobg" onClick={() => setCardModalToggle(false)}>x</button>
                        </div>
                        <div className="copyModal-row input">
                            <p className="copyModal-row--smallText">Title</p>
                            <textarea name="" id=""></textarea>
                        </div>
                        <div className="copyModal-row checkbox">
                            <p className="copyModal-row--smallText">Keep...</p>
                            <ul>
                                {/* {
                                    card.
                                } */}
                                <li>
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor="">yomomoms</label>
                                </li>
                                <li>
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor="">yomomoms</label>
                                </li>
                            </ul>
                        </div>
                        <div className="copyModal-row selecter">
                            <p className="copyModal-row--smallText">Copy to ...</p>
                            <div className="selecter-row">
                                <p className="copyModal-row--bigText">Board</p>
                                <select name="" id="">
                                    <option value="">trello clone</option>
                                    <option value="">fdafdasfsdf</option>
                                    <option value="">fdafsafsf</option>
                                </select>
                            </div>
                            <div className="selecter-row two">
                                <div className="bigger">
                                    <p className="copyModal-row--bigText">List</p>
                                    <select name="" id="">
                                        <option value="">list 1</option>
                                        <option value="">list 2</option>
                                        <option value="">list 3</option>
                                    </select>
                                </div>
                                <div className="smaller">
                                    <p className="copyModal-row--bigText">Position</p>
                                    <select name="" id="">
                                        <option value="">1</option>
                                        <option value="">2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="copyModal-row button">
                            <button className="btn-primary">Create Card</button>
                        </div>
                        
                    </div>
                </article>
            }
        </div>
    )
}