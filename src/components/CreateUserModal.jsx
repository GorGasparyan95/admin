import React, { useState, useEffect } from "react";
import Api from "../Api";
import Modal from 'react-modal'
import { ReactComponent as Close } from '../assets/close.svg'
import { ReactComponent as Eye } from '../assets/eye.svg'


const CreateUserModal = ({ close }) => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
    })
    const [length, setLength] = useState(12);
    const [showPwd, setShowPwd] = useState(false)
    const [createUser, setCreateUser] = useState(false)

    const string = "abcdefghijklmnopqrstuvwxyz";
    const numeric = "0123456789";

    const adminId = '1b326af1-85c7-4f85-9f44-b31e30738663'

    const emailValidation = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{2,9}[\.][a-z]{2,5}/g;

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value
        if(name === 'firstName' || name === 'lastName') {
             value = e.target.value.replace(/[^A-Za-z]/ig, '')
        }
        setValues({
            ...values,
            [name]: value
        })
        setErrors({
            ...errors,
            [name]: false
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { firstName, lastName, email } = values
        setErrors({
            firstName: firstName ? false : true,
            lastName: lastName ? false : true,
            email: !email ? true : email.match(emailValidation) ? false : true
        })
        if ((!errors.firstName && !errors.lastName && !errors.email) && (firstName && lastName && email.match(emailValidation))) {
            await Api.createUserFromAdminPage(adminId, values)
            close(false)
         }
    }

    const handleGenerate = (e) => {
        e.preventDefault();
        const formValid = +length > 0;
        if (!formValid) {
            return;
        }
        let character = "";
        let password = "";
        while (password.length < length) {
            const entity1 = Math.ceil(string.length * Math.random() * Math.random());
            const entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
            let hold = string.charAt(entity1)
            hold = password.length % 3 === 0 ? hold.toUpperCase() : hold;
            character += hold;
            character += numeric.charAt(entity2);
            password = character;
        }
        password = password
            .split("")
            .join("");
        setValues({
            ...values,
            password: password.substr(0, length)
        });
    };

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
            <div className='row' style={errors.email || errors.lastName || errors.firstName ? { paddingTop: '15px', marginBottom: '0' } : { paddingTop: '15px' }}>
                <h2 style={{ fontWeight: 400 }}>Add User</h2>
                <Close className="close_svg" onClick={() => close(false)} />
            </div>
            <form noValidate onSubmit={handleSubmit}>
                <div className="content_wrapper">
                    <div className="row-2">
                        <div className="error_wrapper">
                            <input
                                value={values.firstName.replace(/[^A-Za-z]/ig, '') || ''}
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
                                value={values.lastName.replace(/[^A-Za-z]/ig, '') || ''}
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
                    <div style={{ display: 'flex', gap: '55px', position: 'relative' }}>
                        <input
                            required
                            type={showPwd ? 'text' : 'password'}
                            style={{ width: '310px' }}
                            placeholder="Password"
                            name="password"
                            className="input_main"
                            defaultValue={values.password || ''}
                            readOnly
                        />
                        <button className='main_btn' onClick={handleGenerate}>Generate</button>
                        <Eye
                            onClick={() => setShowPwd(!showPwd)}
                            style={{ position: 'absolute', right: '160px', bottom: '8px', cursor: 'pointer' }}
                        />
                    </div>
                    <button className='main_btn' type="submit">Add</button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateUserModal