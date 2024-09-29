import { useEffect, useState } from "react";
import Todo from "../Todo/Todo";
import styles from "./style.module.css";
import axios from "axios";
import { BsFillCheckCircleFill, BsCircleFill,  } from 'react-icons/bs';
import { BsFillTrashFill } from "react-icons/bs";



const Main = () => {

	const [todos, setTodos] = useState([]);

	useEffect(()=>{
		axios.get('http://localhost:8080/get')
		.then(result=> setTodos(result.data))
		.catch(error=>console.log(error))
	},[])
// Task Edit handler
	const editHandler = (id) =>{
		axios.put('http://localhost:8080/update/'+id)
		.then(result=> {
			window.location.reload();
		})
		.catch(error=>console.log(error))
	};
// task Delet handler
	const handleDelete = (id) =>{
		axios.delete('http://localhost:8080/delete/'+id)
		.then(result=> {
			window.location.reload();
		})
		.catch(error=>console.log(error))
	};

	// logout handler
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>TO-DO</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className={styles.todo_container}>
				<h2>
					To-Do List
				</h2>
				<Todo />
				{
					todos.length === 0
					?
					<div><h2>No Todo's Here!</h2></div>
					:
					todos.map(todo =>{
						return <div key={todo._id} className={styles.task}>
						<div className={styles.checkbox} onClick={()=> editHandler(todo._id)}>
							{todo.done ?
							<BsFillCheckCircleFill className={styles.icon}></BsFillCheckCircleFill>
							:
							<BsCircleFill className={styles.icon} />
							}
							<p className={todo.done ? styles.line_through : ""}>{todo.task}</p>

						</div>
						<div>
							<span><BsFillTrashFill onClick={() => handleDelete(todo._id)} /></span>
						</div>
						</div>
					
						
					})
				}
			</div>
		</div>
	);
};

export default Main;