import { useState, useEffect } from "react"
type boardDescriptionProps = {
    state: string 
}
export const BoardDescription: React.FC<boardDescriptionProps> = ({state}) => {

    const [descriptionToggler, setDescriptionToggler] = useState(false)


    useEffect( () => {
      return () => {
        setDescriptionToggler(false)
      }
    }, [state])

    if(state !== 'about') return null 
    return (
        <>
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
              <div className="textarea-placeholder" onClick={() => setDescriptionToggler(true)}>Add a description to let your teammates know what this board is used for. You'll get bonus points if you add instructions for how to collaborate!</div>
            }
            {
              descriptionToggler 
              && 
              <div className="textarea-editor">
                <textarea name="" id="" placeholder="lorem ipsolor dolor yomoms" autoFocus></textarea>
                <div className="textarea-editor--footer">
                  <div className="taef-lhs">
                    <button className="btn-primary">Save</button>
                    <button className="btn-nobg" onClick={() => setDescriptionToggler(false)}>Cancel</button>
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