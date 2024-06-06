import { createContext, useContext, ReactNode} from 'react'


type listContextProps = {
    parentListName: string
}

const ListContext = createContext<listContextProps | undefined>(undefined) 

export const UseListContext = () => {
    const context = useContext(ListContext)
    if(!context) {
        throw new Error('UseListContext must be used within an UseListProvider');
    }
    return context;
}

export const ListContextProvider: React.FC<{listName: string, children: ReactNode}> = ({listName, children}) => {

    return (
        <ListContext.Provider value={{parentListName: listName}}>
            {children}
        </ListContext.Provider>
    )
}