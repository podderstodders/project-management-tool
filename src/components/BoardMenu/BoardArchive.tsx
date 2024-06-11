

type boardArchiveProps = {
    boardState: string 
}

export const BoardArchive: React.FC<boardArchiveProps> = ({boardState}) => {

    if(boardState !== 'archived') return null 
    return (
        <>
        <div className="app-menu--row flexedactivities">
          <button className="btn-primary">Switch to Lists</button>
          <button className="btn-third">Switch to Cards</button>
        </div>  
        <div className="app-menu--row divider"></div>         
        <div className="app-menu--row items">
           No Archived Items
        </div>
        </>
    )
}