import React, {useState} from 'react';
import {Modal, Button, Col, Row} from 'react-bootstrap';
import moment from "moment"
import Calendar from "./calendar"



function PopUpTask(props){
    
    const [editMode, setSaveMode] = useState(!props.edit)
    const editOrAddtask_Bool = props.edit;
    const [task, setTask] = useState(props.task);
    const [validTitle, setvalidTitle] = useState(false)
    
    const taskEditF = (e) =>{      
        setTask({
            ...task,
            [e.target.name]: e.target.value 
        })
    }
    
    const changeToSaveMode = () =>{
        setSaveMode(!editMode)
    }

    const setEditOrAddTask = () =>{
        if(task.title.length !== 0){
            const taskSv = whatChange(task);
            props.editOrAddTask(task, taskSv, editOrAddtask_Bool)
                .then(()=>{props.abrirModal()})
        }
        else{
            setvalidTitle(!validTitle)
        }
    }

    const whatChange = (task) =>{
        let taskSv = {};
        if(task.title !== props.task.title) taskSv.title = task.title;
        if(task.description !== props.task.description) taskSv.description = task.description;
        if(task.completed !== props.task.completed) taskSv.completed = task.completed;
        if(task.expires !== props.task.expires) taskSv.expires = task.expires;
        return taskSv;
    }

    return(
        <>
            <Modal dialogClassName="modal-60w" centered show={props.showModal} onHide={props.abrirModal}>
                    
                    <Modal.Header closeButton >
                        <Modal.Title>
                            <div className="my-font">
                                {
                                editMode?<div>  
                                            <input className="titlePopUpStyle" type="text" onChange={taskEditF} name="title" placeholder="Add Title" value={task.title} required/>
                                            {validTitle?<div><span className="alertPass noOk">Obligatory field</span></div>:<></>}
                                        </div>
                                        :<p className="my-font titlePopUpStyle">{task.title}</p>
                                }
                            </div>
                            
                        </Modal.Title> 
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                        <Row className="justify-content-md-center">
                            <Col md={12}>
                                {
                                    editMode? <div className="form-group">
                                                    <textarea className="form-control texAreaStyle" onChange={taskEditF} name="description" placeholder="Add Description"  value={task.description} rows="2"></textarea>
                                                </div>
                                            :<p className="my-font texAreaStyle">{task.description}</p>
                                }
                            </Col>
                        </Row>
                    </div>
                    <div>
                    {
                        editMode?<Row className="justify-content-md-center">
                                    <Col md={5}>
                                        <Calendar setDataTime={taskEditF} expires={task.expires}/>
                                    </Col>
                                    <Col md={7}>
                                            <></>
                                    </Col>
                                </Row>
                                :<Row className="justify-content-md-center">
                                        <Col md={11}>
                                        {
                                            !task.expires ?<></>
                                                          :<p className="my-font">Time to expire: {moment(task.expires).format("MMMM Do YYYY")}</p>
                                        }
                                        </Col>
                                        <Col md={1}>
                                            <span></span>
                                        </Col>
                                </Row>
                
                    }
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    {
                        (editMode) ? <Button className="btn" type="button" onClick={setEditOrAddTask}>Save</Button>
                        :<Button className="btn" type="button" onClick={changeToSaveMode}>Edit</Button>
                    }
                    </Modal.Footer>
               
            </Modal>
        </>
    );
}

export default PopUpTask;