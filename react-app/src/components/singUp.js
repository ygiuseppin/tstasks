import React, {useState} from 'react';
import {Modal, Form, Button, Col, Row} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import axios from "axios";
import "../css/style.css"


const url = "http://localhost:3001/user/signup";


function SingUp() {
    
    const [error, setError] = useState("")
    const [fallo, setFallo] = useState(false)
    const [showModal, setModal] = useState(false);
    
    const [form, setForm] = useState({
        email:"",
        password:"",
        Rpassword:""
    });
  
    const setearModal = () =>{
        setModal(!showModal);
    }

    const handlerChange = async e => {
        await setForm({
             ...form,
             [e.target.name]: e.target.value
            })
    }
    
    
    const signUpEvent = async (event) => {
        event.preventDefault()
        
        if(form.email.length === 0){
            setError("Obligatory field")
            setFallo(true)
            return
        }
        
        if((form.Rpassword !== form.password) || (form.password.length === 0)){
            return
        }
        
        try{
            const res = await axios.post(url, {"email": form.email, "password": form.password })
            
            if(res.data.message === "User created"){
                setearModal()
                alert("Usuario creado exitosamente")
            }
        }catch(err){
            console.log(err);
            alert("Error al crear usuario "+err)
        }   
    }
    
    return(
           <> 
                <button className="btn" onClick={setearModal}>Sign Up</button>
                <Modal dialogClassName="modal-50w" centered show={showModal} onHide={setearModal}>
                     
                        <Modal.Header closeButton >
                            <Modal.Title>Sing Up</Modal.Title> 
                        </Modal.Header>
                        
                        <Modal.Body>
                            <Form onSubmit={signUpEvent}>
                                <Row className="justify-content-md-center">
                                    <Col md={6}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label><h4>Email</h4></Form.Label>
                                            <Form.Control onChange={handlerChange} name="email" type="email" placeholder="Enter Email" />
                                            {fallo ? <span className="alertPass noOk">{error}</span>:<></>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br />
                                <Row className="justify-content-md-center">
                                    <Col md={6}>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label><h4>Password</h4></Form.Label>
                                            <Form.Control onChange={handlerChange} name="password" type="password" placeholder="Password" />
                                            <br/>
                                            { form.Rpassword.length > 0 ?            
                                                   (form.Rpassword !== form.password) ?
                                                             <span className="alertPass noOk">Passwords do not match</span>
                                                            :<span className="alertPass ok">Passwords match</span>
                                                    :<></> 
                                                    
                                            }
                                            <Form.Control onChange={handlerChange} name="Rpassword" type="password" placeholder="Repeat Password" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br />
                                <Row className="justify-content-md-center">
                                    <Col md={2}>
                                        <Button variant="info" type="submit">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                                <br />
                            </Form>
                            
                        </Modal.Body>
                </Modal>
            </>
        );
};

export default SingUp;