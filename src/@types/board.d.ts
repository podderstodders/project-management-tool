
export type listProps = {
    listName: string, 
    items: Array<cardProps>,
    isWatching?: boolean 
}


export type coverPropertiesProps = {
    isActive: boolean
    colorName: string 
    colorCode: string
    size: 'half' | 'full'
}

export type cardLabelProps = {
    labelColorName: string,
    labelColorCode: string,
    labelIsChecked: boolean,
    labelTitle: string
    labelIndex: number
}

export type boardProps = {
    boardName: string,
    isFavorite: false, 
    description: string, 
    isWatching: boolean
    lists: Array<listProps>
    boardColor?: boardColorProps
}

export type boardColorProps = {
    primary: string 
    secondary: string 
    gradient: string 
    emoji: string
}

export type cardProps = {
    id: number
    title: string
    description: string
    isWatching: boolean
    labels: Array<cardLabelProps>,
    coverProperties?: coverPropertiesProps
    checklists?: Array<checkListProps>
}




export type checkListProps = {
    checklistId: number
    title: string, 
    items?: checkListItemProps[]
}

export type checkListItemProps = {
    itemIndex: number
    itemTitle: string, 
    itemChecked: boolean 
}

type archiveCardProps = {
    boardName: string, 
    listName: string, 
    card: cardProps
}