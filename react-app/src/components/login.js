import React, {useState} from 'react';
import {Modal, Form, Button, Col, Row} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import axios from "axios";
import Cookie from "universal-cookie"

const url = "http://localhost:3001/user/login";
const cookie = new Cookie();

function Login() {
    
    const [showModal, setModal] = useState(false);
    
    const abrirModal = () =>{
        setModal(!showModal);
    }

    const [form, setForm] = useState({
        email:"",
        password:""
    });

    let handlerChange = async e => {
        await setForm({
             ...form,
             [e.target.name]: e.target.value
             })
    }
    
    const loginEvent = async (event) => {
        event.preventDefault()
        await axios.post(url, {"email": form.email, "password": form.password })
         .then(res => {
            console.log("entre 1")
            
            return res.data })
         .then(data =>{
             console.log(data)
            if(data.message === "Auth success"){
                console.log("entre 2 "+data)
                cookie.set("token", data.token, {path: "/"});
                cookie.set("email", form.email, {path: "/"});
                abrirModal()
            }
         })
         .catch(err => {
             console.log("error: "+err)
         })
    }
        
        return(
           <> 
                <button centered="true" onClick={abrirModal}>Login</button>
                <Modal dialogClassName="modal-50w" centered show={showModal} onHide={abrirModal}>
                     
                        <Modal.Header closeButton >
                            <Modal.Title>Login </Modal.Title> 
                        </Modal.Header>
                        
                        <Modal.Body>
                            <Form onSubmit={loginEvent}>
                                <Row className="justify-content-md-center">
                                    <Col md={6}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label><h4>Email</h4></Form.Label>
                                            <Form.Control onChange={handlerChange} name="email" type="email" placeholder="Enter Email" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br />
                                <Row className="justify-content-md-center">
                                    <Col md={6}>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label><h4>Password</h4></Form.Label>
                                            <Form.Control onChange={handlerChange} name="password" type="password" placeholder="Password" />
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

export default Login;