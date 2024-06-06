import {Dispatch, createContext, useContext, useReducer, ReactNode} from 'react'
import { boardColorProps, boardProps, cardProps, checkListItemProps, listProps } from '../@types/board'
import { initialTrelloState } from '../data/state-config'


//helper function 
const cleanString = (s: string) => {
    return s.replace(/\n/g, '').trim()
}

export type BoardState = {
    boards: boardProps[];
    currentBoard: boardProps;
    colors: {
        headerColor: string;
        asideColor: string;
        mainGradient: string 
    }
    isAddBoardHappening: boolean 
}

const initialState: BoardState = {
    boards: initialTrelloState,
    currentBoard: initialTrelloState[0],
    colors: {
        headerColor: '',
        asideColor: '',
        mainGradient: ''
    },
    isAddBoardHappening: false 
}


type BoardAction = 
    | {type: 'UPDATE_CURRENT_BOARD', payload: boardProps}
    | {type: 'ADD_BOARD'; payload: boardProps}
    | {type: 'ADD_LIST'; payload:  listProps}
    | {type: 'UPDATE_LIST'; payload: listProps}
    | {type: 'UPDATE_LISTS'; payload: listProps[]}
    | {type: 'ADD_CARD'; payload: {listName: string, cardTitle: string}}
    | {type: 'ADD_CARD_FRONT'; payload: {listName: string, cardTitle: string}}
    | {type: 'UPDATE_CARD'; payload: cardProps}
    | {type: 'UPDATE_CHECKLIST'; payload: {listName: string, card: cardProps, checklistId: number, checklistItems: checkListItemProps[]}}
    | {type: 'UPDATE_HAPPENING'; payload: boolean}
    | {type: 'UPDATE_COLOR_HEADER'; payload: string}
    | {type: 'UPDATE_COLOR_ASIDE'; payload: string}
    | {type: 'UPDATE_BG_GRADIENT'; payload: string}
    | {type: 'UPDATE_COLORS'; payload: boardColorProps}
const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
    switch(action.type) {
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
        case 'UPDATE_HAPPENING':
            return updateHappening(state, action)
        case 'UPDATE_COLOR_HEADER': 
            return updateColorHeader(state ,action)
        case 'UPDATE_COLOR_ASIDE': 
            return updateColorAside(state ,action)
        case 'UPDATE_BG_GRADIENT': 
            return updateBgGradient(state ,action)
        case 'UPDATE_COLORS':
            return updateColors(state, action) 
        default:
            throw new Error(`unknown action type: ${action}`)
    }
}

    
    
    
const BoardContext = createContext<{state: BoardState, dispatch: Dispatch<BoardAction>} | undefined>(undefined)

export const BoardProvider = ({children} : {children: ReactNode}) => {
    const [state, dispatch] = useReducer(boardReducer, initialState)

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



const addBoard = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'ADD_BOARD') return state;
    return {
        ...state, 
        boards: [...state.boards, action.payload]
    }
}




const updateCurrentBoard = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'UPDATE_CURRENT_BOARD') return state 
    return {
        ...state,
        currentBoard: action.payload
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

    const updatedLists = state.currentBoard.lists.map( list => ({
        ...list,
        items: list.items.map (card => 
            card.id === action.payload.id 
            ? action.payload 
            : card 
        )
    }))
    return {
        ...state,
        currentBoard: {
            ...state.currentBoard,
            lists: updatedLists
        }
    }
}

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


const updateHappening = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'UPDATE_HAPPENING') return state 
    return {
        ...state,
        isAddBoardHappening: action.payload
    }
}

const updateColorHeader = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'UPDATE_COLOR_HEADER') return state 
    return {
        ...state,
        colors: {...state.colors, headerColor: action.payload}
    }
}

const updateColorAside = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'UPDATE_COLOR_ASIDE') return state 
    return {
        ...state,
        colors: {...state.colors, asideColor: action.payload} 
    }
}

const updateBgGradient = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'UPDATE_BG_GRADIENT') return state 
    return {
        ...state,
        colors: {...state.colors, mainGradient: action.payload}
    }
}

const updateColors = (state: BoardState, action: BoardAction): BoardState => {
    if(action.type !== 'UPDATE_COLORS') return state 
    return {
        ...state,
        colors: { 
            headerColor: action.payload.secondary,
            asideColor: action.payload.primary,
            mainGradient: action.payload.gradient
        }
    }
}