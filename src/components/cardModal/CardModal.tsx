
import { boardProps, cardProps } from "../../@types/board"
import { TheCheckList } from "../checklist/theChecklist"
import { useState, useEffect } from "react"
import { CardModalDescriptionInput, CardModalTitleInput } from "./CardModalInputElement"
import { LabelsMenu } from "./LabelsMenu"
import { CoverFeature } from "./CoverModal"
import { UseBoardContext } from "../../context/boardcontext"
import { CheckListMenu } from "./ChecklistMenu"
import { CopyCardModal } from "./CopyCardModal"
import { MoveCardModal } from "./MoveCardModal"

type cardViewModalProps = {
    isActive: boolean, 
    cardId: number,

    closeHandler: () => void,
}



const findCardById = (board: boardProps, cardId: number): cardProps | undefined=> {

  const lists = board.lists
  for(const list of lists){
    const card = list.items.find( (card) => card.id === cardId) 
    if(card) {
      return card 
    }
  }
  return undefined
}


export const CardViewModal: React.FC<cardViewModalProps> = ({isActive, cardId, closeHandler}) => {
    const {state, dispatch} = UseBoardContext()  
    const card = findCardById(state.currentBoard, cardId)
    
    const [isWatching, setIsWatching] = useState(false)
    const [labelMenuToggler, setLabelMenuToggler] = useState({
      active: false, 
      index: -1
    })


    const labelMenuToggleHandler = (index: number) => {

      if(labelMenuToggler.active){
          if(labelMenuToggler.index !== index){
            //modal currently open, but clicked on another button 
            setLabelMenuToggler({active: false, index: -1})
            setTimeout( () => {
              setLabelMenuToggler({active: true, index: index})
            }, 20)

          } else {
            //just clicked on the same thing, so i would just 
            setLabelMenuToggler({
              active: false,
              index: -1
            })
          }
      } else {
        //not active at all 
        setLabelMenuToggler({
          active: true,
          index: index
        })
        
      }
    }

    const isWatchingHandler = () => {
      if(!isWatching) {
        const updatedCard = {...card, isWatching: true} as cardProps
        dispatch({type: 'UPDATE_CARD', payload: updatedCard})
        setIsWatching(true)
      } else {
        //currently true 
        const updatedCard = {...card, isWatching: false} as cardProps
        dispatch({type: 'UPDATE_CARD', payload: updatedCard})
        setIsWatching(false)
      }
    }



    useEffect( () => {
      setLabelMenuToggler({
        active: false,
        index: -1
      })
    }, [])
   
    if(isActive && card !== undefined) {
 
        return (
            <div className="app-absolute--item">
              <div className="absoluteItem-container">
                 {
                  card.coverProperties 
                  && 
                  card.coverProperties.isActive 
                  && 
                  <div className="cardcover" style={{backgroundColor: card.coverProperties?.colorCode ?? 'none'}}>
                    <div className="cover-absolute--btn">
                        <CoverFeature card={card} isCool={false}/>
                    </div>
                  </div>
                 }
                  <div className="cardview-container">
                    <div className="lhs">
                      <div className="lhs-row header">
                        <div className="lhs-item--svg">
                          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16 10H3M20 6H3M20 14H3M16 18H3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="lhs-item--text">
                            <CardModalTitleInput card={card}/>
                            <div className="lhs-item--textblock">
                              <div>in list</div>
                              <div style={{textDecoration: 'underline'}}>yomoms</div>
                              {
                                card.isWatching 
                                && 
                                <div>
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 18.75C6.17 18.75 3.43 12.56 3.31 12.3C3.27039 12.2049 3.25 12.103 3.25 12C3.25 11.897 3.27039 11.7951 3.31 11.7C3.43 11.44 6.17 5.25 12 5.25C17.83 5.25 20.57 11.44 20.69 11.7C20.7296 11.7951 20.75 11.897 20.75 12C20.75 12.103 20.7296 12.2049 20.69 12.3C20.57 12.56 17.83 18.75 12 18.75ZM4.83 12C5.42 13.15 7.83 17.25 12 17.25C16.17 17.25 18.58 13.15 19.17 12C18.58 10.85 16.17 6.75 12 6.75C7.83 6.75 5.42 10.85 4.83 12Z" fill="#000000"/>
                                    <path d="M12 15.25C11.3572 15.25 10.7289 15.0594 10.1944 14.7023C9.65994 14.3452 9.24338 13.8376 8.99739 13.2437C8.75141 12.6499 8.68705 11.9964 8.81245 11.366C8.93785 10.7355 9.24738 10.1564 9.7019 9.7019C10.1564 9.24738 10.7355 8.93785 11.366 8.81245C11.9964 8.68705 12.6499 8.75141 13.2437 8.99739C13.8376 9.24338 14.3452 9.65994 14.7023 10.1944C15.0594 10.7289 15.25 11.3572 15.25 12C15.2474 12.8611 14.9041 13.6863 14.2952 14.2952C13.6863 14.9041 12.8611 15.2474 12 15.25ZM12 10.25C11.6539 10.25 11.3155 10.3526 11.0278 10.5449C10.74 10.7372 10.5157 11.0105 10.3832 11.3303C10.2508 11.6501 10.2161 12.0019 10.2836 12.3414C10.3512 12.6809 10.5178 12.9927 10.7626 13.2374C11.0073 13.4822 11.3191 13.6489 11.6586 13.7164C11.9981 13.7839 12.3499 13.7492 12.6697 13.6168C12.9895 13.4843 13.2628 13.26 13.4551 12.9722C13.6474 12.6845 13.75 12.3461 13.75 12C13.7474 11.5367 13.5622 11.0931 13.2345 10.7655C12.9069 10.4378 12.4633 10.2526 12 10.25Z" fill="#000000"/>
                                  </svg>
                                </div>
                              }
                            </div>
              
                            <p>Card id: {card.id}</p>
                            
                        </div>
                      </div>
                      <div className="lhs-row addons">
                        <div className="lhs-item--svg">
                        
                        </div>
                        <div className="addons-container">
                          {
                            card.labels.length > 0 
                            ? 
                            <div className="labels">
                              <p className="xyz">Labels</p>
                              <div className="labels-container">
                                {
                                  card.labels
                                      .filter( (label) => label.labelIsChecked === true)
                                      .map( (label, index) => (
                                        <div className="labels-item" style={{backgroundColor: label.labelColorCode}} onClick={() => labelMenuToggleHandler(index)} key={index}>
                                          <div className="labels-item--absoluteMessage">Color: {label.labelColorName}, title: {label.labelTitle.length > 0 ? label.labelTitle : 'none'}</div>
                                        </div>
                                    ))
                                    
                                }
                                <div className="labels-item2" onClick={() => labelMenuToggleHandler(69)}>+</div>
                              </div>
                              {
                                labelMenuToggler.active 
                                && 
                                labelMenuToggler.index !== 96 
                                && 
                                <LabelsMenu card={card} parentCloseHandler={() => setLabelMenuToggler({active: false, index: -1})}/>
                              }
                            </div> 
                            : 
                            null
                          }
                          <div className="notifications">
                            <p className="xyz">Notifications</p>
                            <div className="notifications-action" onClick={isWatchingHandler}>
                              <div>
                                <span>
                                  <svg width="30" height="30" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.5 12.714C18.5 15.081 15.366 17 11.5 17C7.634 17 4.5 15.081 4.5 12.714C4.5 10.347 7.634 8.42896 11.5 8.42896C15.366 8.42896 18.5 10.347 18.5 12.714Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.2501 12.714C13.2647 13.4249 12.8477 14.074 12.1951 14.3562C11.5424 14.6384 10.7839 14.4977 10.2759 14.0002C9.76792 13.5027 9.61148 12.7472 9.8801 12.0889C10.1487 11.4305 10.789 11.0001 11.5001 11C11.9594 10.9952 12.4019 11.1731 12.7301 11.4945C13.0583 11.816 13.2453 12.2546 13.2501 12.714V12.714Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10.75 8.429C10.75 8.84321 11.0858 9.179 11.5 9.179C11.9142 9.179 12.25 8.84321 12.25 8.429H10.75ZM12.25 5C12.25 4.58579 11.9142 4.25 11.5 4.25C11.0858 4.25 10.75 4.58579 10.75 5H12.25ZM18.2931 7.05471C18.4813 6.68571 18.3347 6.23403 17.9657 6.04586C17.5967 5.85769 17.145 6.00428 16.9569 6.37329L18.2931 7.05471ZM15.5199 9.19129C15.3317 9.5603 15.4783 10.012 15.8473 10.2001C16.2163 10.3883 16.668 10.2417 16.8561 9.87271L15.5199 9.19129ZM6.04314 6.37329C5.85497 6.00428 5.40329 5.85769 5.03429 6.04586C4.66528 6.23403 4.51869 6.68571 4.70686 7.05471L6.04314 6.37329ZM6.14386 9.87271C6.33203 10.2417 6.78371 10.3883 7.15271 10.2001C7.52172 10.012 7.66831 9.5603 7.48014 9.19129L6.14386 9.87271ZM12.25 8.429V5H10.75V8.429H12.25ZM16.9569 6.37329L15.5199 9.19129L16.8561 9.87271L18.2931 7.05471L16.9569 6.37329ZM4.70686 7.05471L6.14386 9.87271L7.48014 9.19129L6.04314 6.37329L4.70686 7.05471Z" fill="#000000"/>
                                  </svg> 
                                </span>
                              </div>
                              <div className="notifications-middle">Watch</div>
                              {
                                card.isWatching 
                                ?
                                <div className="notifications-active">
                                <span>
                                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 7.34189C18.6095 6.95136 17.9763 6.95136 17.5858 7.34189L10.3407 14.587C9.95016 14.9775 9.31699 14.9775 8.92647 14.587L6.38507 12.0456C5.99454 11.6551 5.36138 11.6551 4.97085 12.0456C4.58033 12.4361 4.58033 13.0693 4.97085 13.4598L7.51774 16C8.68969 17.1689 10.5869 17.1677 11.7574 15.9974L19 8.7561C19.3905 8.36558 19.3905 7.73241 19 7.34189Z" fill="#FFFFFF"/>
                                  </svg>
                                </span>
                              </div>
                              : 
                              undefined
                              }
                              {
                                card.isWatching 
                                ?
                                <div className="notifications-absolute--message">You are recieving notifications for updates on this card (click to stop watching)</div>
                                :
                                <div className="notifications-absolute--message">Watch to get notifications for updates on this card</div>
                              }
                              
                              
                            </div>
                            
                          </div>
                        </div>
                      </div>
                      <div className="lhs-row description">
                        <div className="lhs-item--svg">
                          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 6H21M3 14H21M17 10H7M17 18H7" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="description-container">
                            <h3>Description</h3>
                            <CardModalDescriptionInput card={card}/>
                        </div>
                      </div>
                      {
                        card.checklists 
                        && 
                        card.checklists.length > 0 
                        && 
                        card.checklists.map( (checklist) => (
                          <TheCheckList checklistId={checklist.checklistId} title={checklist.title} card={card}/>
                        ))
                      }
                      <div className="lhs-row activity"></div>
                    </div>
                    <div className="rhs">
                      <div className="rhs-container">
                        <div className="rhs-row">
                          <div className="rhs-row--header">Add to Card</div>
                          <div className="rhs-row--items">
                            {/* <div className="rhs-row--item">
                              
                                <button className="btn-darker" style={{width: '100%', textAlign: 'start'}} disabled={true}>
                                  <span className="rhs-row--item__svg">
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                  </span>
                                  <span className="rhs-row--item__text">Members</span>
                                </button>
                              
                            </div> */}
                            <div className="rhs-row--item">
                              <a onClick={() => labelMenuToggleHandler(96)} className="btn-darker">
                                  <span className="rhs-row--item__svg">
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path id="Vector" d="M6.60035 9H17.4003M6.60035 9C6.04029 9 5.75957 9 5.54566 9.10899C5.3575 9.20487 5.20463 9.35774 5.10875 9.5459C4.99976 9.75981 4.99976 10.04 4.99976 10.6001V15.8001C4.99976 16.9202 4.99976 17.4804 5.21775 17.9082C5.40949 18.2845 5.71523 18.5905 6.09156 18.7822C6.51896 19 7.07875 19 8.19667 19H15.8025C16.9204 19 17.4794 19 17.9068 18.7822C18.2831 18.5905 18.5902 18.2844 18.782 17.9081C18.9998 17.4807 18.9998 16.9216 18.9998 15.8037V10.591C18.9998 10.037 18.9998 9.75865 18.8914 9.5459C18.7955 9.35774 18.6419 9.20487 18.4538 9.10899C18.2398 9 17.9604 9 17.4003 9M6.60035 9H4.97507C4.12597 9 3.70168 9 3.4607 8.85156C3.13911 8.65347 2.95678 8.29079 2.98902 7.91447C3.0132 7.63223 3.26593 7.29089 3.77222 6.60739C3.91866 6.40971 3.99189 6.31084 4.08152 6.23535C4.20104 6.1347 4.34286 6.06322 4.49488 6.02709C4.60889 6 4.73126 6 4.9773 6H19.0217C19.2677 6 19.3904 6 19.5044 6.02709C19.6564 6.06322 19.7982 6.1347 19.9177 6.23535C20.0074 6.31084 20.0809 6.40924 20.2273 6.60693C20.7336 7.29042 20.9867 7.63218 21.0109 7.91442C21.0432 8.29074 20.8602 8.65347 20.5386 8.85156C20.2976 9 19.8723 9 19.0232 9H17.4003M9.99976 14H13.9998" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                  </span>
                                  <span className="rhs-row--item__text">Labels</span>
                              </a>
                              {
                                labelMenuToggler.active 
                                && 
                                labelMenuToggler.index === 96 
                                && 
                                <LabelsMenu card={card}  parentCloseHandler={() => setLabelMenuToggler({active: false, index: -1})}/>
                              }
                            </div>
      
                            <CheckListMenu card={card}/>
      
                            {/* <div className="rhs-row--item">
                              <a className="btn-darker">
                                  <span className="rhs-row--item__svg">
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M12 17V12L9.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                  </span>
                                  <span className="rhs-row--item__text">Dates</span>
                              </a>
                              
                            </div> */}
      
                            {/* <div className="rhs-row--item">
                              <a className="btn-darker">
                                  <span className="rhs-row--item__svg">
                                      <svg fill="#000000" width="20" height="20" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M23.061 13.441c0 0 1.172-0.891 0.281-1.782-0.893-0.891-1.76 0.259-1.76 0.259l-6.969 6.97c0 0-2.103 2.711-3.696 1.070s1.070-3.696 1.070-3.696l9.759-9.76c0 0 2.744-3.023 5.322-0.445 2.578 2.579-0.453 5.329-0.453 5.329l-13.213 13.214c0 0-4.228 4.884-8.143 0.969s1.016-8.095 1.016-8.095l10.034-10.034c0 0 1.125-0.938 0.281-1.782s-1.781 0.281-1.781 0.281l-11.51 11.511c0 0-4.345 4.767 0.508 9.618 4.853 4.853 9.619 0.509 9.619 0.509l15.822-15.823c0 0 3.164-3.493-0.609-7.268s-7.268-0.609-7.268-0.609l-11.61 11.611c0 0-3.49 2.834-0.325 5.998s5.951-0.372 5.951-0.372l7.674-7.673z"></path>
                                      </svg>
                                  </span>
                                  <span className="rhs-row--item__text">Attachments</span>
                              </a>   
                            </div> */}
      
                            {
                              !card.coverProperties && <CoverFeature card={card} isCool={true}/>
                            }
                          
                          </div>
                        </div>
        
                        <div className="rhs-row">
                          <div className="rhs-row--header">Actions</div>
                          <div className="rhs-row--items">
                            <MoveCardModal />
                            <CopyCardModal card={card}/>
      
                            <div className="rhs-row--item">
                              <a className="btn-darker">
                                  <span className="rhs-row--item__svg">
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M9 14L11 16L15 12M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                  </span>
                                  <span className="rhs-row--item__text">Archive</span>
                              </a>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absoluteItem-moreabsolute--exitbtn">
                    <button className='bg-nobg' onClick={closeHandler}>x</button>
                  </div>
              </div>
            </div>
          )
    } else {
        return null;
    }
  }
  
