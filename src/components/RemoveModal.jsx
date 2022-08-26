import React, { useState } from "react";
import { ReactComponent as Close } from '../assets/close.svg'
import Modal from 'react-modal'

const RemoveModal = ({ close, graph, closeDeleteGraph }) => {
    const handleClose = () => {
        if (graph) {
            closeDeleteGraph(false)
        } else {
            close(false)
        }
    }
    return (
        <Modal
            className='ghCreateUserModal'
            isOpen
            // onRequestClose={close}
            ariaHideApp={false}
            style={{
                overlay: {
                    zIndex: 10,
                },
                content: {
                    border: 'none',
                    outline: 'none'
                }
            }}
        >
            <div className='row'>
                <h2 style={{ paddingTop: 22, fontWeight: 400 }}>Are you sure?</h2>
                <Close className="close_svg" onClick={handleClose} />
            </div>
            <div className="content_wrapper" style={{ paddingTop: 7 }}>
                <div className="row-2" style={{ width: '50%', marginBottom: 25 }}>
                    {
                        graph ? <h3>All information associated with this graph will be permanently deleted
                        </h3> : <h3>All information associated with this user will be permanently deleted
                        </h3>
                    }
                </div>
                <div className="row-2">
                    <button className='cancel_btn' onClick={handleClose}>Cancel</button>
                    <button className='delete_btn'>Delete</button>
                </div>
            </div>

        </Modal>
    )
}

export default RemoveModal