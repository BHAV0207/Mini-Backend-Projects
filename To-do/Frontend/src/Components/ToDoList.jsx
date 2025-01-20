import React, { useState } from 'react'

function ToDoList() {
  let [list , setList] = useState([]);
  let[task , setTask] = useState();

  // console.log(task);

  const handleChange = (e) => {
    setTask(() => e.target.value)
  }

  const handleSubmit =() => {

  }

  return (
    <div>
      <div>
        <input type="text" value={task} placeholder='add your task' onChange={handleChange}/>
        <button onChange={handleSubmit}>Add</button>
      </div>
    </div>
  )
}

export default ToDoList