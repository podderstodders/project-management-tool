
type checkListHealthBarProps = {
    listLength: number,
    checkedLength: number
  }

export const CheckListHealthBar: React.FC<checkListHealthBarProps> = ({listLength, checkedLength}) => {
  
    const computePercentage = (numerator: number, denominator: number) => {
  
      if(numerator === 0 && denominator === 0){
        return 0;
      }
      return Math.ceil((numerator / denominator) * 100);
    }

    const thePercentage = computePercentage(checkedLength, listLength)
    let isDone = false;
    if(thePercentage === 100){
      isDone = true;
    }
    return (
      <div className="checklist-rowgrid health">
        <div className="checklist-rowgrid--lhs">
          <div>{computePercentage(checkedLength, listLength)}%</div>
        </div>
        <div className="checklist-rowgrid--rhs">
          <div className="checklist-health">
            <div className="checklist-health--container" style={{width: `${computePercentage(checkedLength, listLength)}%`, backgroundColor: isDone ? 'rgb(0, 187, 118)' : 'rgb(255, 0, 98)'}}></div>
          </div>
        </div>
      </div>
    )
  }
  