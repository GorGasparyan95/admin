import React, { useState } from 'react'
import { ReactComponent as Avatar } from '../assets/admin-avatar.svg'
import { ReactComponent as Search } from '../assets/search.svg'

const Header = () => {
    const [search, setSearch] = useState('')
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    return (
        <div className='row_3'>
            <div className='input_wrapper'>
                <input
                    type='search'
                    placeholder='Search'
                    onChange={handleChange}
                />
                <Search />
            </div>
            <Avatar />
            <p>Admin</p>
        </div>
    )
}


export default Header
