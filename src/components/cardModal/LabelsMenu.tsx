import React, { useEffect, useState } from "react"
import { cardLabelProps, cardProps } from "../../@types/board"
import { UseBoardContext } from "../../context/boardcontext"

const colorLabels: Record<string, string> = {
	'thistle': '#CDB4DB',
	'fairy tale': '#FFC8DD',
	'carnation pink': '#FFAFCC',
	'uranian blue': '#BDE0FE',
	'light sky blue': '#A2D2FF',
	'blue green': '#219EBC',
	'apricot': '#FFB703',
	'orange': 'orange',
    'red': 'red',
	'amethyst': '#9B5DE5',
	'brilliant rose': '#F15BB5',
	'maize': '#FEE440',
    'green': 'green',
	'deep sky blue': '#00BBF9',
	'aquamarine': '#00F5D4',
    'blue': 'blue', 
	'pale azure': '#70D6FF',
	'cyclamen': '#FF70A6',
    'yellow': 'yellow',
	'atomic tangerine': '#FF9770',
	'naples yellow': '#FFD670',
    'purple': 'purple',
	'mindaro': '#E9FF70',
}

const defaultColorLabels = {
    'fairy tale': '#FFC8DD',
	'amethyst': '#9B5DE5',
	'brilliant rose': '#F15BB5',
	'maize': '#FEE440',
	'deep sky blue': '#00BBF9'
}

const convertColorListToArray = (data: Record<string, string>) => {
    return Object.keys(data).map<string[]>( (color) => {  
      return [color, data[color]]
    })
  }

//a function that recieves card.labels, and check if theres any 
//and return an array of 
//if a label is present in card.labels, it means its active 


const DefaultLabels = (labels: cardLabelProps[]): cardLabelProps[] => {
    const colors = convertColorListToArray(defaultColorLabels)
    if(labels.length === 0){
        return colors.map( (color, index) => ({
            labelColorName: color[0],
            labelColorCode: color[1],
            labelTitle: '',
            labelIsChecked: false,
            labelIndex: index
        }))
    } else {
        if(labels.length < colors.length) {
            const diff = colors.length - labels.length 
        const firstFewColors = colors.slice(0, diff)
        const ww: cardLabelProps[] = [...labels]

        firstFewColors.forEach( (color) => {
            ww.push({
                labelColorName: color[0],
                labelColorCode: color[1],
                labelTitle: '',
                labelIsChecked: false,
                labelIndex: ww.length
            })
        })
        return ww;
        }
        else return labels
        }
}



type labelMenuProps = {
    card: cardProps
    parentCloseHandler: () => void
}

//i think i need a higher order function, that eventually recieves the index of the label 
//that was checked, in this case we need to dispatch from here. 


