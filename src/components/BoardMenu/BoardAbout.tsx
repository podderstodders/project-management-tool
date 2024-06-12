import { useState, useEffect } from "react"
import { UseBoardContext } from "../../context/boardcontext"
type boardDescriptionProps = {
    boardState: string 
}
export const BoardDescription: React.FC<boardDescriptionProps> = ({boardState}) => {
    const {state, dispatch} = UseBoardContext()

    const [localCurrentBoard, setLocalCurrentBoard] = useState(state.currentBoard)
    const [descriptionToggler, setDescriptionToggler] = useState(false)
    const [titleToggler, setTitleToggler] = useState(false)
  

    const titleChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLocalCurrentBoard({...localCurrentBoard, boardName: event.target.value})
    }

    const titleSubmitHandler = () => {
      if(localCurrentBoard.boardName.length > 0 || localCurrentBoard.boardName !== state.currentBoard.boardName) {
        dispatch({type: 'UPDATE_CURRENT_BOARD', payload: {...state.currentBoard, boardName: localCurrentBoard.boardName}})
        setTitleToggler(false)
      }
    }
    const descriptionChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLocalCurrentBoard({...localCurrentBoard, description: event.target.value})
    }

    const descriptionSubmitHandler = () => {
      if(localCurrentBoard.description !== state.currentBoard.description){
        dispatch({type: 'UPDATE_CURRENT_BOARD', payload: {...state.currentBoard, description: localCurrentBoard.description}})
        setDescriptionToggler(false)
      }
    }
    useEffect( () => {
      return () => {
        setDescriptionToggler(false)
        setTitleToggler(false)
      }
    }, [boardState])

    useEffect( () => {
      setLocalCurrentBoard(state.currentBoard)
    }, [state.currentBoard])


    if(boardState !== 'about') return null 
    return (
        <>
        <div className="app-menu--row titleAbout">
          <div className="titleAbout-row flexed">
            <div className="titleAbout-flexed--lhs">
              <div className="items-row--svg">
                <svg width="35" height="35" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="about-white" fill="#000000" transform="translate(42.666667, 42.666667)">
                        <path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51168 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.154987,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51168 331.154987,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.44,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.44,384 213.333333,384 Z M240.04672,128 C240.04672,143.46752 228.785067,154.666667 213.55008,154.666667 C197.698773,154.666667 186.713387,143.46752 186.713387,127.704107 C186.713387,112.5536 197.99616,101.333333 213.55008,101.333333 C228.785067,101.333333 240.04672,112.5536 240.04672,128 Z M192.04672,192 L234.713387,192 L234.713387,320 L192.04672,320 L192.04672,192 Z" id="Shape"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <div>Title</div>
            </div>
            <div className="titleAbout-flexed--rhs">
              <button className="btn-darker" onClick={() => setTitleToggler(!titleToggler)}>Edit</button>
            </div>
          </div>
          <div className="titleAbout-row editable" onClick={() => setTitleToggler(true)}>
            {
              !titleToggler && state.currentBoard.boardName
            }
            {
              titleToggler && 
              <div className="titleAbout-row texteditor">
                <textarea name="boardname" id="boardname" value={localCurrentBoard.boardName} onChange={titleChangeHandler} placeholder={localCurrentBoard.boardName} autoFocus onBlur={titleSubmitHandler}></textarea>
                <div className="texteditor-actions">
                  <button className="btn-primary" onClickCapture={titleSubmitHandler}>Save</button>
                  <button className="btn-darker" onClickCapture={() => setTitleToggler(false)}>Cancel</button>
                </div>
              </div>
            }
           
          </div>
        </div>
        <div className="app-menu--row divider"></div>
        <div className="app-menu--row items">
          <div className="items-row2">
            <div className="items-row--svg">
              <svg width="35" height="35" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="about-white" fill="#000000" transform="translate(42.666667, 42.666667)">
                      <path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51168 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.154987,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51168 331.154987,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.44,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.44,384 213.333333,384 Z M240.04672,128 C240.04672,143.46752 228.785067,154.666667 213.55008,154.666667 C197.698773,154.666667 186.713387,143.46752 186.713387,127.704107 C186.713387,112.5536 197.99616,101.333333 213.55008,101.333333 C228.785067,101.333333 240.04672,112.5536 240.04672,128 Z M192.04672,192 L234.713387,192 L234.713387,320 L192.04672,320 L192.04672,192 Z" id="Shape"></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className="items-row--text">
              <p>Description</p>
            </div>
          </div>
          <div className="boardabout-textarea">
            {
              !descriptionToggler 
              && 
              <div className="textarea-placeholder" onClickCapture={() => setDescriptionToggler(true)}>
                {
                  state.currentBoard.description.length === 0 ? `Add a description to let your teammates know what this board is used for. You'll get bonus points if you add instructions for how to collaborate!` : state.currentBoard.description
                }
              </div>
            }
            {
              descriptionToggler 
              && 
              <div className="textarea-editor">
                <textarea name="boarddescription" id="boarddescription" value={localCurrentBoard.description} onChange={descriptionChangeHandler}  placeholder={localCurrentBoard.description} autoFocus onBlur={descriptionSubmitHandler}></textarea>
                <div className="textarea-editor--footer">
                  <div className="taef-lhs">
                    <button className="btn-primary" onClick={descriptionSubmitHandler}>Save</button>
                    <button className="btn-nobg" onClickCapture={() => setDescriptionToggler(false)}>Cancel</button>
                  </div>
                  <div className="taef-rhs">
                    <button className="btn-darker">Formatting Help</button>
                  </div>
                </div>
              </div>
            }
          </div>          
        </div>
        
        
        </>
    )
}