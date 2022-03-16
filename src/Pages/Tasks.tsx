import React from "react"

import { useState } from "react"

import TitleBar from "../Components/TitleBar"
import "./Tasks.css"

const Tasks = () => {

    const [ tasks, setTasks ] = useState<{title: string, desc: string}[]>([]);

    const updateTasksList = function (title: string, desc: string) {
            setTasks((prevState)=> [...prevState, {title: title, desc: desc}])
            console.log(tasks)
    }

    return (
        <div>
            <TitleBar title={"Tasks"} />
        </div>
    )
}

export default Tasks;