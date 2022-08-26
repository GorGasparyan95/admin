import React, { useState } from 'react'
import { ReactComponent as Admin } from '../../assets/admin.svg'
import { ReactComponent as Eye } from '../../assets/eye.svg'
import {  useNavigate  } from 'react-router-dom'


const SignIn = () => {
    const [values, setValues] = useState({
        email: '',
        pwd: ''
    })
    const [errors, setErrors] = useState({
        pwd: false,
        email: false,
    })
    const [showPwd, setShowPwd] = useState(false)

    const emailValidation = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{2,9}[\.][a-z]{2,5}/g;
    const navigate =   useNavigate ()

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        const { pwd } = values
        if (!pwd) {
            setShowPwd(false)
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
    

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const { email, pwd } = values
        setErrors({
            pwd: pwd ? false : true,
            email: !email ? true : emailValidation.test(email) ? false : true
        })
    }
    const handlePwdShow = () => {
        setShowPwd(!showPwd)
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
                        {errors.email && <span>*Enter valid Email</span>}
                        <input
                            placeholder='Password'
                            type={showPwd ? 'text' : 'password'}
                            required
                            name="pwd"
                            onChange={handleChange}
                            autoComplete="on"
                        />
                        {values.pwd && <Eye onClick={handlePwdShow} />}
                    </div>
                    {errors.pwd && <span>*Enter valid Password</span>}
                    <p onClick={() => navigate('./reset')}>Forgot password ?</p>
                    <button className='main_btn' type="submit">Sign In</button>
                </div>
            </form>
        </div>
    )
}

export default SignIn