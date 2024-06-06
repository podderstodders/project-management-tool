

type deleteModalProps = {
    isActive: boolean,
    closeModalHandler: () => void;
    deleteCheckListHandler: () => void;
}

export const DeleteModal: React.FC<deleteModalProps> = ({isActive, closeModalHandler, deleteCheckListHandler}) => {

    if(!isActive) {
        return null;
    }
    
    return (
        <div className="checklist-absolute--deleteModal">
            <div className="deleteModal-container">
            <h4>Delete Me Motherfucker?</h4>
            <p>Deleting a checklist is permanent and there is no way to get it back.</p>
            <button className="btn-danger erect" onClick={deleteCheckListHandler}>Delete checklist</button>
            <button className="btn-nobg absolute" onClick={closeModalHandler}>X</button>
            </div>
        </div>
    )
}