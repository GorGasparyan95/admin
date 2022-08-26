import React, { useState } from 'react'
import Dashboard from './Dashboard'
import Header from '../../components/Header'
import AdminMenu from '../../components/AdminMenu'
import UserManagement from './UserManagement'
import GraphDirectory from './GraphDirectory'




const Admin = () => {
    const [menu, setMenu] = useState({
        dashboard: true,
        management: false,
        graphDirectory: false,
    })
    const [numbersResults, setNumbersResults] = useState()
    const [numbersSearch, setNumberSearch] = useState({
        fromLink: '',
        toLink: '',
        fromNode: '',
        toNode: ''
       })


    return (
        <>
            <div className='flex'>
                <AdminMenu setMenu={setMenu} />
                <div className='container'>
                    <Header
                        management={menu.management}
                        dashboard={menu.dashboard}
                        graphDirectory={menu.graphDirectory}
                        setNumbersResults={setNumbersResults}
                        numbersSearch={numbersSearch}
                        setNumberSearch={setNumberSearch}
                    />
                    {menu.dashboard && <Dashboard />}
                    {menu.management && <UserManagement />}
                    {menu.graphDirectory && <GraphDirectory numbersResults={numbersResults} numbersSearch={numbersSearch} />}
                </div>
            </div>
        </>
    )
}

export default Admin