import { EditFormElementComponent } from "./form";
import { useState } from "react";


type checkListItemProps = {
    listItemIndex: number,
    listItemValue: string,
    listItemChecked: boolean 
    checkedHandler: (n: number) => void,
    uncheckedHandler: (n: number) => void,
    hideChecked: boolean,
    setListItemValue: (i: number, s: string) => void;
  }

/*
one way of thinking about it, is that the parent contains 
all the data as states. 

the first child, this case the item, contain its own properties from its parent, and in addition, 
other properties for the child's child. 

so the parent is the freaking single mother. 
anyways, this CheckListItem will recieve other handlers for its children, so prop drilling like crazy. 


*/
export const CheckListItem:React.FC<checkListItemProps> = ({listItemChecked,listItemValue, listItemIndex, hideChecked, checkedHandler, uncheckedHandler, setListItemValue}) => {
    const [isEditing, setIsEditing] = useState(false)  
    const isCheckedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if(event.target.checked){
        //a handler from app that recieves the index, and updates the checkbox state 

        checkedHandler(listItemIndex)
      } else {
        //unchecked, call the remove 
        uncheckedHandler(listItemIndex)
      }
    }

    if(listItemChecked && hideChecked){
        return null
    }


    return (
      <div className="checklist-rowgrid entry">
            <div className="checklist-rowgrid--lhs checkbox">
              <input type="checkbox" name="" id="" onChange={isCheckedHandler} checked={listItemChecked}/>
            </div>
            <div className="checklist-rowgrid--rhs">
              {
                isEditing ? <EditFormElementComponent textareaVal={listItemValue} closeHandler={() => setIsEditing(false)} onSubmitHandler={setListItemValue} elementIndex={listItemIndex}/> : <span id="hoverableSpan12" className={listItemChecked ? 'checked' : ''} onClick={() => setIsEditing(true)}>{listItemValue}</span>
              }
             

            </div>
          </div>
    )
  }
  