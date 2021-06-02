import React from 'react';
import Task from "./tasks"
import AddTask from "./addTasks"
import axios from "axios";

function ViewTask(props){
    
    const seachForId = (id, list) =>{
            return list.filter(l => l.id !== id)
    }
    
    const deleteTask = async(id_task) =>{
        try{
            const res = await axios.delete("http://localhost:3001/tasks/delete/"+id_task, {headers:{'Authorization':`Bearer ${props.token}`}});
            if(res.data.message === "Task deleted"){
                let listOfTasks = props.tasks;
                listOfTasks = seachForId(id_task, listOfTasks)
                props.updatingListOfTasks(listOfTasks)
            }
        }catch(err){
            console.log(err);
        }
    }

    const editCheckTask = (id_task) =>{
        let listOfTasks = props.tasks;
        const index = listOfTasks.findIndex(t => t.id === id_task)
        listOfTasks[index].completed = !listOfTasks[index].completed
        props.updatingListOfTasks(listOfTasks)
    }

    const editOrAddTask = async (task, taskSv, isEditTask) =>{
        const urlAdd ="http://localhost:3001/tasks/new"
        
        let listOfTasks = props.tasks;
        if(isEditTask){
            try {
                
                const res = await axios.patch("http://localhost:3001/tasks/update/"+task.id, taskSv, {headers:{'Authorization':`Bearer ${props.token}`}});
                if(res.data.message === "Task updated"){
                    const index = listOfTasks.findIndex(t => t.id === task.id);
                    listOfTasks[index] = task;
                    props.updatingListOfTasks(listOfTasks);
                }
            } catch (error) {
                console.log(error);
            }
            
        }else{
            
            try {
                const res = await axios.post(urlAdd,{"title":task.title}, {headers:{'Authorization':`Bearer ${props.token}`}});
                if (res.data.message === "Task created") {
                    listOfTasks.push(task)
                    props.updatingListOfTasks(listOfTasks)
                }
            } catch(err) {
                console.log(err);
            }
            
        }
    
    }
        
    return(
        <>
           <AddTask token={props.token} editOrAddTask={editOrAddTask} />
           {props.tasks.length?<div><div style={{marginBottom:"2%"}}><span className="no-tasks-title my-font" >My Tasks</span>
                                    
                                </div>
                                <div>
                                {props.tasks.map(t =>(
                                            <div key={t.id} style={{marginTop:"7px"}}>
                                                <Task delTask={deleteTask} task={t} editCheckTask={editCheckTask} editOrAddTask={editOrAddTask}/>  
                                            </div>
                                        ))}</div></div>
            :<div><span className="no-tasks-title my-font" >You don´t have tasks</span></div>                       
            }
            
        </>
    );
}

export default ViewTask;