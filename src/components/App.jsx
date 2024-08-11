import React, { useState } from "react";
import TodoItems from "./TodoItem";
function App() {

  const [inputText, setInputText] = useState('');
  const [element, setElement] = useState(() => {
    const savedTasks = localStorage.getItem('tarefa');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  function inputChange(event) {
    const inputValue = event.target.value;
    setInputText(inputValue);

  }

  function addElement() {
    if (inputText === '') {
      return alert('Impossível adicionar tarefa com o campo vazio!')
    }
    if(isEditing){
      const updateTasks = [...element];
      updateTasks[editIndex] = inputText;
      setElement(updateTasks);
      localStorage.setItem('tarefa', JSON.stringify(updateTasks));
      setIsEditing(false);
      setEditIndex(null);
    }else{

      setElement((event) => {
        const updateElements = [...event, inputText]
        localStorage.setItem('tarefa', JSON.stringify(updateElements));
        return updateElements;
      });
      setInputText('');
    }
  }

  function editElement(index){
    setInputText(element[index]);
    setEditIndex(index);
    setIsEditing(true);
  }

  function removeElement(index) {
    setElement((event) => {
      const removeElement = event.filter((item, i) => i !== index);
      localStorage.setItem('tarefa', JSON.stringify(removeElement));
      return removeElement;
    });

    if(isEditing){
      setIsEditing(false);
      setEditIndex(null);
      setInputText('')
    }
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={inputChange} value={inputText} />
        <button onClick={addElement}>
          <span>{isEditing ? 'Atualizar' : 'Adicionar'}</span>
        </button>

      </div>
      <div>
        <ul>
          {
            element.map((event, index) => <TodoItems key={index} event={event} onClick={() => removeElement(index)} onEdit={() => editElement(index)}/>)
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
