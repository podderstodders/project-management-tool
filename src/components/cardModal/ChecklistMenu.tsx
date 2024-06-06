import {useState} from 'react'
import { cardProps, checkListProps } from '../../@types/board'
import { UseBoardContext } from '../../context/boardcontext'

type checkListMenuProps = {
    card: cardProps
}

export const CheckListMenu: React.FC<checkListMenuProps> = ({card}) => {
    const {dispatch} = UseBoardContext()
    const [checkListMenuToggle, setCheckListMenuToggle] = useState(false)
    const [title, setTitle] = useState('')
    const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const addNewCheckListHandler = () => {
        //adding to checklist 
       if(title.length > 0) {
        const checkListArray = card.checklists && card.checklists.length > 0 ? card.checklists : [] 
        //create a new checkList 
        const newCheckList = {
            checklistId: Number(`${card.id}.${checkListArray.length + 1}`),
            title: title
        } as checkListProps
        checkListArray.push(newCheckList) 
        dispatch({type: 'UPDATE_CARD', payload: {...card, checklists: checkListArray}})
        setCheckListMenuToggle(false)
        setTitle('')
       }
    }

    return (
        <div className="rhs-row--item">
            <a className="btn-darker" onClick={() => setCheckListMenuToggle(!checkListMenuToggle)}>
                <span className="rhs-row--item__svg">
                <svg fill="#000000" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z"/><path d="M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z"/></svg>
                </span>
                <span className="rhs-row--item__text">Checklist</span>
            </a>
            {
                checkListMenuToggle && <div className="checklistmenu">
                <div className="checklistmenu-container">
                    <div className="checklistmenu-row header">Add checklist</div>
                    <div className="checklistmenu-row input">
                        <div>Title</div>
                        <input type="text" name="" id="" placeholder="Checklist" value={title} onChange={titleHandler}/>
                    </div>
                    <div className="checklistmenu-row input">
                        <div>Copy items from....</div>
                        <select name="" id="">
                            <option value="null">(none)</option>
                            <option value="list1">list1</option>
                            <option value="list2">list2</option>
                        </select>
                    </div>
                    <div className="checklistmenu-row">
                        <button className="btn-primary" onClick={addNewCheckListHandler}>Add</button>
                    </div>
                    <div className="checklistmenu-absolute--exitbtn">
                        <button className="btn-nobg" onClick={() => setCheckListMenuToggle(false)}>x</button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}