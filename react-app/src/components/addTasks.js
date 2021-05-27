import React, {useState} from "react"
import PopUpTask from "./popUpTask"



function AddTask(props){
    
    const [showModal, setModal] = useState(false);
    
    const abrirModal = () =>{
        setModal(!showModal);
    }
    const taskVacia={
        "completed": false,
        "expires": "",
        "id": "",
        "title": "",
        "description": "",
        "created": ""
      }
    return(
        <>
            <button className="btn btn-circle btn-add float-right"  onClick={abrirModal} type="button"></button>
            {showModal?<PopUpTask edit={false} task ={taskVacia} token={props.token} showModal={showModal} abrirModal={abrirModal} editOrAddTask={props.editOrAddTask}/>
            :<span></span>
            }    
        </>
    );
}

export default AddTask;