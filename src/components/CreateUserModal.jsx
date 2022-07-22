import React, { useState } from "react";
import { ReactComponent as Close } from '../assets/close.svg'
import Modal from 'react-modal'


const CreateUserModal = ({ close }) => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
    })
    const emailValidation = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{2,9}[\.][a-z]{2,5}/g;

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setValues({
            ...values,
            [name]: value
        })
        setErrors({
            ...errors,
            [name]: false
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { firstName, lastName, email } = values
        setErrors({
            firstName: firstName ? false : true,
            lastName: lastName ? false : true,
            email: !email ? true : emailValidation.test(email) ? false : true
        })

    }

    return (
        <Modal
            className='ghCreateUserModal'
            isOpen
            // onRequestClose={close}
            ariaHideApp={false}
            style={{
                overlay: {
                    zIndex: 10,
                },
                content: {
                    border: 'none',
                    outline: 'none'
                }
            }}
        >
            <div className='row' style={errors.email|| errors.lastName || errors.firstName? { paddingTop: '15px', marginBottom: '0' }:  { paddingTop: '15px' } }>
                <h2 style={{ fontWeight: 400 }}>Add User</h2>
                <Close className="close_svg" onClick={() => close(false)} />
            </div>
            <form noValidate onSubmit={handleSubmit}>
                <div className="content_wrapper">
                    <div className="row-2">
                        <div className="error_wrapper">
                            <input
                                required
                                placeholder="First Name"
                                className="input_main"
                                name="firstName"
                                onChange={handleChange}
                            />
                            {errors.firstName && <span>*FirstName is required</span>}
                        </div>
                        <div className="error_wrapper">
                            <input
                                required
                                placeholder="Last Name"
                                className="input_main"
                                name="lastName"
                                onChange={handleChange}
                            />
                            {errors.lastName && <span>*LastName is required</span>}
                        </div>
                    </div>
                    <div >
                        <input
                            required
                            type="email"
                            style={{ width: '460px' }}
                            placeholder="Email"
                            name="email"
                            className="input_main"
                            onChange={handleChange}
                        />
                        {errors.email && <span style={{ paddingTop: '5px' }}>*Enter valid Email</span>}
                    </div>
                    <button className='main_btn' type="submit">Add</button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateUserModal