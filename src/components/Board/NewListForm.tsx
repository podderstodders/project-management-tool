import { useState } from "react";
type newListFormProps = {
    isActive: boolean,
    disableModalHandler: () => void;
    saveNewList: (str: string) => void;
  }
  
export  const NewListForm: React.FC<newListFormProps> = ({isActive, disableModalHandler, saveNewList}) => {
    const [listName, setListName] = useState('')
    if(!isActive) {
      return null;
    }
  
    const listNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setListName(event.target.value)
    }
    const submitList = () => {
      if(listName.length > 0){
        saveNewList(listName)
        setListName('')
      }
    }
  
    return (
      <div className="absolute-inputElement">
        <div className="absolute-container">
          <div>
            <input type="text" name="" id="" value={listName} onChange={listNameChange} placeholder="Enter list title..."/>
          </div>
          <div className='absolute-container--child'>
            <button className="btn-primary" onClick={submitList}>Add List</button>
            <button className="btn-darker" onClick={disableModalHandler}>X</button>
          </div>
        </div>
      </div>
    )
  }
  