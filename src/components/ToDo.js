import React, { useState, useEffect } from 'react';
let ToDo = () =>{


        //setting the toDos list to the saved array, which will just be empty if nothing was saved
        let [toDos, setToDos] = useState([]);
        let [task, setTask] = useState('');

    //loads saved To Do list as a string from local storage upon component mounting and whenever todo list changes (via adding or deleting or toggling)
    useEffect(()=>{
        let toDoSavedString = localStorage.getItem('stringToSave');
    
        //retrieving the saved to do list string and converting it to the array, if there isn't one, it will remain empty
        if(toDoSavedString){
            let toDoSavedArray = JSON.parse(toDoSavedString);
            setToDos(toDoSavedArray)
          
        }else{
           
        }
    },[])

    //saves To Do list everytime a change is made
    useEffect( () =>{
        let savingString = JSON.stringify(toDos);
        localStorage.setItem('stringToSave',savingString);
        

    },[toDos])


   


    //function to add a new task{
    let addATask = () =>{
        //if there is a task entered (once you remove leading and trailing whitespace, the task is not empty)
        if(task.trim() !== ""){
            setToDos( [...toDos, {
                id:Date.now(),
                text:task,
                completed:false
            }]);
            // let toDoSavedString = JSON.stringify(toDos);
            // localStorage.setItem('stringToSave',toDoSavedString);
            // console.log("added")

            //clear the task input
            setTask("")
        }
    }

    //function to toggle completed for a toDo task
    let toggleToDo = (id) =>{
        setToDos(
            toDos.map( (toDo) =>
            toDo.id == id? {...toDo, completed: !toDo.completed} : toDo)
        )
    }

    
    
    return(
        <>
        <h1>To Do List</h1>
        <div>
        <ul>
            {toDos
                .filter( (toDo) => !toDo.completed)
                .map( (toDo) => (
                    
                    <li key={toDo.id}>
                        <input
                            type="checkbox"
                            checked={toDo.completed}
                            onChange={()=>toggleToDo(toDo.id)}
                        />
                        <span 
                            style={{textDecoration:toDo.completed?'line-through':'none'}}
                        >
                            {toDo.text}
                        </span>
                    </li>
                ))}
            {toDos
                .filter( (toDo) => toDo.completed)
                .map( (toDo) => (
                    <li key={toDo.id}>
                        <input
                            type="checkbox"
                            checked={toDo.completed}
                            onChange={()=>toggleToDo(toDo.id)}
                        />
                        <span 
                            style={{textDecoration:toDo.completed?'line-through':'none'}}
                        >
                            {toDo.text}
                        </span>
                    </li>
                ))
            }

        </ul>
        </div>
        <div>
            <input 
                type="text"
                value = {task}
                onChange = {(e) => setTask(e.target.value)}
            />
            <button onClick={addATask}>Add</button>
        </div>
        </>
    )
}
export default ToDo;