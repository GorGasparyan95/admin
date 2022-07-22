import React, { useState } from 'react'
import CreateUserModal from '../../components/CreateUserModal'
import { ReactComponent as Avatar } from '../../assets/avatar.svg'
import { ReactComponent as CharmMenu } from '../../assets/charm_menu.svg'



const UserManagement = () => {
    const [createUser, setCreateUser] = useState(false)
    return (
        <>
            <div className='btn_wrapper'>
                <button className='btn_create' onClick={() => setCreateUser(true)}>Create User</button>
                <button className='btn_export'>Export CVS</button>
            </div>
            <div>
                <div className='titles_wrapper'>
                    <div style={{ display: 'flex', gap: '95px' }}>
                        <h3 style={{ paddingLeft: '50px' }}>Name</h3>
                        <h3  style={{ paddingLeft: '37px' }}>User Name</h3>
                        <h3>E-mail</h3>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <h3>Member Since</h3>
                        <h3>Last Log in</h3>
                        <h3>Status</h3>
                        <h3>Graph Numbers</h3>
                    </div>
                </div>
                <div className='user_container'>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <Avatar />
                        <div>Name Surname</div>
                    </div>
                    <div>Name Surname</div>
                    <div>Namesurname@mail.com</div>
                    <div>01.02.20</div>
                    <div>01.02.20</div>
                    <div>Active</div>
                    <div>50/100</div>
                    <CharmMenu style={{ cursor: 'pointer' }} />
                </div>

            </div>
            {createUser && <CreateUserModal close={setCreateUser} />}
        </>
    )
}

export default UserManagement