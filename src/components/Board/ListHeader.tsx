import { useState } from "react"
type listHeaderProps = {
    name: string
}

export const ListHeader: React.FC<listHeaderProps> = ({name}) => {
    const [menuToggle, setMenuToggle] = useState(false)
    return (
        <div className="list-item--header">
            <div>{name}</div>
            <div>
            <button className='btn-nobg' onClick={() => setMenuToggle(!menuToggle)}>
                <span>
                <svg fill="#000000" height="15" width="15" id="Layer_1" data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path className="cls-1" d="M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z"/>
                </svg>
                </span>
            </button>
            </div>
   
        </div>
    )
}
