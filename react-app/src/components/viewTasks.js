import React from 'react';
import Task from "./tasks"
import AddTask from "./addTasks"

function ViewTask(props){
    
    const deleteForId = (id, list) =>{
            return list.filter(l => l.id !== id)
    }
    
    const deleteTask = (id_task) =>{
        let listOfTasks = props.tasks;
        listOfTasks = deleteForId(id_task, listOfTasks)
        props.updatingListOfTasks(listOfTasks)
    }

    const editCheckTask = (id_task) =>{
        let listOfTasks = props.tasks;
        const index = listOfTasks.findIndex(t => t.id === id_task)
        listOfTasks[index].completed = !listOfTasks[index].completed
        props.updatingListOfTasks(listOfTasks)
    }

    const editOrAddTask = (task, isEditTask) =>{
        let listOfTasks = props.tasks; //ojo aca, no se si un componente lo acomoda........ojo con el add
        if(isEditTask){
            const index = listOfTasks.findIndex(t => t.id === task.id);
            listOfTasks[index] = task;
            props.updatingListOfTasks(listOfTasks);
        }else{
            listOfTasks.push(task)
            props.updatingListOfTasks(listOfTasks)
        }
    
    }
        
    return(
        <>
           <div style={{marginBottom:"2%"}}><span className="no-tasks-tittle my-font" >My Tasks</span>
           <AddTask token={props.token} editOrAddTask={editOrAddTask} /></div>
           {props.tasks.map(t =>(
                    <div key={t.id} style={{marginTop:"7px"}}>
                        <Task delTask={deleteTask} task={t} editCheckTask={editCheckTask} editOrAddTask={editOrAddTask}/>  
                    </div>
                ))
            }
            {console.log(props.tasks)}
        </>
    );
}

export default ViewTask;