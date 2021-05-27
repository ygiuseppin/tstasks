import React, {useState} from 'react';
import {Modal, Button, Col, Row} from 'react-bootstrap';
import moment from "moment"

function PopUpTask(props){
    
    const [saveMode, setSaveMode] = useState(!props.edit) //si vengo de add va false
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
       
        setSaveMode(!saveMode)
    }

    const setEditOrAddTask = () =>{
        if(task.title.length !== 0){
            props.editOrAddTask(task, editOrAddtask_Bool)
                .then(()=>{props.abrirModal()})
            
        }
        else{
            setvalidTitle(!validTitle)
        }
    }

    return(
        <>
            <Modal dialogClassName="modal-60w" centered show={props.showModal} onHide={props.abrirModal}>
                    
                    <Modal.Header closeButton >
                        <Modal.Title>
                            <div className="my-font">
                                {
                                saveMode?<div>  
                                            <input type="text" onChange={taskEditF} name="title" placeholder="Add Title" value={task.title} required/>
                                            {validTitle?<div><span className="alertPass noOk">Obligatory field</span></div>:<></>}
                                        </div>
                                        :<p className="my-font">{task.title}</p>
                                }
                            </div>
                            
                        </Modal.Title> 
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                        <Row className="justify-content-md-center">
                            <Col md={12}>
                                {
                                    saveMode? <div className="form-group">
                                                    <textarea className="form-control" onChange={taskEditF} name="description" placeholder="Add Description"  value={task.description} rows="2"></textarea>
                                                </div>
                                            :<p className="my-font">{task.description}</p>
                                }
                            </Col>
                        </Row>
                    </div>
                    <div>
                    {
                        saveMode?<Row className="justify-content-md-center">
                                    <Col md={11}>
                                        <input type="date" value={task.expires}/>
                                    </Col>
                                    
                                    <Col md={1}>
                                        <div className="checkbox">
                                            <input type="checkbox" ></input>
                                        </div>
                                    </Col>
                                </Row>
                                :<Row className="justify-content-md-center">
                                        <Col md={11}>
                                        {
                                            task.expire? <p></p>
                                                        :<p className="my-font">Time Expire: {moment(task.expires).format("MMMM Do YYYY")}</p>

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
                        (saveMode) ? <Button className="btn" type="button" onClick={setEditOrAddTask}>Save</Button>
                        :<Button className="btn" type="button" onClick={changeToSaveMode}>Edit</Button>
                    }
                    </Modal.Footer>
               
            </Modal>
        </>
    );
}

export default PopUpTask;