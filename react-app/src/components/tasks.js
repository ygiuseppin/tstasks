import React, {useState} from 'react';
import moment from "moment"
import PopUpTask from "./popUpTask"

function Task(props){
   
    const [showModal, setModal] = useState(false);
    
    const abrirModal = (e) =>{
        
        if(!(e && e.target && e.target.name && [e.target.name][0] ==="checkbox"))
            setModal(!showModal);
    }
    
    const changeCheked = () =>{
       
        props.editCheckTask(props.task.id);
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
                            <div className="col-1">
    
                                <div className="checkbox">
                                    <input type="checkbox" name="checkbox" onClick={changeCheked} defaultChecked={props.task.completed}></input>
                                </div>
                                 
                            </div>
                            <div className="col-6 ">
                                <div className="tittle-task my-font">{props.task.tittle}</div>
                            </div>
                            <div className="col-3">
                                {
                                (props.task.completed)?<span className="time-expire my-font">Task Completed</span>
                                    :(!props.task.expires) ? <span></span>
                                        :(timeLimit() >= 0) ? <div className="time-expire my-font">Expires {moment(props.task.expires).fromNow()}</div>
                                        : <div className="time-expire my-font">Expired {moment(props.task.expires).fromNow()}</div>
                                }
                            </div>
                            <div className="col-2">
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