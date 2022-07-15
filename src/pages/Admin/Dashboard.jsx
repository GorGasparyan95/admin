import React from 'react'
import Header from '../../components/Header'
import AdminMenu from '../../components/AdminMenu'
import Chart from '../../components/Chart'

const Dashboard = () => {
    return (

        <div className='flex'>
            <AdminMenu />
            <div className='container'>
                <Header />
                <div className='info_wrap'>
                    <div className='item_info'>
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ color: '#F77A07' }}>Total Numbers </h2>
                            <h2 style={{ color: '#F77A07' }}>of Graphs </h2>
                        </div>
                        <p style={{ color: '#F77A07' }}>150000</p>
                    </div>
                    <div className='item_info'>
                        <h2 style={{ color: '#B4D755' }}>Total Users</h2>
                        <p style={{ color: '#B4D755' }}>15200</p>
                    </div>
                    <div className='item_info'>
                        <h2 style={{ color: '#29378F' }}>New Users</h2>
                        <p style={{ color: '#29378F' }}>500</p>
                    </div>
                </div>
                <Chart />
            </div>
        </div>
    )
}

export default Dashboard