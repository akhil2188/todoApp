import React, { Fragment, useState } from 'react'

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);

    const updateTodo = async (e) => {
        e.preventDefault();
        try {
            const body =  { description };
           await fetch(`http://localhost:3000/todos/${todo.tid}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json'},
                body: JSON.stringify(body)
            });

            window.location = '/';
        } catch (error) {
            console.error(error.message);
        }
    }
  return (
    <Fragment>
        <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target={`#id${todo.tid}`}>Edit</button>

        <div className="modal fade" id={`id${todo.tid}`} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Edit</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <input 
                        type='text'
                        className='form-control'
                        value={ description }
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-warning" onClick={e => updateTodo(e)}>Edit</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default EditTodo
