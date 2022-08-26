import React, { useState, useEffect } from 'react'
import Api from '../../Api'
import Switch from 'rc-switch';
import CreateUserModal from '../../components/CreateUserModal'
import RemoveModal from '../../components/RemoveModal';
import { ReactComponent as Avatar } from '../../assets/avatar.svg'
import { ReactComponent as CharmMenu } from '../../assets/charm_menu.svg'
import { ReactComponent as Eye } from '../../assets/eyeblack.svg'
import { ReactComponent as Remove } from '../../assets/remove.svg'
import { ReactComponent as Delete } from '../../assets/delete.svg'
import { ReactComponent as CloseBlack } from '../../assets/close.svg'
import { ReactComponent as UserAvatar } from '../../assets/userAvatar.svg'
import { ReactComponent as Search } from '../../assets/search.svg'
import { ReactComponent as Img } from '../../assets/img.svg'
import "rc-switch/assets/index.css";

const UserManagement = () => {
    const [createUser, setCreateUser] = useState(false)
    const [search, setSearch] = useState('')
    const [userInfo, setUserInfo] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [users, setUsers] = useState([])
    const [ids, setIds] = useState([])
    const [singleUser, setSingleUser] = useState()
    const [changeStatus, setChangeStatus] = useState()

    const adminId = '1b326af1-85c7-4f85-9f44-b31e30738663'

    const handleChange = async (e) => {
        setSearch(e.target.value)

    }

    const charmClick = (id) => {
        const el = document.getElementsByClassName(`charm_wrapper ${id}`)[0]
        el.style.display = ids === id ? 'none' : 'block'
        ids === id ? setIds(null) : setIds(id)
        if (ids && ids !== id) {
            const el = document.getElementsByClassName(`charm_wrapper ${ids}`)[0]
            el.style.display = 'none'
        }
    }
    const handleView = async (id) => {
        const el = document.getElementsByClassName(`charm_wrapper ${ids}`)[0]
        el.style.display = 'none'
        const singleUser = await Api.getSingleUserInfo(adminId, { userId: id })
        setSingleUser(singleUser.data.singleUser)
        setUserInfo(true)

    }
    const handleRemove = () => {
        const el = document.getElementsByClassName(`charm_wrapper ${ids}`)[0]
        el.style.display = 'none'
        setShowDeleteModal(true)
    }

    const handleStatus = async (id, status) => {
        await Api.updateUserStatus(adminId, { userId: id, status: status ? 0 : 1 })
        setChangeStatus(!changeStatus)
    }

    useEffect(() => {
        const usersInfo = async () => {
            const data = await Api.getAllUsersInfo(adminId, { page: 2, search: '' })
            setUsers(data.data.users)
        }
        usersInfo()
    }, [changeStatus])
 
    return (
        <>
            <div className='btn_wrapper'>
                <button className='btn_create' onClick={() => setCreateUser(true)}>Create User</button>
                <button className='btn_export'>Export CVS</button>
            </div>
            <div>
                <div className='titles_wrapper'>
                    <div className='l_container'>
                        <div className='title_name'>
                            <h3>Name</h3>
                        </div>
                        <div className='title_email'>
                            <h3>E-mail</h3>
                        </div>
                        <div className='title_member'>
                            <h3>Member Since</h3>
                        </div>
                    </div>
                    <div className='r_container'>
                        <div className='title_login'>
                            <h3>Last Log in</h3>
                        </div>
                        <div className='title_ghNumbers'>
                            <h3>Graph Numbers</h3>
                        </div>
                        <div>
                            <h3>Current Status</h3>
                        </div>
                        <div>
                            <h3>Status</h3>
                        </div>
                    </div>
                </div>
                {users.length > 0 && users.map((user, i) => (
                    <div className='user_container' key={i}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <Avatar />
                            <div>{user.userName} {user.userFirstNme}</div>
                        </div>
                        <div>{user.email}</div>
                        <div>chka</div>
                        <div>chka</div>
                        <div>{user.graph_count}</div>
                        <div>chka</div>
                        <div className='check'>
                            <Switch
                                checked={user.status ? true : false}
                                onChange={() => handleStatus(user.userId, user.status)}
                            />
                        </div>
                        <CharmMenu style={{ cursor: 'pointer' }} onClick={() => charmClick(user.userId)} />
                        <div className={`charm_wrapper ${user.userId}`} style={{ display: 'none' }}>
                            <div className='charm_item'
                                onClick={() => handleView(user.userId)}>
                                <Eye />
                                <p>View</p>
                            </div>
                            <div className='charm_item'
                                onClick={handleRemove}
                            >
                                <Remove />
                                <p style={{ color: '#C03112' }}>Remove</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {createUser && <CreateUserModal close={setCreateUser} />}
            {showDeleteModal && <RemoveModal close={setShowDeleteModal} />}
            {userInfo && singleUser && singleUser.length > 0 && (
                singleUser.map((user, i) => (
                    <div className='right_container' key={i}>
                        <CloseBlack className='close' onClick={() => setUserInfo(false)} />
                        <div className='userinfo_wrapper'>
                            <UserAvatar />
                            <div className='userinfo'>
                                <h2>{user.userName} {user.userFirstNme}</h2>
                                <p>{user.email}</p>
                                <div className='checkbox_wrapper'>
                                    <input
                                        type='checkbox'
                                    />
                                    <p>Disable history</p>
                                </div>
                            </div>
                        </div>
                        <div className='info_items'>
                            <div className='info_item'>
                                <h2>Status:</h2>
                                <h2>Location:</h2>
                                <h2>Member Since:</h2>
                                <h2>Last Log in:</h2>
                            </div>
                            <div className='info_item'>
                                <p style={{ color: '#2798FC' }}>Active</p>
                                <p>Yerevan, Armenia</p>
                                <p>01.02.20</p>
                                <p>01.02.20</p>
                            </div>
                        </div>
                        <div className='graph_count'>
                            <h2>Graph Numbers</h2>
                            <p>{user.graph_count}</p>

                        </div>
                        <div style={{ paddingLeft: '16px', paddingBottom: '10px' }}>
                            <div className='input_wrapper' >
                                <input
                                    type='search'
                                    placeholder='Search'
                                    onChange={handleChange}
                                />
                                <Search />
                            </div>
                        </div>
                        <div className='graphs_container'>
                            {singleUser && singleUser?.length > 0 && singleUser[0]?.graphsInfo.map((graph) => (
                                <div className='graph_wrapper'>
                                    <div className='graph_name'>
                                        <img
                                            style={{ width: '32px', height: '32px' }}
                                            src={graph.graphImage}
                                        />
                                        <h2>{graph.graphTitle}</h2>
                                    </div>
                                    <Delete className='delete' />
                                </div>
                            ))}
                        </div>
                        <div className='btn_container'>
                            <button className='btn_remove'>Remove</button>
                            <button className='btn_disable'>Disable</button>
                        </div>
                    </div>
                ))
            )}
        </>
    )
}

export default UserManagement