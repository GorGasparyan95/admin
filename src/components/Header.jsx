import React, { useState } from 'react'
import ReactSelect from 'react-select';
import { ReactComponent as Avatar } from '../assets/admin-avatar.svg'
import { ReactComponent as Search } from '../assets/search.svg'
import { ReactComponent as User } from '../assets/user.svg'
import { ReactComponent as Settings } from '../assets/settings.svg'
import { ReactComponent as SignOut } from '../assets/sign-out.svg'
import SettingsModal from './SettingsModal'
import { colourStyles, colourStylesStatus } from '../assets/styles/SelectStyles';


const Header = ({ management, dashboard }) => {
    const [search, setSearch] = useState('')
    const [showAdminPanel, setShowAdminPanel] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const users = [
        { label: 'Name Surname' },
        { label: 'Name Surname' },
        { label: 'Name Surname' },
    ];
    const status = [
        { label: 'Active' },
        { label: 'Disable' },
    ];

    return (
        <>


            <div className='row_3' style={dashboard ? { justifyContent: 'flex-end' } : {}}>
                {management && <div className='select_wrapper'>
                    <ReactSelect
                        styles={colourStyles}
                        options={users}
                        placeholder="Select User"

                    />
                    <ReactSelect
                        styles={colourStylesStatus}
                        options={status}
                        placeholder="Status"
                    />
                    <ReactSelect
                        styles={colourStyles}
                        // options={options}
                        placeholder="Member Science"
                    />
                </div>}
                <div style={{ gap: '20px', display: 'flex' }}>
                    <div className='input_wrapper'>
                        <input
                            type='search'
                            placeholder='Search'
                            onChange={handleChange}
                        />
                        <Search />
                    </div>
                    <div className='row_2' onClick={() => setShowAdminPanel(!showAdminPanel)}>
                        <Avatar />
                        <p>Admin</p>
                    </div>
                </div>

            </div>
            {search && <div className='search_wrapper'>
                <p style={{ marginBottom: '15px' }}>Search result: 200</p>
                <div className='item_wrapper'>
                    <User />
                    <p>Name Surname</p>
                </div>
                <div className='item_wrapper'>
                    <User />
                    <p>Name Surname</p>
                </div>
                <div className='item_wrapper'>
                    <User />
                    <p>Name Surname</p>
                </div>
                <div className='item_wrapper'>
                    <User />
                    <p>Name Surname</p>
                </div>
            </div>
            }
            {showAdminPanel && <div className='items_wrapper'>
                <div className='row_2' onClick={() => setShowSettings(true)}>
                    <Settings />
                    <p>Settings</p>
                </div>
                <div className='row_2'>
                    <SignOut />
                    <p>Sign Out</p>
                </div>
            </div>}
            {showSettings && <SettingsModal close={setShowSettings} />}

        </>
    )
}


export default Header;
