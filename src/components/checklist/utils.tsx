
type checklistCompleteMessageProps = {
    listLength: number,
    checkedLength: number,
    ishidingActive: boolean
}

export const ChecklistCompleteMessage: React.FC<checklistCompleteMessageProps> = ({listLength, checkedLength, ishidingActive}) => {

    if(listLength === checkedLength && ishidingActive) {
        return (
            <div className="checklist-rowgrid entry">
                <div className="checklist-rowgrid--lhs">
                </div>
                <div className="checklist-rowgrid--rhs">
                    <p className="lighter">Everything in this checklist is complete!</p>
                </div>
            </div>
        )
    } else {
        return null;
    }
}