import { useEffect, useState } from 'react'
import { ChecklistForm } from './form'
import { CheckListHealthBar } from './healthbar'
import { CheckListItem } from './item'
import { DeleteModal } from './modals'
import { ChecklistCompleteMessage } from './utils'
import { cardProps } from '../../@types/board'
import { UseBoardContext } from '../../context/boardcontext'
import { checkListItemProps } from '../../@types/board'
//helper function 



type theCheckListProps = {
  checklistId: number
  card: cardProps,
  title: string 
}


//does it really need all of  this informaiton 
export const TheCheckList: React.FC<theCheckListProps> = ({checklistId, card, title}) => {
    const {dispatch} = UseBoardContext() 
    //algo stuff
    const [list, setList] = useState<Array<checkListItemProps>>([])
    const [checkboxes, setcheckboxes] = useState<Set<number>>(new Set())

    //aesthetics 
    const [newItemToggle, setNewItemToggle] = useState(false)

    //for hiding checked items
    const [hideCheckedItems, setHideCheckedItems] = useState(false)

    //for deleting item 
    const [deleteListToggle, setDeleteListToggle] = useState(false)

    //handler to update card for adding a checklist item, and callling dispatch update, and passing in 
    //the newly updated card 


    const addItemHandler = (str: string) => {
        const itemIndex = list ? list.length : 0
        const temp: checkListItemProps = {
          itemTitle: str,
          itemIndex: itemIndex,
          itemChecked: false
        }

        let updatedList: checkListItemProps[];
       
        if(!list) {
          updatedList = [temp]

        } else {
     
          temp.itemIndex = itemIndex
         updatedList = [...list, temp]
        }
        setList(updatedList)
        const updatedCard: cardProps = {...card, 
                                        checklists: card.checklists
                                                    &&
                                                    card.checklists.length > 0 
                                                    ? 
                                                    card.checklists.map( (checklist) => 
                                                      checklist.checklistId === checklistId 
                                                      ? 
                                                      {...checklist, items: updatedList}
                                                      : 
                                                      checklist
                                                    )
                                                    :
                                                    [
                                                      {
                                                        checklistId,
                                                        title: str,
                                                        items: updatedList
                                                      }
                                                    ]
                                      }
        //dispatch 
        dispatch({type: 'UPDATE_CARD', payload: updatedCard})
    }

    const editItemHandler = (index: number, newValue: string) => {
        if(index >= 0  && index < list.length) {
          const updatedList = list.map( (item) => {
            if(item.itemIndex === index) {
                item.itemTitle = newValue
            }
            return item;
          })                   
          
          setList(updatedList)
          const updatedCard: cardProps = {...card, 
            checklists: card.checklists?.map( (checklist) => 
                          checklist.checklistId === checklistId 
                          ? 
                          {...checklist, items: checklist.items?.map( item => 
                            item.itemIndex === index 
                            ? 
                            {...item, title: newValue}
                            : 
                            item 
                          )}
                          : 
                          checklist
                        )
          }
          dispatch({type: 'UPDATE_CARD', payload: updatedCard})
        }
      }

    const addCheckboxHandler = (index: number) => {
  
        //also update list 
        const updatedList = list.map( (item) => {
          if(item.itemIndex === index){
            item.itemChecked = true
          }
          return item
        })
        setList(updatedList)
        
        if(!checkboxes.has(index)){
          const ww = new Set(checkboxes)
          ww.add(index)
          setcheckboxes(ww)
        }

        const updatedCard: cardProps = {...card, 
          checklists: card.checklists?.map( (checklist) => 
                        checklist.checklistId === checklistId 
                        ? 
                        {...checklist, items: checklist.items?.map( item => 
                          item.itemIndex === index 
                          ? 
                          {...item, itemChecked: true}
                          : 
                          item 
                        )}
                        : 
                        checklist
                      )   
        }
        dispatch({type: 'UPDATE_CARD', payload: updatedCard})

      }


      const removeCheckboxHandler = (index: number) => {
        //a problem here 
        const updatedList = list.map( (item) => {
          if(item.itemIndex === index){
            item.itemChecked = false
          }
          return item
        })
        setList(updatedList)
        const temp = checkboxes;
        if(temp.has(index)) {
          temp.delete(index)
          setcheckboxes(temp)
        }
        //perform dispatch here to update card by index, setting checked to false 
        const updatedCard: cardProps = {...card, 
          checklists: card.checklists?.map( (checklist) => 
                        checklist.checklistId === checklistId 
                        ? 
                        {...checklist, items: checklist.items?.map( item => 
                          item.itemIndex === index 
                          ? 
                          {...item, itemChecked: false}
                          : 
                          item 
                        )}
                        : 
                        checklist
                      )   
        }
        dispatch({type: 'UPDATE_CARD', payload: updatedCard})
      }

    const clearListHandler = () => {
        
        if(list.length > 0) {
            setList([])
            setcheckboxes(new Set())
        }
        const updatedChecklist = card.checklists!.map( (checklist) => checklist.checklistId === checklistId ? {...checklist, items: undefined} : checklist)
        dispatch({type: 'UPDATE_CARD', payload: {...card, checklists: updatedChecklist}})
    }

    const deleteCheckListHandler = () => {

      const updatedCard = card.checklists!.filter( (checklist) => checklist.checklistId !== checklistId)
      setDeleteListToggle(false)
      dispatch({type: 'UPDATE_CARD', payload:  {...card, checklists: updatedCard}})
    }

    //whenever an itme is added to the list, hide all the helper toggles 

    useEffect( () => {
        setNewItemToggle(false)
        setHideCheckedItems(false)
    }, [list])

    //whenever the component mounts, once, should check if there are checklist items and fill them up 
    useEffect ( () => {
      if(card.checklists && card.checklists.length > 0){
        const theRightChecklistItems = card.checklists.filter( (checklist) => checklist.checklistId === checklistId)[0]

        if(theRightChecklistItems.items){
          setList(theRightChecklistItems.items)
          const checked = theRightChecklistItems.items.reduce<number[]>( (acc, obj) => {
            if(obj.itemChecked){
              acc.push(obj.itemIndex)
            }
            return acc;
          }, [])
          setcheckboxes(new Set(checked))
        } 
      }
    
    }, [card.checklists, checklistId])


    return (
    <>
      <div className="checklist">
        <div className="checklist-rowgrid checklistHeader">
          <div className="checklist-rowgrid--lhs">
            <div>
              <svg width="30" height="30" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" >
                <path d="M0 0h48v48H0z" fill="none"/>
                <g id="Shopicon">
                  <polygon points="30.953,11.905 30.953,8.095 8.095,8.095 8.095,39.905 39.905,39.905 39.905,20.75 36.095,20.75 36.095,36.095 
                    11.905,36.095 11.905,11.905 	"/>
                  <polygon points="41,7.172 24,24.172 17,17.172 14.171,20 21.172,27 21.171,27 24,29.828 26.828,27 43.828,10 	"/>
                </g>
              </svg>
            </div>
          </div>
          <div className="checklist-rowgrid--rhs">
            <h3>{title}</h3>
            <div className="flexed">
            {
              checkboxes.size > 0 ? ( 
                hideCheckedItems ? (
<button className="btn-secondary" onClick={() => setHideCheckedItems(!hideCheckedItems)}>Show Checked Items ({checkboxes.size})</button>
                ) : (
                  <button className="btn-third" onClick={() => setHideCheckedItems(!hideCheckedItems)}>Hide Checked Items</button>
                ) 
              ) : (null) 
            }
            <button className="btn-danger" onClick={clearListHandler}>Clear List</button>
            <button className='btn-nobg' onClick={() => setDeleteListToggle(!deleteListToggle)}>Delete</button>
            <DeleteModal isActive={deleteListToggle} closeModalHandler={() => setDeleteListToggle(!deleteListToggle)} deleteCheckListHandler={deleteCheckListHandler}/>
            
            </div>
          </div>
        </div>

        <CheckListHealthBar listLength={list?.length ?? 0} checkedLength={checkboxes.size}/>
        {
          list && list.length >= 0 && list.map( (item, index) => (
          <CheckListItem listItemChecked={item.itemChecked}listItemValue={item.itemTitle} listItemIndex={item.itemIndex} key={index} checkedHandler={addCheckboxHandler} uncheckedHandler={removeCheckboxHandler} hideChecked={hideCheckedItems} setListItemValue={editItemHandler}/>
          ))
        }
        <ChecklistCompleteMessage listLength={list.length} checkedLength={checkboxes.size} ishidingActive={hideCheckedItems}/>
        
        <ChecklistForm isActive={newItemToggle} cancelHandler={() => setNewItemToggle(!newItemToggle)} addItemHandler={addItemHandler}/>
        {
          !newItemToggle && <div className="checklist-rowgrid addBtn">
          <div className="checklist-rowgrid--lhs">
          </div>
          <div className="checklist-rowgrid--rhs">
            <button className="btn-secondary" onClick={() => setNewItemToggle(!newItemToggle)}>Add an Item</button>
          </div>
        </div>
        }
      </div>
      
    </>
    )
}