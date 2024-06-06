import {Dispatch, createContext, useContext, useReducer, ReactNode, useEffect} from 'react'
import { boardColorProps, boardProps, cardProps, checkListItemProps, listProps } from '../@types/board'
import { initialTrelloState } from '../data/state-config'


//helper function 
const cleanString = (s: string) => {
    return s.replace(/\n/g, '').trim()
}

export type BoardState = {
    boards: boardProps[];
    currentBoard: boardProps | null 
    colors: boardColorProps | null;
}


type BoardAction = 
    | {type: 'INITIALIZE_BOARD'; payload: boardProps[]}
    | {type: 'UPDATE_CURRENT_BOARD', payload: boardProps}
    | {type: 'ADD_BOARD'; payload: boardProps}
    | {type: 'ADD_LIST'; payload:  listProps}
    | {type: 'UPDATE_LIST'; payload: listProps}
    | {type: 'UPDATE_LISTS'; payload: listProps[]}
    | {type: 'ADD_CARD'; payload: {listName: string, cardTitle: string}}
    | {type: 'ADD_CARD_FRONT'; payload: {listName: string, cardTitle: string}}
    | {type: 'UPDATE_CARD'; payload: {listName: string, card: cardProps}}
    | {type: 'UPDATE_CHECKLIST'; payload: {listName: string, card: cardProps, checklistId: number, checklistItems: checkListItemProps[]}}
//this function appears like its just changing checklistItems if you give it a checklistItems 
const updateChecklist = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'UPDATE_CHECKLIST') return state 
    return {
        ...state,
        currentBoard: {
            ...state.currentBoard,
            lists: state.currentBoard.lists.map( (list) => 
                list.listName === action.payload.listName 
                ? {...list, items: list.items.map( card => (
                    card.id === action.payload.card.id 
                    ? {...card, 
                    checklists: card.checklists?.map( (checklist) => (
                                    checklist.checklistId === action.payload.checklistId 
                                    ? 
                                    {...checklist, items: action.payload.checklistItems}
                                    :
                                    checklist
                                ))
        
                            }
                    : card 
                ))} 
                : list
            )
        }
    }
}


    
const initialState: BoardState = {
    boards: [],
    currentBoard: {},
    colors: null 
}

const initializeBoard = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'INITIALIZE_BOARD') return state;
    return {
        ...state,
        boards: action.payload,
        currentBoard: action.payload[0],
        colors: action.payload[0]?.boardColor ?? null 
    }
}

const updateCurrentBoard = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'UPDATE_CURRENT_BOARD') return state 
    return {
        ...state,
        currentBoard: action.payload
    }
}

const addBoard = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'ADD_BOARD') return state;
    return {
        ...state, 
        boards: [...state.boards, action.payload]
    }
}

const addList = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'ADD_LIST') return state 
    //need i have the boardName, and new ListProp, i just need to find the board by name, and append a new list
   return {
    ...state,
    currentBoard: {
        ...state.currentBoard, 
        lists: [...(state.currentBoard?.lists || []), action.payload]

    }
   }
}

const updateList = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'UPDATE_LIST') return state 
    return {
        ...state,
        currentBoard: {
            ...state.currentBoard,
            lists: state.currentBoard.lists.map( (list) => 
                list.listName === action.payload.listName ? action.payload : list
            )
        }
    }
}

const updateLists = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'UPDATE_LISTS') return state 
    return {
        ...state,
        currentBoard: {
            ...state.currentBoard,
            lists: action.payload
        }
    }
}

const addCard = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'ADD_CARD') return state 

    const newCard = {
        id: Math.floor(Math.random() * (1000 - 30)) + (30 + 1),
        title: action.payload.cardTitle,
        description: '',
        isWatching: false, 
        labels: [] 
    } as cardProps

    return {
        ...state,
        currentBoard: {
            ...state.currentBoard,
            lists: state.currentBoard.lists.map( (list) => 
                list.listName === action.payload.listName ? {...list, items: [...list.items, newCard]} : list
            )
        }
    }
}

const addCardFront = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'ADD_CARD_FRONT') return state 

    //need to generate an Id, set description to '', isWatching to false, and labels to be null 
    console.log('title before adding is: ', action.payload.cardTitle)
    const newCard = {
        id: Math.floor(Math.random() * (10000 - 30)) + (30 + 1),
        title: cleanString(action.payload.cardTitle),
        description: '',
        isWatching: false, 
        labels: [] 
    } as cardProps
    return {
        ...state,
        currentBoard: {
            ...state.currentBoard,
            lists: state.currentBoard.lists.map( (list) => 
                list.listName === action.payload.listName ? {...list, items: [newCard, ...list.items]} : list
            )
        }
    }
}


const updateCard = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'UPDATE_CARD') return state 
    return {
        ...state,
        currentBoard: {
            ...state.currentBoard,
            lists: state.currentBoard.lists.map( (list) => 
                list.listName === action.payload.listName 
                ? {...list, items: list.items.map( card => (
                    card.id === action.payload.card.id 
                    ? action.payload.card
                    : card 
                ))} 
                : list
            )
        }
    }
}


const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
    switch(action.type) {
        case 'INITIALIZE_BOARD':
            return initializeBoard(state, action)
        case 'UPDATE_CURRENT_BOARD':
            return updateCurrentBoard(state, action)
        case 'ADD_BOARD':
           return addBoard(state, action)
        case 'ADD_LIST':
            return addList(state, action)
        case 'UPDATE_LIST':
            return updateList(state, action)
        case 'UPDATE_LISTS':
            return updateLists(state, action)
        case 'ADD_CARD':
            return addCard(state, action)
        case 'ADD_CARD_FRONT':
            return addCardFront(state, action)
        case 'UPDATE_CARD':
            return updateCard(state, action)
        case 'UPDATE_CHECKLIST':
            return updateChecklist(state, action)
        default:
            throw new Error(`unknown action type: ${action}`)
    }
}




const BoardContext = createContext<{state: BoardState, dispatch: Dispatch<BoardAction>} | undefined>(undefined)

export const BoardProvider = ({children} : {children: ReactNode}) => {
    const [state, dispatch] = useReducer(boardReducer, initialState)

    useEffect( () => {
        dispatch({type: 'INITIALIZE_BOARD', payload: initialTrelloState})
    }, [])

    return (
        <BoardContext.Provider value={{state, dispatch}}>
            {children}
        </BoardContext.Provider>
    )
}

export const UseBoardContext = () => {
    const context = useContext(BoardContext)

    if(!context){
        throw new Error('useBoardContext must be used within a BoardProvider')
    }

    return context;
}

