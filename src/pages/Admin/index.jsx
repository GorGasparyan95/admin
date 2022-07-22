import React, { useState } from 'react'
import Dashboard from './Dashboard'
import Header from '../../components/Header'
import AdminMenu from '../../components/AdminMenu'
import UserManagement from './UserManagement'


const Admin = () => {
    const [menu, setMenu] = useState({
        dashboard: true,
        management: false,
        graphDirectory: false,
        analytics: false
    })
    return (
        <>
            <div className='flex'>
                <AdminMenu setMenu={setMenu} />
                <div className='container'>
                    <Header management={menu.management} dashboard={menu.dashboard}/>
                    {menu.dashboard && <Dashboard />}
                    {menu.management && <UserManagement />}
                </div>
            </div>
        </>
    )
}

export default Admin