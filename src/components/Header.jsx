import React, { useState } from 'react'
import ReactSelect from 'react-select';
import Api from '../Api';
import { ReactComponent as Avatar } from '../assets/admin-avatar.svg'
import { ReactComponent as Search } from '../assets/search.svg'
import { ReactComponent as User } from '../assets/user.svg'
import { ReactComponent as Settings } from '../assets/settings.svg'
import { ReactComponent as SignOut } from '../assets/sign-out.svg'
import SettingsModal from './SettingsModal'
import { colourStyles, colourStylesStatus } from '../assets/styles/SelectStyles';
import { useEffect } from 'react';


const Header = ({ management, dashboard, graphDirectory, setNumbersResults, numbersSearch, setNumberSearch}) => {
    const [searchUsers, setSearchUsers] = useState('')
    const [showAdminPanel, setShowAdminPanel] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [number, setNumber] = useState('')
    const [created, setCreated] = useState('')
    const [searchGraphs, setSearchGraphs] = useState('')
    const [search, setSearch] = useState({
        user: '',
        graph: ''
    })


    const adminId = '1b326af1-85c7-4f85-9f44-b31e30738663'

    const handleNumberSearch = (e) => {
      const name =  e.target.name;
      const value = e.target.value;
      setNumberSearch({
        ...numbersSearch,
        [name]: value
      })
    }



    const handleSearch = async (management, graphDirectory) => {
        const { user, graph } = search
        if (management) {
            if (user) {
                const results = await Api.getAllUsersInfo(adminId, { page: 1, search: user })
                setSearchUsers(results.data.users)
            }
            if (!user) {
                setSearchUsers(null)
            }
        }
        if (graphDirectory) {

            if (graph) {
                const results = await Api.getAllGraphsInfo(adminId, { search: graph, page: 1, nodeFrom: 0, nodeTo: 50000, linkFrom: 0, linkTo: 50000 })
                setSearchGraphs(results.data.graphs)
            }
            if (!graph) {
                setSearchGraphs(null)
            }

        }
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

    useEffect(() => {
        setSearchUsers([])
        setSearch('')
    }, [management])

    useEffect(() => {
        setSearchGraphs([])
        setSearch('')
    }, [graphDirectory])

    useEffect(() => {
        handleSearch(management, graphDirectory)
    }, [search])

   useEffect(() => {
    const { fromLink, toLink, fromNode, toNode } = numbersSearch
    const payload = async () => {
        const  results = await Api.getAllGraphsInfo(adminId, { search: '', page: 1, nodeFrom: fromNode || 0, nodeTo: toNode|| 50000, linkFrom: fromLink || 0 , linkTo: toLink || 50000 })
        setNumbersResults(results.data.graphs)
    }
    if(fromLink || toLink ||fromNode || toNode ) {
        payload()
    }
    
   }, [numbersSearch])

    return (
        <>
            <div className='row_3' style={dashboard ? { justifyContent: 'flex-end' } : {}}>
                <div style={graphDirectory ? { gap: '20px', display: 'flex', marginTop: '25px' } : { gap: '20px', display: 'flex' }}>
                    {!dashboard && (management || graphDirectory) && <div className='input_wrapper'>
                        <input
                            value={management ? search.user : search.graph || ''}
                            placeholder='Search'
                            onChange={(e) => {
                                setSearch({
                                    user: management ? e.target.value : '',
                                    graph: graphDirectory ? e.target.value : ''
                                })

                            }}
                        />
                        <Search />
                    </div>}
                </div>
                {(management || graphDirectory) && <div className='select_wrapper'>
                    {management &&
                        <div className='flex' style={{ gap: '150px' }}>
                            <div className='flex' style={{ gap: '30px' }}>
                                <ReactSelect
                                    styles={colourStyles}
                                    options={users}
                                    placeholder="Current Status"

                                />
                                <ReactSelect
                                    styles={colourStylesStatus}
                                    options={status}
                                    placeholder="Status"
                                />
                                <button>Reset</button>
                            </div>
                            <div className='row_2' onClick={() => setShowAdminPanel(!showAdminPanel)}>
                                <Avatar />
                                <p>Admin</p>
                            </div>
                        </div>
                    }
                    {graphDirectory &&
                        <div className='flex' style={{ gap: '110px' }}>
                            <div className='flex' style={{ gap: '30px' }}>
                                <div className='input_container'>
                                    <h2>links number</h2>
                                    <div className='from'>
                                        from <input className='number_inp' name="fromLink" onChange={handleNumberSearch}/>
                                        to   <input className='number_inp' name="toLink" onChange={handleNumberSearch} />
                                    </div>
                                </div>
                                <div className='input_container'>
                                    <h2>Nodes number</h2>
                                    <div className='from'>
                                        from <input className='number_inp'  name="fromNode" onChange={handleNumberSearch} />
                                        to   <input className='number_inp'  name="toNode" onChange={handleNumberSearch}  />
                                    </div>
                                </div>
                                <button style={{ marginTop: '25px' }}>Reset</button>
                            </div>
                            <div
                                className='row_2'
                                style={{ marginTop: '25px' }}
                                onClick={() => setShowAdminPanel(!showAdminPanel)}
                            >
                                <Avatar />
                                <p>Admin</p>
                            </div>
                        </div>
                    }
                </div>}
            </div>
            {
                ((searchUsers && searchUsers.length > 0 && management) || (searchGraphs && searchGraphs.length > 0 && graphDirectory)) &&
                (<div className='search_wrapper'>
                    <p style={{ marginBottom: '15px' }}>Search result: {searchUsers.length ? searchUsers.length : searchGraphs.length}</p>
                    {searchUsers.length > 0 ? searchUsers.map((user, i) => (
                        <div className='item_wrapper' key={i}>
                            <User />
                            <p>{user.userName} {user.userFirstNme}</p>
                        </div>
                    )) : searchGraphs.map((graph, i) => (
                        <div className='item_wrapper' key={i}>
                            <User />
                            <p>{graph.graphTitle}</p>
                        </div>
                    ))}
                </div>
                )
            }
            {
                showAdminPanel && <div className='items_wrapper'>
                    <div className='row_2' onClick={() => setShowSettings(true)}>
                        <Settings />
                        <p>Settings</p>
                    </div>
                    <div className='row_2'>
                        <SignOut />
                        <p>Sign Out</p>
                    </div>
                </div>
            }
            {showSettings && <SettingsModal close={setShowSettings} />}

        </>
    )
}


export default Header;
