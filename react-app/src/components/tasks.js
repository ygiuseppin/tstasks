import React, {useState} from 'react';
import moment from "moment"
import PopUpTask from "./popUpTask"

function Task(props){
   
    const [showModal, setModal] = useState(false);
    const [taskComplete, setTaskComplete] = useState(props.task.completed)
    
            
    
    const abrirModal = (e) =>{
        if(!(e && e.target && e.target.name && [e.target.name][0] ==="checkbox"))
            setModal(!showModal);
    }
    
    const changeCheked = () =>{
       
        props.editCheckTask(props.task.id);
        setTaskComplete(!taskComplete);
    }

    const timeLimit = () =>{
        const today = moment();
        const timeExpire = moment(props.task.expires);
        const res = timeExpire.diff(today,"day");
        return res;
    };

    const deleteTask = () =>{
        
        props.delTask(props.task.id);
    };

    return(
        <>  
            
            <div onClick={abrirModal} className="card task" style={{width: "auto"}}>
                <div className="card-body">
                    
                    <div className="my-container">
                        <div className="row ustify-content-lg-center">
                            <div className="col-2">
    
                                <div>
                                    <input type="checkbox" id={"completar"+props.task.id} onClick={changeCheked} defaultChecked={props.task.completed}></input>
                                    {taskComplete?<label className="my-font check-Finished" name="checkbox" for={"completar"+props.task.id}>Finished</label>
                                    :<label className="my-font check-To-complete" name="checkbox" for={"completar"+props.task.id}>To complete</label>
                                    }
                                </div>
                                 
                            </div>
                            <div className="col-6 ">
                                <div className="title-task my-font">{props.task.title}</div>
                            </div>
                            <div className="col-3">
                                {
                                    props.task.completed?<span></span>
                                        :!props.task.expires ? <span></span>
                                        :(timeLimit() >= 0) ? <div className="time-expire my-font">Expires {moment(props.task.expires).fromNow()}</div>
                                                            : <div className="time-expire my-font">Expired {moment(props.task.expires).fromNow()}</div>
                                }
                            </div>
                            <div className="col-1">
                                <div>
                                    <button onClick={deleteTask} className="btn btn-circle btn-delete float-right" type="button"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal?<PopUpTask task={props.task} token={props.token} edit={true} showModal={showModal} abrirModal={abrirModal} editOrAddTask={props.editOrAddTask}/>
            :<span></span>
            }                   
        </>
    )
};

export default Task;