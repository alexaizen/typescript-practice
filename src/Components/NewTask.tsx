import React, { useRef } from "react";


import "./NewTask.css"



const NewTask: React.FC<{onAddTask: ( title: string, desc: string ) => void}> = (props) => {

    const titleInput = useRef<HTMLInputElement>(null);
    const descInput = useRef<HTMLInputElement>(null);

    

    const formSubmitHandler = function (e: React.FormEvent) {
    e.preventDefault();
    const titleInputValue: string = titleInput.current!.value
    const descInputValue: string = descInput.current!.value
    props.onAddTask(titleInputValue, descInputValue)
}

    return (
    <form onSubmit={formSubmitHandler} >
        <label>Title</label>
        <input id="title" ref={titleInput} ></input>
        <label>Description</label>
        <input id="description" ref={descInput} ></input>
        <button type="submit">Create Task</button>
    </form>
    )

}

export default NewTask;