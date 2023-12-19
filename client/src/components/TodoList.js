import React, { Fragment, useEffect, useState } from 'react'
import EditTodo from './EditTodo';

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);

    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:3000/todos/${id}`, {
                method: 'DELETE'
            });
            setTodoList(todoList.filter(todo => todo.tid !== id))
        } catch (error) {
            console.error(error.message);
        }
    }

    const getTodoList = async () => {
        try {
            const response = await fetch('http://localhost:3000/todos');
            const data = await response.json();
            setTodoList(data);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getTodoList();
    },[]);

    console.log(todoList);
  return (
    <Fragment>
        {" "}
        <div className='container-fluid mt-5'>
            <div className='table-responsive'>
                <table className="table table-striped table-hover mx-auto" style={{ width: '900px' }}>
                    <thead>
                        <tr>
                            <th scope="col">Description</th>
                            <th scope="col" className="text-center">Edit</th>
                            <th scope="col" className="text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoList.map((todo) => {
                            return <tr key={todo.tid}>
                                <td>{todo.description}</td>
                                <td className="text-center">
                                    <EditTodo todo={todo} />
                                </td>
                                <td className="text-center">
                                <button type='submit' className='btn btn-danger' onClick={() => deleteTodo(todo.tid)}>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </Fragment>
  )
}

export default TodoList
