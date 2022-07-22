import React from 'react'
import { Link } from "react-router-dom";


const AdminMenu = ({ setMenu }) => {
    const handleClick = (e) => {
        const name = e.target.name
        setMenu({
            [name]: true
     })
    }
    return (
        <div className='admin_menu_wrap'>
            <h2>Admin page</h2>
            <div className='col_3'>
           <button name='dashboard' onClick={handleClick}>Dashboard</button>
           <button name='management' onClick={handleClick} >User management</button>
           <button name='graphDirectory' onClick={handleClick}>Graph Directory</button>
           <button name="analytics" onClick={handleClick}>Graph analytics</button>
            </div>
        </div>
    )
}

export default AdminMenu