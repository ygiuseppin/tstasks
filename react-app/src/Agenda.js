import React, {useState} from 'react';
import Header from "./components/header"
import ViewTask from "./components/viewTasks"
import "./css/style.css"
import "bootstrap/dist/css/bootstrap.min.css";

function Agenda(){
  
  const [userState, setUserState] = useState({
    connect: false,
    email: "",
    token: "",
    tasks:[],
  });

  const updatingListOfTasks = (newListTasks) =>{
    setUserState({
      ...userState,
      tasks:newListTasks
    })
  };

  const changeUserState = (userState) => {
    setUserState( userState )
  };

  return (
      <>
          <Header user={userState} setUserState={changeUserState}/>
          <div className="contenedorDeTareas">
           
            {(userState.tasks.length) ? <>
                                          <ViewTask tasks={userState.tasks} updatingListOfTasks={updatingListOfTasks}/>
                                        </>
            : <div className="no-tasks-tittle my-font">You don´t have tasks</div>
            }
          </div>
      </>
    );
  }
export default Agenda;

/*
const [userState, setUserState] = useState({
    connect: false,
    email: "",
    token: "",
    tasks:[
      {
        "completed": true,
        "expires": "2021-12-12T03:00:00.000Z",
        "id": "60a8f3fc33962538743cce2b",
        "tittle": "Mi tarea 1",
        "description": "Tarea de pepe",
        "created": "2021-05-22T12:07:24.134Z"
      },
      {
        "completed": false,
        "expires": "2021-03-12T03:00:00.000Z",
        "id": "60a8f3fc33962538743ccb",
        "tittle": "Mi tarea 2",
        "description": "Tarea de pepe",
        "created": "2021-05-22T12:07:24.134Z"
    },
    {
      "completed": true,
      "expires": "2020-12-12T03:00:00.000Z",
      "id": "2538743ccb",
      "tittle": "Mi tarea 3",
      "description": "Tarea de p",
      "created": "2021-05-22T12:07:24.134Z"
  },
  {
      "completed": false,
      "expires": null,
      "id": "60a995f30cb472d9ce",
      "tittle": "Mi tarea 4",
      "description": "Tarea de pepe",
      "created": "2021-08-23T07:07:21.982Z"
  }],
        
  });

*/