export const LabelsMenu: React.FC<labelMenuProps> = ({card, parentCloseHandler}) => {
    const {dispatch} = UseBoardContext()
    const [activeLabels, setActiveLabels] = useState<cardLabelProps[]>([])
    const [createLabel, setCreateLabel] = useState(false)
    const [editLabel, setEditLabel] = useState({
        active: false,
        index: -1,
    })

    const editLabelSetter = (i: number) => {
        setEditLabel({
            active: true,
            index: i
        })
    }
    //for checked component
    const updateLabelCheckedHandler = (labelIndex: number, status: boolean) => {
        const updatedActiveLabels = activeLabels.map( (label) => label.labelIndex === labelIndex ? {...label, labelIsChecked: status} : label)
        setActiveLabels(updatedActiveLabels) 
        const updatedCard = {...card, labels: updatedActiveLabels}
        dispatch({type: 'UPDATE_CARD', payload: updatedCard})
    }

    const createNewLabelHandler = (title: string, name: string, code: string) => {
        const newLabel: cardLabelProps = {
            labelColorCode: code,
            labelColorName: name,
            labelTitle: title,
            labelIsChecked: true,
            labelIndex: activeLabels.length
        }
        const updatedLabels = activeLabels
        updatedLabels.push(newLabel)
        setActiveLabels(updatedLabels)
        const updatedCard = {...card, labels: updatedLabels} 
        dispatch({type: 'UPDATE_CARD', payload: updatedCard})
        setCreateLabel(false)
    }

    const updateLabelHandler = (label: cardLabelProps) => {
        const updatedActiveLabels = activeLabels.map( (lab) => lab.labelIndex === label.labelIndex ? label : lab )
        setActiveLabels(updatedActiveLabels)
        const updatedCard = {...card, labels: card.labels.map( (lab) => lab.labelIndex === label.labelIndex ? label : lab )}
        dispatch({type: 'UPDATE_CARD', payload: updatedCard})
        setEditLabel({
            active: false,
            index: -1
        })
    }


    //runs once to populate labels 
    useEffect( () => {
            
        const populatedLabels = DefaultLabels(card.labels)
        setActiveLabels(populatedLabels)
   
    }, [card.labels])


    return (
        <div className="labels-absolute--menu">
            {
                !createLabel
                && 
                !editLabel.active
                && 
                <div className="labels-menu--container">
                    <div className="labels-menu--row header">Labels</div>
                    <div className="labels-menu--row input">
                        <input type="search" name="" id="" placeholder="Search Labels..." />
                    </div>
                    <div className="labels-menu--row">
                        <p>Labels</p>
                        <LabelContainer labels={activeLabels} editHandler={editLabelSetter} checkedHandler={updateLabelCheckedHandler}/>
                    </div>
                    <div className="labels-menu--row">
                        <button className="btn-darker" onClick={() => setCreateLabel(true)}>Create a new label</button>
                    </div>
                    
                    <div className="labels-menu--row">
                        <button className="btn-darker" onClick={() => setCreateLabel(true)}>Show More Labels</button>
                    </div>
                    <div className="labels-menu--absolute--exitbtn">
                        <button className="btn-nobg" onClick={parentCloseHandler}>x</button>
                    </div>

                </div>
            }
            {
                createLabel 
                && 
                !editLabel.active 
                &&
                <LabelCreateMenu goBackHandler={() => setCreateLabel(false)} closeHandler={parentCloseHandler} newLabelHandler={createNewLabelHandler}/>
            }
            {
                !createLabel 
                && 
                editLabel.active 
                && 
                <LabelEditMenu label={activeLabels[editLabel.index]} goBackHandler={() => setEditLabel({active: false, index: -1})} closeHandler={parentCloseHandler} saveHandler={updateLabelHandler}/>
            }
            
        </div>
    )
}

type labelContainerProps = {
    labels: cardLabelProps[]
    editHandler: (i: number) => void;
    checkedHandler: (i: number, b: boolean) => void;
}
const LabelContainer: React.FC<labelContainerProps> = ({labels, editHandler, checkedHandler}) => {
  
    return (
        <div className="labels-menu--grid">
            {
                labels.map( (label, index) => (
                    <LabelRow key={index} label={label} editLabelHandler={editHandler} checkedHandler={checkedHandler}/>
                ))
            }
        </div>
    )
}

type labelRowProps = {
    label: cardLabelProps
    editLabelHandler: (index: number) => void;
    checkedHandler: (i: number, b: boolean) => void;

}
const LabelRow: React.FC<labelRowProps> = ({label, editLabelHandler, checkedHandler}) => {
   
    const checkeddHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
       
        console.log(`index-${label.labelIndex} - checked-${event.target.checked}`)
        checkedHandler(label.labelIndex, event.target.checked)
        //dispatch 
    }
    return (
        <div className="flex-row" key={label.labelIndex}>
            <div className="flex-item--checkbox">
                <input type="checkbox" name="" id="" checked={label.labelIsChecked} onChange={checkeddHandler}/>
            </div>
            <div className="flex-item--color" style={{backgroundColor: label.labelColorCode}}>
                <div className="flex-item--color__absolute">color: {label.labelColorName}, title: {label.labelTitle.length > 0 ? label.labelTitle : 'none'}</div>
            </div>
            <div className="flex-item--edit" onClick={() => editLabelHandler(label.labelIndex)}>
                <span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
            </div>
        </div>
    )
}

type labelEditMenuProps = {
    label: cardLabelProps
    saveHandler: (label: cardLabelProps) => void
    goBackHandler: () => void
    closeHandler: () => void
}

