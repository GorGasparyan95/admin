import React, { useState, useEffect } from 'react'
import Chart from '../../components/Chart'
import Map from '../../components/GoogleMap'
import Api from '../../Api'

const Dashboard = () => {
    const [info, setInfo] = useState()
    const adminId = '1b326af1-85c7-4f85-9f44-b31e30738663'
  
    useEffect( () => {
        const allInfo  = async () => {
            const data = await Api.getAllInfo(adminId)
            setInfo(data.data)
        } 
       allInfo() 
    }, [])
    return (
        <>
            <div className='info_wrap'>
                <div className='item_info' style={{ background: '#00A65A' }}>
                    <p>{info && info?.graphsConut[0].count}</p>
                    <div style={{ textAlign: 'center' }}>
                        <h2>Graphs </h2>
                    </div>
                </div>
                <div className='item_info' style={{ background: '#00C0EF' }}>
                    <p>{info && (info.activeUsers[0].count + info.inactiveUsers[0].count)}</p>
                    <div style={{ textAlign: 'center' }}>
                        <h2>All Users</h2>
                    </div>
                </div>
                <div className='item_info' style={{ background: '#FFC107' }}>
                    <p>chka</p>
                    <div style={{ textAlign: 'center' }}>
                        <h2>Online Users</h2>
                    </div>
                </div>
                <div className='item_info' style={{ background: '#DC3545' }}>
                    <p>{info && info.activeUsers[0].count}</p>
                    <div style={{ textAlign: 'center' }}>
                        <h2>Active Users</h2>
                    </div>
                </div>
                <div className='item_info' style={{ background: '#3E64FF' }}>
                    <p>{info && info.inactiveUsers[0].count}</p>
                    <div style={{ textAlign: 'center' }}>
                        <h2>Inactive Users</h2>
                    </div>
                </div>
            </div>
            <Chart />
            <div className='map_wrap'  >
                <div className="map_container">
                    <div>
                        <h2>Visits by Location</h2>
                        <div className="map_info_wrap">
                            <div className="map_info">
                                <h3>Yerevan, Armenia</h3>
                                <p>20%</p>
                            </div>
                            <div className="map_info">
                                <h3>Yerevan, Armenia</h3>
                                <p>20%</p>
                            </div>
                            <div className="map_info">
                                <h3>Yerevan, Armenia</h3>
                                <p>20%</p>
                            </div>
                            <div className="map_info">
                                <h3>Yerevan, Armenia</h3>
                                <p>20%</p>
                            </div>
                            <div className="map_info">
                                <h3>Yerevan, Armenia</h3>
                                <p>20%</p>
                            </div>
                        </div>
                    </div>
                    <Map />
                </div>

            </div>
        </>
    )
}

export default Dashboard