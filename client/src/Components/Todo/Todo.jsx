import React, { useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';

const Todo = () => {

    const [task, setTask] = useState();
    const taskHandler = ()=>{
        axios.post('http://localhost:8080/add', {
            task: task
        }).then((result) => {
          window.location.reload();
        })
        .catch((error) => console.log(error))
    }

  return (
    <div className={styles.create_form}>
    <input type="text" placeholder='Enter Task..' onChange={(e) => setTask(e.target.value)} />

    <button type="button" onClick={taskHandler} >Add</button>
    </div>
  )
}

export default Todo;