const LabelEditMenu:React.FC<labelEditMenuProps> = ({label, saveHandler, goBackHandler, closeHandler}) => {
    const [editLabel, setEditLabel] = useState({
        title: label.labelTitle,
        colorName: label.labelColorName,
        colorCode: label.labelColorCode
    })
  
    const labelTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditLabel({...editLabel, title: event.target.value})
    }

    const saveEditedLabelHandler = () => {
        const ww: cardLabelProps = {
            labelColorCode: editLabel.colorCode,
            labelColorName: editLabel.colorName,
            labelTitle: editLabel.title,
            labelIsChecked: label.labelIsChecked,
            labelIndex: label.labelIndex
        }
        saveHandler(ww)
    }


    const [textColorToggle, setTextColorToggle] = useState(false) 
    const ccolors = convertColorListToArray(colorLabels)
    console.log(label)
    return (
        <div className="labels-menu--container edit">
                <div className="label-edit--row header">
                    <div>
                        <button className="btn-nobg" onClick={goBackHandler}>{`<`}</button>
                    </div>
                    <div>Edit Label</div>
                    <div>
                        <button className="btn-nobg" onClick={closeHandler}>x</button>
                    </div>
                </div>
                <div className="label-edit--row display">
                    <div className="display--container" style={{backgroundColor: editLabel.colorCode, color: textColorToggle ? 'black' : 'white'}} onClick={() => setTextColorToggle(!textColorToggle)}>
                        {
                            editLabel.title
                        }
                    </div>
                </div>
                <div className="label-edit--row input">
                    <p>Title</p>
                    <div className="input-container">
                        <input type="text" name="" id="" value={editLabel.title} onChange={labelTitleHandler}/>
                    </div>
                </div>
                <div className="label-edit--row selections">
                    <p>Select a color</p>
                    <div className="selections-container">
                        {
                            ccolors.map( (color, index) => (
                                <div className="selections-item" key={index} style={{border: color[1] === editLabel.colorCode ? '2px solid blue' : '2px solid transparent'}}>
                                    <div className="selections-item--container" style={{backgroundColor: color[1]}} onClick={() => setEditLabel({...editLabel, colorName: color[0], colorCode: color[1]})}>
                                        <div className="selections-item--container__absolute">{color[0]}</div>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
                <div className="label-edit--row button">
                    <button className="btn-darker" onClick={() => setEditLabel({...editLabel, colorCode: ''})}>x Remove color</button>
                </div>
                <div className="label-edit--row divider">
                    <div className="divider-container"></div>
                </div>
                <div className="label-edit--row flexed">
                    <button className="btn-primary" onClick={saveEditedLabelHandler}>Save</button>
                    <button className="btn-danger">Delete</button>
                </div>
        </div>
    )
}

type labelCreateMenuProps = {
    goBackHandler: () => void
    closeHandler: () => void
    newLabelHandler: (title: string, name: string, code: string) => void;
}
const LabelCreateMenu: React.FC<labelCreateMenuProps> = ({goBackHandler, closeHandler, newLabelHandler}) => {
    const [newLabel, setNewLabel] = useState({
        title: '',
        colorCode: '',
        colorName: '',
    })

    const titleInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewLabel({...newLabel, title: event.target.value})
    }
    const colorInputHandler = (name: string, code: string) => {
        setNewLabel({...newLabel, colorName: name, colorCode: code})
    }

    const createLabelHandler = () => {
        if(newLabel.colorCode.length > 0){
            newLabelHandler(newLabel.title, newLabel.colorName, newLabel.colorCode)
            setNewLabel({
                title: '',
                colorCode: '',
                colorName: '',
            })
        }
    }
    const ccolors = convertColorListToArray(colorLabels)
    return (
        <div className="labels-menu--container edit">
                <div className="label-edit--row header">
                    <div>
                        <button className="btn-nobg" onClick={goBackHandler}>{`<`}</button>
                    </div>
                    <div>Create Label</div>
                    <div>
                        <button className="btn-nobg" onClick={closeHandler}>x</button>
                    </div>
                </div>
                <div className="label-edit--row display">
                    <div className="display--container" style={{backgroundColor: newLabel.colorCode}}>
                        {newLabel.title}
                    </div>
                </div>
                <div className="label-edit--row input">
                    <p>Title</p>
                    <div className="input-container">
                        <input type="text" name="" id="" value={newLabel.title} onChange={titleInputHandler}/>
                    </div>
                </div>
                <div className="label-edit--row selections">
                    <p>Select a color</p>
                    <div className="selections-container">
                    {
                        ccolors.map( (color, index) => (
                            <div className="selections-item" key={index} style={{border: newLabel.colorCode === color[1] ? '2px solid blue' : '2px solid transparent'}}>
                                <div className="selections-item--container" style={{backgroundColor: color[1]}} onClick={() => colorInputHandler(color[0], color[1])}>
                                    <div className="selections-item--container__absolute">{color[0]}</div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className="label-edit--row button">
                    <button className="btn-darker" onClick={() => setNewLabel({...newLabel, colorCode: ''})}>x Remove color</button>
                </div>
                <div className="label-edit--row divider">
                    <div className="divider-container"></div>
                </div>
                <div className="label-edit--row flexed">
                    <button className="btn-primary" onClick={createLabelHandler}>Create</button>
                 
                </div>
        </div>
    )
}