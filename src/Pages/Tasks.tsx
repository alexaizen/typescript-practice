import React from "react"

import { useState } from "react"
import NewTask from "../Components/NewTask"

import TitleBar from "../Components/TitleBar"
import "./Tasks.css"

const Tasks = () => {

    const [ tasks, setTasks ] = useState<{title: string, desc: string}[]>([]);

    const updateTasksList = (title: string, desc: string) => {
            setTasks((prevState)=> [...prevState, {title: title, desc: desc}])
            console.log(tasks)
    }

    return (
        <div>
            
            <TitleBar title={"Tasks"}/>
            <NewTask onAddTask={updateTasksList} ></NewTask>
            <ul>{tasks.map(task => <li>{task.title} {task.desc}</li>)}</ul>
            
        </div>
    )
}

export default Tasks;