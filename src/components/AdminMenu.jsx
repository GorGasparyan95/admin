import React from 'react'
import { Link } from "react-router-dom";


const AdminMenu = () => {
    return (
        <div className='admin_menu_wrap'>
            <h2>Admin page</h2>
            <div className='col_3'>
           <Link to='/'>Dashboard</Link>
           <Link to='/'>User management</Link>
           <Link to='/'>Graph Directory</Link>
            </div>
        </div>
    )
}

export default AdminMenu