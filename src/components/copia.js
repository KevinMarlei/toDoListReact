import React, { useState } from "react";
import TodoItems from "./TodoItem";
function App() {

  const [inputText, setInputTex] = useState('');
  const [element, setElement] = useState(() => {
    const savedTasks = localStorage.getItem('tarefa');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  function inputChange(event) {
    const inputValue = event.target.value;
    setInputTex(inputValue);

  }

  function addElement() {
    if (inputText === '') {
      return alert('Impossível adicionar tarefa com o campo vazio!')
    }
    setElement((event) => {
      const updateElements = [...event, inputText]
      localStorage.setItem('tarefa', JSON.stringify(updateElements));
      return updateElements;
    });
    setInputTex('');
  }

  function removeElement(index) {
    setElement((event) => {
      const removeElement = event.filter((item, i) => i !== index);
      localStorage.setItem('tarefa', JSON.stringif(removeElement));
      return removeElement;
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={inputChange} value={inputText} />
        <button onClick={addElement}>
          <span>Adicionar</span>
        </button>

      </div>
      <div>
        <ul>
          {
            element.map((event, index) => <TodoItems key={index} event={event} onClick={() => removeElement(index)} />)
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
