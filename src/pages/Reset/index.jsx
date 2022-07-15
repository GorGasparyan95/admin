import React, { useState } from 'react'
import { ReactComponent as Admin } from '../../assets/admin.svg'
import { useNavigate } from 'react-router-dom'


const Reset = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState()

    const handleChange = (e) => {
        setEmail(e.target.value)
        setError(false)
    }

    const emailValidation = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{2,9}[\.][a-z]{2,5}/g;
    const navigate = useNavigate()

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if(email && emailValidation.test(email)) {
            navigate('/new-password')
        }
        if (!email || !emailValidation.test(email)) {
            setError(true)
        }
    }
    return (
        <div className='wrapper'>
            <div className='row'>
                <Admin className='admin_svg' />
                <h2>Admin page</h2>
            </div>
            <form noValidate onSubmit={handleSubmit} >
                <div className='col_2'>
                    <div className='input_wrap'>
                        <input
                            placeholder='E-mail address'
                            type='email'
                            required
                            name="email"
                            onChange={handleChange}
                            autoComplete="on"
                        />
                        {error && <span>*Enter valid Email</span>}
                    </div>
                    <button className='main_btn' type="submit">Reset</button>
                </div>
            </form>
        </div>
    )
}

export default Reset