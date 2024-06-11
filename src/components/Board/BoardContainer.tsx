import {useState, useEffect, ReactNode } from "react";
import { UseBoardContext } from "../../context/boardcontext";
import { listProps, checkListProps, cardProps} from "../../@types/board";
import { UserOverlayContext } from "../../context/overlaycontext";
import { CardViewModal } from "../cardModal/CardModal";
import { ListActionMenu } from "./ListMenu";
import { AbsoluteEditCard } from "./AbsoluteEditCard";
import { NotificationMessage } from "./NotificationMessage";
import { NewListForm } from "./NewListForm";

//not working because i havent did the dispatch on checklist things lol 
const getCheckListCounts = (checklists: checkListProps[]): number[] => {
  if(checklists.length === 0){
      return [0, 0]
  }else {
      const checked = checklists.reduce ((acc, checklist) => {
          
          const yeah = checklist.items?.filter( (item) => item.itemChecked)
          
          if(yeah && yeah?.length > 0){
              acc += yeah.length
          }
          return acc;
      }, 0)

      const total = checklists.reduce ( (acc, checklist) => {
          const checklistTotal = checklist.items?.reduce( (acc) => {
              return acc + 1
          }, 0)
          return acc + (checklistTotal ?? 0)
      }, 0) 
      return [checked, total]
  }
}

