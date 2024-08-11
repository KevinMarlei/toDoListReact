import React from "react";

function TodoItems(props){
    return(
        <li key={props.key}>{props.event} 
        <button onClick={props.onEdit}>
            <span>Editar</span>
        </button>
        <button onClick={props.onClick}>
            <span>Remove</span>
        </button>
        </li>
    )
}

export default TodoItems;