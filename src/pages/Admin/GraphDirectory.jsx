import React, { useState, useEffect } from 'react'
import RemoveModal from '../../components/RemoveModal';
import Api from '../../Api';
import { ReactComponent as CharmMenu } from '../../assets/charm_menu.svg'
import { ReactComponent as Avatar } from '../../assets/avatar.svg'
import { ReactComponent as Eye } from '../../assets/eyeblack.svg'
import { ReactComponent as Remove } from '../../assets/remove.svg'
import { ReactComponent as CloseBlack } from '../../assets/close.svg'
import { ReactComponent as UserAvatar } from '../../assets/userAvatar.svg'
import { ReactComponent as Attach } from '../../assets/attach.svg'



const GraphDirectory = ({ numbersResults, numbersSearch }) => {
    const [showGraph, setShowGraph] = useState(false)
    const [showDeleteGraph, setShowDeleteGraph] = useState(false)
    const [graphs, setGraphs] = useState([])
    const [ids, setIds] = useState()
    const [graphInfo, setGraphInfo] = useState()


    const adminId = '1b326af1-85c7-4f85-9f44-b31e30738663'

    const payload = async () => {
        const graphs = await Api.getAllGraphsInfo(adminId, { search: '', page: 17
        , nodeFrom: 0, nodeTo: 50000, linkFrom: 0, linkTo: 50000 })
        setGraphs(graphs.data.graphs)
    }

    const handleView = async (id) => {
        const el = document.getElementsByClassName(`charm_wrapper ${ids}`)[0]
        el.style.display = 'none'
        const singleGraph = await Api.getSingleGraphInfo(adminId, { graphId: id })
        setGraphInfo(singleGraph.data.graphs)
        setShowGraph(true)
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

    useEffect(() => {
        payload()
    }, [])

    useEffect(() => {
        const { fromLink, toLink, fromNode, toNode } = numbersSearch
        if (numbersResults && numbersResults.length) {
            setGraphs(numbersResults)
        }
        if (!fromLink && !toLink && !fromNode && !toNode) {
            payload()
        }
    }, [numbersResults, numbersSearch])

    return (
        <>
            {showDeleteGraph && <RemoveModal graph={true} closeDeleteGraph={setShowDeleteGraph} />}
            <div style={{ paddingTop: 30 }}>
                <div className='titles_wrapper' style={{ gap: '3%', paddingBottom: '10px' }} >
                    <div className='l_container' style={{ gap: '0px', alignItems: 'center' }}>
                        <div style={{ paddingLeft: '9%' }} >
                            <h3>Name</h3>
                        </div>
                        <div style={{ paddingLeft: '36%' }} >
                            <h3>Nodes number</h3>
                        </div>
                        <div style={{ paddingLeft: '10%' }} >
                            <h3>Links number</h3>
                        </div>
                    </div>
                    <div className='r_container' style={{ width: '50%' }}>
                        <div >
                            <h3>Created by</h3>
                        </div>
                        <div style={{ paddingLeft: '25%' }}>
                            <h3>Shared with</h3>
                        </div>
                        <div style={{ paddingLeft: '10%' }}>
                            <h3>Number of attachment</h3>
                        </div>
                    </div>
                </div>
                {graphs && graphs.length > 0 && (
                    graphs.map((graph, i) => (
                        <div className='user_container' key={i}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                            >
                               <img src={graph.graphImage} style={{width: '38px', height: '38px'}}/>
                                <div>{graph.graphTitle}</div>
                            </div>
                            <div>{graph.nodes_count}</div>
                            <div>{graph.links_count}</div>
                            <div>{graph.firstName} {graph.lastName}</div>
                            <div>{graph.shareCount}</div>
                            <div>{graph.document_count}</div>
                            <CharmMenu style={{ cursor: 'pointer' }} onClick={() => charmClick(graph.graphId)} />
                            <div className={`charm_wrapper ${graph.graphId}`} style={{ display: 'none' }}>
                                <div className='charm_item' onClick={() => {
                                    handleView(graph.graphId)
                                }}>
                                    <Eye />
                                    <p >View</p>
                                </div>
                                <div className='charm_item'
                                    onClick={() => {
                                        setShowDeleteGraph(true)

                                    }}
                                >
                                    <Remove />
                                    <p style={{ color: '#C03112' }}>Remove</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {showGraph && graphInfo && graphInfo.length > 0 && graphInfo.map((graph, i) => (
                    <div className='right_container' key={i}>
                        <CloseBlack className='close' onClick={() => setShowGraph(false)} />
                        <div className='userinfo_wrapper'>
                        <img src={graph.graphImage} style={{width: '80px', height: '80px'}}/>
                            <div className='userinfo'>
                                <h2>{graph.title}</h2>
                                <div className='checkbox_wrapper'>
                                    <input
                                        type='checkbox'
                                    />
                                    <p>Disable Graph</p>
                                </div>
                            </div>
                        </div>
                        <div className='info_items' style={{ padding: '40px 16px 16px 20px' }}>
                            <div className='info_item'>
                                <h2>Created by</h2>
                                <h2>Status</h2>
                                <h2>Nodes of number</h2>

                            </div>
                            <div className='info_item'>
                                <p style={{ color: '#63676A' }}>{graph.firstName} {graph.lastName}</p>
                                <p style={{ color: '#349EFC', fontWeight: 700 }}>{graph.status}</p>
                                <p style={{ color: '#63676A', fontWeight: 700 }}>{graph.nodes_count}</p>
                            </div>
                        </div>
                        <h2 className='type_name'>Node type name</h2>
                        <div className='graphs_container type' style={{ maxHeight: '200px' }}>
                            {graph.nodeInfo && graph.nodeInfo.length && graph.nodeInfo.map((info, i) => (
                                <div className='graph_wrapper' key={i}>
                                    <div className='graph_name'>
                                        <h2 className='name'>{info.type}</h2>
                                    </div>
                                    <p className='type'>{info.count}</p>
                                </div>
                            ))}
                        </div>
                        <div className='shared_with' style={{ gap: '64px' }}>
                            <h2>Links Number</h2>
                            <p>{graph.links_count}</p>
                        </div>
                        <div className='graphs_container type' style={{ maxHeight: '200px' }}>
                            {graph.linkInfo && graph.linkInfo.length && graph.linkInfo.map((link, i) => (
                                <div className='graph_wrapper' key={i}>
                                    <div className='graph_name'>
                                        <h2 className='name'>{link.type}</h2>
                                    </div>
                                    <p className='type'>{link.count}</p>
                                </div>
                            ))}
                        </div>
                        <div className='shared_with' style={{ gap: '80px' }}>
                            <h2>Shared with</h2>
                            <p>{graph.shareInfo ? graph.shareInfo.length : 0}</p>
                        </div>
                        <div className='graphs_container' style={{ maxHeight: '200px' }}>
                            {graph.shareInfo && graph.shareInfo.length && graph.shareInfo.map((share) => (
                                <div className='graph_wrapper'>
                                    <div className='graph_name'>
                                        <Avatar />
                                        <h2 className='name'>{share.first_name} {share.lastName}</h2>
                                    </div>
                                    <p className='type'>{share.user_role}</p>
                                </div>
                            ))}
                        </div>
                        <div className='info_items' style={{ padding: '40px 16px 16px 20px', gap: '12px' }}>
                            <div className='info_item'>
                                <h2>Number of attachment</h2>
                            </div>
                            <div className='info_item'>
                                <p style={{ fontWeight: 700 }}>20</p>
                            </div>
                        </div>
                        <div className='graphs_container' style={{ maxHeight: '200px' }}>
                            <div className='graph_wrapper'>
                                <div className='graph_name pad_12'>
                                    <Attach />
                                    <h2 className='name'>File Name format</h2>
                                </div>
                                <p className='type'>12.02.22</p>
                            </div>
                            <div className='graph_wrapper'>
                                <div className='graph_name pad_12'>
                                    <Attach />
                                    <h2 className='name'>File Name format</h2>
                                </div>
                                <p className='type'>12.02.22</p>
                            </div>
                            <div className='graph_wrapper'>
                                <div className='graph_name pad_12'>
                                    <Attach />
                                    <h2 className='name'>File Name format</h2>
                                </div>
                                <p className='type'>12.02.22</p>
                            </div>
                            <div className='graph_wrapper'>
                                <div className='graph_name pad_12'>
                                    <Attach />
                                    <h2 className='name'>File Name format</h2>
                                </div>
                                <p className='type'>12.02.22</p>
                            </div>
                            <div className='graph_wrapper'>
                                <div className='graph_name pad_12'>
                                    <Attach />
                                    <h2 className='name'>File Name format</h2>
                                </div>
                                <p className='type'>12.02.22</p>
                            </div>
                        </div>
                        <div className='btn_container' style={{ padding: '15px 16px 16px 0' }}>
                            <button className='btn_remove'>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default GraphDirectory