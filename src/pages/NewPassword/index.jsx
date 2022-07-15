import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Admin } from '../../assets/admin.svg'
import { ReactComponent as Eye } from '../../assets/eye.svg'


const NewPassword = () => {
    const [values, setValues] = useState(
        {
            newPwd: '',
            confirm: ''
        }
    )
    const [showNewPwd, setShowNewPwd] = useState(false)
    const [showConfirmPwd, setShowConfirmPwd] = useState(false)
    const [errors, setErrors] = useState({
        newPwd: false,
        confirm: false
    })
    
    const navigate = useNavigate()
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const { newPwd, confirm } = values;
        setValues({
            ...values,
            [name]: value
        })
        if (!newPwd) {
            setShowNewPwd(false);
        }
        if (!confirm) {
            setShowConfirmPwd(false)
        }
        setErrors({
            ...errors,
            [name]: false
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { newPwd, confirm } = values;
        setErrors({
            newPwd: newPwd ? false : true,
            confirm: confirm && newPwd === confirm ? false : true
        })
        if(newPwd && confirm && newPwd === confirm ) {
            navigate('/')
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
                            placeholder='New Password'
                            type={showNewPwd ? 'text' : 'password'}
                            required
                            name="newPwd"
                            onChange={handleChange}
                            autoComplete="on"
                        />
                        {values.newPwd && <Eye className='svg_eye' onClick={() => setShowNewPwd(!showNewPwd)} />}
                        {errors.newPwd && <span>*Enter valid Password</span>}
                        <input
                            placeholder='Confirm Password'
                            type={showConfirmPwd ? 'text' : 'password'}
                            required
                            name="confirm"
                            onChange={handleChange}
                            autoComplete="on"
                        />
                        {values.confirm && <Eye onClick={() => setShowConfirmPwd(!showConfirmPwd)} style={errors.confirm ? { bottom: 47 } : {}} />}
                        {errors.confirm && <span>*Enter valid Password</span>}
                    </div>
                    <button className='main_btn' type="submit">Sign In</button>
                </div>
            </form>
        </div>
    )
}

export default NewPassword