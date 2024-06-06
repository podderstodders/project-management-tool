import { useState } from "react"


type moveCardModalProps = {

}
export const MoveCardModal = () => {
    const [moveCardToggle, setMoveCardToggle] = useState(false)
    return (
        <div className="rhs-row--item">
            <a className="btn-darker" onClick={() => setMoveCardToggle(!moveCardToggle)}>
                <span className="rhs-row--item__svg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                <span className="rhs-row--item__text">Move</span>
            </a>
            {
                moveCardToggle
                && 
                <div className="moveModal">
                    <div className="moveModal-container">
                        <div className="moveModal-absolute">
                            <button className="btn-nobg" onClick={() => setMoveCardToggle(false)}>x</button>
                        </div>
                        <div className="moveModal-row header">
                            Move card
                        </div>
                        <div className="moveModal-row text">
                            <p>Select destination</p>
                        </div>
                        <div className="moveModal-row select">
                            <p>Board</p>
                            <select name="" id="">
                                <option value="">board1</option>
                                <option value="">board2</option>
                                <option value="">board3</option>
                                <option value="">board4</option>
                            </select>
                        </div>
                        <div className="moveModal-row select flexed">
                            <div className="bigger">
                                <p>List</p>
                                <select name="" id="">
                                    <option value="">list1</option>
                                    <option value="">list2</option>
                                    <option value="">list3</option>
                                    <option value="">list4</option>
                                </select>
                            </div>
                            <div className="smaller">
                                <p>Position</p>
                                <select name="" id="">
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                    <option value="">4</option>
                                </select>
                            </div>
                        </div>
                        <div className="moveModal-row button">
                            <button className="btn-primary">Move</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}