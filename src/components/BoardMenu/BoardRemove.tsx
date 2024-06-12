
type boardRemoveProps = {
    boardState: string 
}

export const BoardRemove: React.FC<boardRemoveProps> = ({boardState}) => {

    if(boardState !== 'remove board') return null 
    return (
        <>
        <div className="app-menu--row boardremove">
          <p>R u sure? </p>
          <button className="btn-danger" style={{width: '100%'}}>Close Board</button>
        </div>  
  
        </>
    )
}