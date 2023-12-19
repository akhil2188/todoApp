import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

const InputTodo = () => {
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!description.trim()) {
            setShowToast(true);
            setErrorMessage('Please enter a todo before submitting.');
            setTimeout(() => {
                setShowToast(false);
            }, 7000);
            return;
        }

        try {
            const body = { description };
            await fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(body)
            })
            window.location = '/';
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className='container mt-5'  style={{ maxWidth: '800px' }}>
            {errorMessage && (
                <Toast
                    bg='warning'
                    animation={true}
                    show={showToast}
                    className="position-fixed top-0 end-0 m-3 fade"
                    onClose={() => setShowToast(false)}
                >
                    <Toast.Body className='alert-danger d-flex justify-content-between gap-3' >
                        {errorMessage}
                        <button type="button" class="btn-close" data-bs-dismiss="toast" onClick={e => setShowToast(false)}></button>
                    </Toast.Body>
                </Toast>
            )}
            <form className='row justify-content-center' onSubmit={onSubmit}>
                <div className="col-sm-10">
                    <div className="form-floating">
                        <input
                            type='text'
                            id='floatingInput'
                            className='form-control'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Enter Todo</label>
                    </div>
                </div>
                <div className='col-md-1'>
                    <button type='submit' className='btn btn-lg btn-primary mx-auto'>
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default InputTodo
