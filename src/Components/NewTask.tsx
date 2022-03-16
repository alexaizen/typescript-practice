import React, { useRef } from "react";


import "./NewTask.css"



const NewTask: React.FC<{onAddTask: (title: string, desc: string ) => void}> = (props) => {

    const titleInput = useRef<HTMLInputElement>(null);
    const descInput = useRef<HTMLInputElement>(null);

    const formSubmitHandler = function (e: React.FormEvent) {
    e.preventDefault();


    return (
    <form>
        <label>Title</label>
        <input id="title" ref={titleInput} ></input>
        <label>Description</label>
        <input id="description" ref={descInput} ></input>
    </form>
    )
}

export default NewTask;