const darkenHexColor = (hex: string, amount: number): string => {
  // Ensure the hex color is in the correct format
  hex = hex.replace(/^#/, '');

  // Convert hex to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Decrease brightness
  r = Math.max(0, r - amount);
  g = Math.max(0, g - amount);
  b = Math.max(0, b - amount);

  // Convert RGB back to hex
  const darkenedHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  return darkenedHex;
} 

type boardContainerProps = {
  sidebarCloser: () => void;
}

export const CurrentBoardContainer: React.FC<boardContainerProps> = ({ sidebarCloser}) => {
  const {showOverlay, hideOverlay} = UserOverlayContext()
  const {state, dispatch} = UseBoardContext()
  
  const currentBoard = state.currentBoard 

  //global state, all board has this new list toggle 
  const [newListToggle, setNewListToggle] = useState(false)
  const newListToggleHandler = (b: boolean) => {
    sidebarCloser()
    setListMenuToggle({active: false, listName: '', index: -1})
    setListFooterInput({active: false, listId: -1, cardName: ''})
    setNewCardToggle({active: false, index: -1, value: ''})
    
    //meat and potatoes 
    setNewListToggle(b)
  }

  const [editCardAbsolute, setEditCardAbsolute] = useState({
    cardId: -1,
    isActive: false,
    listId: -1 
  })
  const [editCardModal, setEditCardModal] = useState({
    cardId: -1,
    isActive: false,
    listId: -1
  })

  const [listFooterInput, setListFooterInput] = useState({
    active: false, 
    listId: -1,
    cardName: ''

  })

  const [boardWatchToggler, setBoardWatchToggler] = useState(false)
  const boardWatchHandler = () => {
    dispatch({type: 'UPDATE_CURRENT_BOARD', payload:{...state.currentBoard, isWatching: !state.currentBoard.isWatching}})
    setBoardWatchToggler(false)
  }

  //this function is used to set list footer input to true
  const listFooterInputHandler = (listId: number) => {

    //setting state to remove any present modals/popups/tings
    sidebarCloser() 
    setNewListToggle(false) 
    setListMenuToggle({active: false, listName: '', index: -1})
    setNewCardToggle({active: false, index: -1, value: ''})
    //meat and potatoes line
    setListFooterInput({active: true, listId, cardName: ''})
  }

  const listFooterInputChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setListFooterInput({...listFooterInput, cardName: event.target.value})
  }

  const listFooterInputSubmitHandler = () => {
      if(listFooterInput.active && listFooterInput.cardName.length > 0){
        //setListFooterInput({active: false, listName: '', cardName: ''})
        setTimeout( () => {
          dispatch({type: 'ADD_CARD', payload: {listId: listFooterInput.listId, cardTitle: listFooterInput.cardName}})
          setListFooterInput({active: false, listId: -1, cardName: ''})
        }, 100)
      }
  }

  //a handler to dispatch 

   //states for toggleing the list header menu
   //using this to set isWatching
   const [listMenuToggle, setListMenuToggle] = useState({
    active: false,
    listName: '',
    index: -1
  })


  //i dont think this is what i need  to do,
  //i think i need to also change the cardId
  const copyListHandler = (list: listProps) => {
    if(listMenuToggle.active && currentBoard?.lists){
        const updatedItems = list.items.map( (card) => {
          return {...card, id: Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000}
        }) as cardProps[]
        const boardLists = currentBoard.lists
        boardLists.splice(listMenuToggle.index + 1, 0, {...list, items: updatedItems}) 
        dispatch({type: 'UPDATE_LISTS', payload: boardLists})
        setListMenuToggle({
          active: false,
          listName: '',
          index: -1
        })
    }
  }
  const [newCardToggle, setNewCardToggle] = useState({
    active: false, 
    index: -1,
    value: ''
  })
  const newCardToggleHandler = (index: number) => {
    if(listMenuToggle.active && listMenuToggle.index === index) {
      
      setListMenuToggle({
        active: false,
        listName: '',
        index: -1
      })
      setNewCardToggle({
        ...newCardToggle,
        active: true,
        index
      })
     
    }
  }

  const newCardValueHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCardToggle({...newCardToggle, value: event.target.value})
  }
  const addNewCardHandler = (listId: number) => {
    if(newCardToggle.active && newCardToggle.value.length > 0){
      console.log('attempting to add to front')
      dispatch({type: 'ADD_CARD_FRONT', payload: {listId, cardTitle: newCardToggle.value}})
      setNewCardToggle({
        active: false,
        index: -1,
        value: ''
      })
    }
  }


  //assume that str has already been parsed
  //higher order function 
  const absoluteEditEditHandler = (cardTitle: string, card: cardProps) => {
    console.log('attempting to edit via absolute edit')
    if(editCardAbsolute.isActive) {
      console.log('attempting to perform the insicision')
      const updatedCard = {...card, title: cardTitle} as cardProps
      console.log(updatedCard)
      dispatch({type: 'UPDATE_CARD',  payload: updatedCard})
      cancelEditCardAbsoluteHandler()

    }

  }


  //need to consider the case that its both clicked on.
  

  const editCardAbsoluteHandler = (id: number, listId: number) => {
    console.log('edit card absolute handler just toggled for id - ', id)
    sidebarCloser()
    setListMenuToggle({active: false, listName: '', index: -1})
    setNewListToggle(false)
    setListFooterInput({active: false, listId: -1, cardName: ''})

    setEditCardAbsolute({
   
      isActive: true,
      cardId: id,
      listId
    })
    
    showOverlay()

  }

  const cancelEditCardAbsoluteHandler = () => {

    setEditCardAbsolute({
      cardId: -1,
      isActive: false,
      listId: -1
    })
    hideOverlay()
  }

  const editCardModalHandler = (id: number, listId: number) => {
    sidebarCloser()
    setListFooterInput({active: false, listId: -1, cardName: ''})
    setListMenuToggle({active: false, listName: '', index: -1})
    setNewListToggle(false)
    if(id > 0){ 
     
        setEditCardModal({
          cardId: id,
          isActive: true,
          listId
        })
        // resetCertainTings() 
        showOverlay()

        
        
    }
  }
  

  const cancelEditCardModalHandler = () => {
    setEditCardModal({
      cardId: -1,
      isActive: false,
      listId: -1
    })
    hideOverlay()
  }

  const createNewListHandler = (listName: string) => {
      const newList = {
        id: state.currentBoard.lists.length,
        listName: listName,
        items: [],
        isWatching: false,
        listColor: '#FFFFFF'
      } as listProps
      dispatch({type: 'ADD_LIST', payload:  newList})
  }

 

  const listMenuToggleHandler = (listName: string, index: number) => {
      sidebarCloser()
      setNewListToggle(false) 
      setListFooterInput({active: false, listId: -1, cardName: ''})
      setNewCardToggle({active: false, index: -1, value: ''})
      if(listMenuToggle.active){
          if(listName === listMenuToggle.listName && index === listMenuToggle.index){
            //the case the user clicks on the same button for the same list it should just close 
            setListMenuToggle({
              active: false,
              listName: '',
              index: -1
            })
          } else {
            setListMenuToggle({...listMenuToggle, active: false})
            setTimeout( () => {
              setListMenuToggle({...listMenuToggle, active: true, listName, index})
            }, 50)
          }
      } else {
        setListMenuToggle({
          active: true, 
          listName,
          index
        })
    
      }
  }
  //handlers for the absolute modal, 'open card' 
  //parentListName is needed only for open card. hmmm 
  //parentListNameContext? 
  const openCardModalForAbsoluteHandler = () => {
    if(editCardAbsolute.isActive) {
    
      const {cardId, listId} = editCardAbsolute
      setEditCardAbsolute({cardId: -1, listId, isActive: false})
      setEditCardModal({cardId, listId, isActive: true})
    }
  }
  type notificationProps = {
    active: boolean 
    message: ReactNode | undefined,
    type: string
  }
  const [tester69, setTester69] = useState<notificationProps>({
    active: false,
    message: undefined,
    type: ''
  })

  const notificationMessageHandler = (child: ReactNode, type: string) => {
    if(child !== undefined){
      setTester69({...tester69, active: true, message: child, type})
    }
  }

  //toggle board menu using dispatch 
  const boardMenuTogglerHandler = () => {
    dispatch({type: 'TOGGLE_BOARD_MENU', payload: !state.boardMenuToggle})
  }

  //board favorite function 

  const boardFavoriteTogglerHandler = () => {
    dispatch({type: 'UPDATE_CURRENT_BOARD', payload: {...state.currentBoard, isFavorite: !state.currentBoard.isFavorite}})
  }


  useEffect( () => {
    if(tester69.active) { 
      setTimeout( () => {
        setTester69({active: false, message: undefined, type: 'info'})
      }, 3000)
    }
  }, [tester69.active])

  if(!currentBoard) {
    return <div> board not found uh oh oh uh</div>
  }

    return (
      <section className="app-main">
        <header className="app-main--header" style={{backgroundColor: state.colors.asideColor ? darkenHexColor(state.colors.asideColor, 50) : undefined}}>
            <div className="flexed lhs">
              <div className="boardName">{currentBoard.boardName}</div>
              <div className="favoriteAction" onClick={boardFavoriteTogglerHandler}>
                <span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={currentBoard.isFavorite ? '#ffffff' : 'none'} xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                <div className="favoriteAction--text">{currentBoard.isFavorite ? `Click to unstar ${currentBoard.boardName}. It will be removed from you starred list.` : `Click to star ${currentBoard.boardName}. It will be added to your starred list`}</div>
              </div>
              <div>
              </div>
            </div>
            <div className="flexed rhs">
              {
                boardWatchToggler
                && 
                <div className="boardwatching-message--absolute--modal">
                  <div className="bwmam-row flexed">
                    <div className="zero"></div>
                    <div className="one">Stop watching?</div>
                    <div className="zero">
                      <button className="btn-nobg" onClick={() => setBoardWatchToggler(false)}>x</button>
                    </div>
                  </div>
                  <div className="bwmam-row text">
                    You can watch again via the board menu.
                  </div>
                  <div className="bwmam-row w-100">
                    <button className="btn-danger" onClick={boardWatchHandler}>Stop Watching</button>
                  </div>
              </div>
              }
              {
                state.currentBoard.isWatching 
                && 
                <div className="boardwatching" onClick={() => setBoardWatchToggler(true)}>
                  <div className="boardwatching-icon">
                    <svg width="24" height="24" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M18.5 12.714C18.5 15.081 15.366 17 11.5 17C7.634 17 4.5 15.081 4.5 12.714C4.5 10.347 7.634 8.42896 11.5 8.42896C15.366 8.42896 18.5 10.347 18.5 12.714Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.2501 12.714C13.2647 13.4249 12.8477 14.074 12.1951 14.3562C11.5424 14.6384 10.7839 14.4977 10.2759 14.0002C9.76792 13.5027 9.61148 12.7472 9.8801 12.0889C10.1487 11.4305 10.789 11.0001 11.5001 11C11.9594 10.9952 12.4019 11.1731 12.7301 11.4945C13.0583 11.816 13.2453 12.2546 13.2501 12.714V12.714Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.75 8.429C10.75 8.84321 11.0858 9.179 11.5 9.179C11.9142 9.179 12.25 8.84321 12.25 8.429H10.75ZM12.25 5C12.25 4.58579 11.9142 4.25 11.5 4.25C11.0858 4.25 10.75 4.58579 10.75 5H12.25ZM18.2931 7.05471C18.4813 6.68571 18.3347 6.23403 17.9657 6.04586C17.5967 5.85769 17.145 6.00428 16.9569 6.37329L18.2931 7.05471ZM15.5199 9.19129C15.3317 9.5603 15.4783 10.012 15.8473 10.2001C16.2163 10.3883 16.668 10.2417 16.8561 9.87271L15.5199 9.19129ZM6.04314 6.37329C5.85497 6.00428 5.40329 5.85769 5.03429 6.04586C4.66528 6.23403 4.51869 6.68571 4.70686 7.05471L6.04314 6.37329ZM6.14386 9.87271C6.33203 10.2417 6.78371 10.3883 7.15271 10.2001C7.52172 10.012 7.66831 9.5603 7.48014 9.19129L6.14386 9.87271ZM12.25 8.429V5H10.75V8.429H12.25ZM16.9569 6.37329L15.5199 9.19129L16.8561 9.87271L18.2931 7.05471L16.9569 6.37329ZM4.70686 7.05471L6.14386 9.87271L7.48014 9.19129L6.04314 6.37329L4.70686 7.05471Z" fill="#000000"/>
                    </svg>
                  </div>
                  <div className="boardwatching-message">Watching</div>
                  <div className="boardwatching-message--absolute">watching</div>
              </div>
              }
            
              {
                !state.boardMenuToggle 
                && 
                <div onClick={boardMenuTogglerHandler} style={{cursor: 'pointer'}}>Menu</div>
              }
            </div>
        </header>
        <div className="app-main--body" style={{backgroundImage: state.colors.mainGradient}}>
          <div className="list-container">
            {
              currentBoard.lists.map( (list, index) => (
                <div className="list-item notemptylist" key={index} style={{backgroundColor: list.listColor && list.listColor.length > 0 ? list.listColor : undefined}}>
                  <div className="list-item--header">
                    <div className="lih-input">
                      {list.listName}
                    </div>                   
                    <div className="lih-buttons">
                      {
                        list.isWatching 
                        && 
                        <span>
                          <svg width="20" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.5 12.714C18.5 15.081 15.366 17 11.5 17C7.634 17 4.5 15.081 4.5 12.714C4.5 10.347 7.634 8.42896 11.5 8.42896C15.366 8.42896 18.5 10.347 18.5 12.714Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.2501 12.714C13.2647 13.4249 12.8477 14.074 12.1951 14.3562C11.5424 14.6384 10.7839 14.4977 10.2759 14.0002C9.76792 13.5027 9.61148 12.7472 9.8801 12.0889C10.1487 11.4305 10.789 11.0001 11.5001 11C11.9594 10.9952 12.4019 11.1731 12.7301 11.4945C13.0583 11.816 13.2453 12.2546 13.2501 12.714V12.714Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.75 8.429C10.75 8.84321 11.0858 9.179 11.5 9.179C11.9142 9.179 12.25 8.84321 12.25 8.429H10.75ZM12.25 5C12.25 4.58579 11.9142 4.25 11.5 4.25C11.0858 4.25 10.75 4.58579 10.75 5H12.25ZM18.2931 7.05471C18.4813 6.68571 18.3347 6.23403 17.9657 6.04586C17.5967 5.85769 17.145 6.00428 16.9569 6.37329L18.2931 7.05471ZM15.5199 9.19129C15.3317 9.5603 15.4783 10.012 15.8473 10.2001C16.2163 10.3883 16.668 10.2417 16.8561 9.87271L15.5199 9.19129ZM6.04314 6.37329C5.85497 6.00428 5.40329 5.85769 5.03429 6.04586C4.66528 6.23403 4.51869 6.68571 4.70686 7.05471L6.04314 6.37329ZM6.14386 9.87271C6.33203 10.2417 6.78371 10.3883 7.15271 10.2001C7.52172 10.012 7.66831 9.5603 7.48014 9.19129L6.14386 9.87271ZM12.25 8.429V5H10.75V8.429H12.25ZM16.9569 6.37329L15.5199 9.19129L16.8561 9.87271L18.2931 7.05471L16.9569 6.37329ZM4.70686 7.05471L6.14386 9.87271L7.48014 9.19129L6.04314 6.37329L4.70686 7.05471Z" fill="#000000"/>
                          </svg>
                        </span>
                      }
                      
                      <button className='btn-nobg' onClick={() => listMenuToggleHandler(list.listName, index)}>
                        <span>
                          <svg fill="#000000" height="15" width="15" id="Layer_1" data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path className="cls-1" d="M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z"/>
                          </svg>
                        </span>
                      </button>
                    </div>
                    { listMenuToggle.active 
                      && 
                      listMenuToggle.index === index 
                      && 
                      <ListActionMenu list={list}  addCardToggleHandler={() => newCardToggleHandler(index)} parentCloseHandler={() => setListMenuToggle({active: false, listName: '', index: -1})} copyList={copyListHandler} setNotification={notificationMessageHandler}/> 
                    }
                  </div>
                  <div className="list-item--cards">
                    {
                      newCardToggle.active 
                      && 
                      newCardToggle.index === index
                      && 
                      <div className="list-item--cards__addItem">
                        <div className="addItem-textarea">
                          <textarea name="" id="" placeholder="Enter a title for this card" value={newCardToggle.value} onChange={newCardValueHandler}></textarea>
                        </div>
                        <div className="addItem-actions">
                            <button className="btn-primary" onClick={() => addNewCardHandler(list.id)}>Add card</button>
                            <button className="btn-nobg" onClick={() => setNewCardToggle({active: false, index: -1, value: ''})}>x</button>
                        </div>
                    </div>
                    }
                    {
                      list.items.map( (card, cardIndex) => (
                        <div className="list-item--card" key={cardIndex}>

                            <div className="list-item--card__container" style={{backgroundColor: card.coverProperties && card.coverProperties.size === 'full' ? card.coverProperties.colorCode : undefined}}>
                              {
                                card.coverProperties && card.coverProperties.size === 'half' && <div className="card-cover" style={{backgroundColor: card.coverProperties.colorCode}}></div>
                              }
                              <div className="card-info">
                                {
                                  card.coverProperties && card.coverProperties.size == 'full' || <div className="labels">
                                  {
                                    card.labels.filter( (label) => label.labelIsChecked === true)
                                    .map( (label) => (
                                      <div className="labels-item" style={{backgroundColor: label.labelColorCode}}>
                                        <div className="labels-item--absolute">Color: {label.labelColorName}, title: {label.labelTitle.length > 0 ? label.labelTitle : 'none'}</div>
                                      </div>
                                    ))
                                  }
                                </div>
                                }
                                <div onClick={() => editCardModalHandler(card.id, list.id)} style={{overflow: 'hidden'}}>{card.title}</div>
                                <div className="card-icons">
                                  {
                                    card.isWatching 
                                    && 
                                    <div className="card-icon watching">
                                      <svg width="20" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M18.5 12.714C18.5 15.081 15.366 17 11.5 17C7.634 17 4.5 15.081 4.5 12.714C4.5 10.347 7.634 8.42896 11.5 8.42896C15.366 8.42896 18.5 10.347 18.5 12.714Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.2501 12.714C13.2647 13.4249 12.8477 14.074 12.1951 14.3562C11.5424 14.6384 10.7839 14.4977 10.2759 14.0002C9.76792 13.5027 9.61148 12.7472 9.8801 12.0889C10.1487 11.4305 10.789 11.0001 11.5001 11C11.9594 10.9952 12.4019 11.1731 12.7301 11.4945C13.0583 11.816 13.2453 12.2546 13.2501 12.714V12.714Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M10.75 8.429C10.75 8.84321 11.0858 9.179 11.5 9.179C11.9142 9.179 12.25 8.84321 12.25 8.429H10.75ZM12.25 5C12.25 4.58579 11.9142 4.25 11.5 4.25C11.0858 4.25 10.75 4.58579 10.75 5H12.25ZM18.2931 7.05471C18.4813 6.68571 18.3347 6.23403 17.9657 6.04586C17.5967 5.85769 17.145 6.00428 16.9569 6.37329L18.2931 7.05471ZM15.5199 9.19129C15.3317 9.5603 15.4783 10.012 15.8473 10.2001C16.2163 10.3883 16.668 10.2417 16.8561 9.87271L15.5199 9.19129ZM6.04314 6.37329C5.85497 6.00428 5.40329 5.85769 5.03429 6.04586C4.66528 6.23403 4.51869 6.68571 4.70686 7.05471L6.04314 6.37329ZM6.14386 9.87271C6.33203 10.2417 6.78371 10.3883 7.15271 10.2001C7.52172 10.012 7.66831 9.5603 7.48014 9.19129L6.14386 9.87271ZM12.25 8.429V5H10.75V8.429H12.25ZM16.9569 6.37329L15.5199 9.19129L16.8561 9.87271L18.2931 7.05471L16.9569 6.37329ZM4.70686 7.05471L6.14386 9.87271L7.48014 9.19129L6.04314 6.37329L4.70686 7.05471Z" fill="#000000"/>
                                      </svg>
                                      <div className="card-icon--absolute__message">You are watching this card</div>
                                  </div>
                                  }
                                  
                                  {
                                    card.checklists 
                                    && 
                                    card.checklists.length > 0 
                                    && 
                                    <CheckListIcon checklist={card.checklists} />
                                  
                                  }
                                  <div className="card-icon comments">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.71598 16.1258C2.89681 17.6729 3.72352 19.0714 4.99182 19.9757C5.9263 20.6419 7.04537 21 8.19303 21H11.8069C12.9546 21 14.0736 20.6419 15.0081 19.9757C16.2764 19.0714 17.1031 17.6729 17.284 16.1258L17.6846 12.6978C17.7346 12.2706 17.7595 12.057 17.749 11.8809C17.694 10.9577 17.0132 10.1928 16.1027 10.0309C15.929 10 15.7139 10 15.2838 10H4.71612C4.286 10 4.07094 10 3.89725 10.0309C2.98677 10.1928 2.30599 10.9577 2.2509 11.8809C2.2404 12.057 2.26536 12.2706 2.3153 12.6978" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/><path d="M17 17H19C20.6569 17 22 15.6569 22 14C22 12.3431 20.6569 11 19 11H17.5" stroke="#1C274C" strokeWidth="1.5"/><path d="M10.0002 2C9.44787 2.55228 9.44787 3.44772 10.0002 4C10.5524 4.55228 10.5524 5.44772 10.0002 6" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.99994 7.5L5.11605 7.38388C5.62322 6.87671 5.68028 6.0738 5.24994 5.5C4.81959 4.9262 4.87665 4.12329 5.38382 3.61612L5.49994 3.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.4999 7.5L14.6161 7.38388C15.1232 6.87671 15.1803 6.0738 14.7499 5.5C14.3196 4.9262 14.3767 4.12329 14.8838 3.61612L14.9999 3.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    <div className="card-icon--absolute__message">Comments</div>
                                  </div>
                                </div>
                              </div>
                              <div className="list-item--card__absolute">
                                  <div className="card-editAction" onClick={() => editCardAbsoluteHandler(card.id, list.id)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15">
                                      <path d="M2.679 10.293l5.849-5.851 3 3-5.83 5.873-4.026 1.072z"/>
                                      <path d="M11.637 1.676c-.2 0-.4.077-.554.23l-1.77 1.768 3.053 3.053 1.77-1.77a.783.783 0 0 0 0-1.109l-1.944-1.941a.782.782 0 0 0-.555-.23z"/>
                                    </svg>
                                  </div>
                              </div>
                            </div>
                            <AbsoluteEditCard isActive={editCardAbsolute.isActive} card={card} cardId={editCardAbsolute.cardId} saveCardHandler={absoluteEditEditHandler} openCardModal={openCardModalForAbsoluteHandler} closeHandler={cancelEditCardAbsoluteHandler}/>
                        </div>
                      ))
                    }
                  </div>             
                    <div className="list-item--footer">
                      {
                        listFooterInput.active
                        && 
                        listFooterInput.listId === list.id 
                        && 
                        <div className="lif-active">
                          <div className="lif-active--row">
                              <textarea name="" id="" placeholder="Enter a title for this card" value={listFooterInput.cardName} autoFocus onChange={listFooterInputChangeHandler}></textarea>
                          </div>
                          <div className="lif-active--row">
                              <button className="btn-primary" onClick={listFooterInputSubmitHandler}>Add Card</button>
                              <button className="btn-nobg" onClick={() => setListFooterInput({...listFooterInput, active: false})}>x</button>
                          </div>
                        </div> 
                      }
                     
                      {
                        listFooterInput.active
                        &&
                        listFooterInput.listId === list.id 
                        || 
                        newCardToggle.active && newCardToggle.index === index
                        ?
                        undefined
                        : 
                        <div className="lif-unactive">
                          <div className='flex1'>
                              <button className="btn-nobg" onClick={() => listFooterInputHandler(list.id)}>Add a card</button>
                          </div>
                          <div className="flex0"></div>
                      </div>
                     
                      }
                      
                    </div>
                </div> 
               ) )
            }
            <div className="list-item emptylist">
               <a onClick={() => newListToggleHandler(!newListToggle)}>New List</a>
               <NewListForm isActive={newListToggle} disableModalHandler={() => setNewListToggle(false)} saveNewList={createNewListHandler}/>
            </div>
          </div>
          
        </div>
        <CardViewModal isActive={editCardModal.isActive} cardId={editCardModal.cardId} closeHandler={cancelEditCardModalHandler}/>
    
        <NotificationMessage type={tester69.type} isActive={tester69.active} message={tester69.message} closeHandler={() => setTester69({...tester69, active: false, message: ''})}/>
      </section>
    )
    
}


const CheckListIcon = ({checklist}: {checklist: checkListProps[]}) => {
  const numbers = getCheckListCounts(checklist)
  const isDone = numbers[0] / numbers[1] === 1 ? true : false 
  const isValid = numbers[0] === 0 && numbers[1] === 0 

  if(isValid) {
    return null;
  }
  return (
    <div className="card-icon checklist" style={{backgroundColor: isDone ? 'rgb(31, 132, 90)' : undefined, color: isDone ? 'white' : "inherit"}}>
        <svg width="25" height="25" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xmlSpace="preserve">
          <path fill={isDone ? '#FFFFFF' : "#000000"} fillOpacity="1" strokeWidth="0.1" strokeLinejoin="round" d="M 32.222,33.4875L 39.1886,40.0582L 51.3802,26.1251L 54.7052,29.0542L 39.5845,47.5L 28.897,36.8125L 32.222,33.4875 Z M 24,27L 48.5,27L 45.5,30L 27,30L 27,49L 46,49L 46,42.5L 49,38.75L 49,52L 24,52L 24,27 Z "/>
        </svg>
        <div className="card-icon--absolute__message">Checklist Items</div>
        <div className="checklistcount">{numbers[0]}/{numbers[1]}</div>
    </div>

  )
}