import React, { useState } from "react";
import Modal from 'react-modal'
import { ReactComponent as Admin } from '../assets/admin.svg'
import { ReactComponent as Close } from '../assets/close.svg'
import ChangePasswordModal from "./ChangePasswordModal";

const SettingsModal = ({ close }) => {
    const [showChangePassword, setShowChangePassword] = useState(false)
    const handleClick = () => {
        setShowChangePassword(true)
    }
    return (
        <>
            <Modal
                className='ghSettingsModal'
                isOpen
                onRequestClose={close}
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
                <div className='row' style={{ paddingTop: '15px' }}>
                    <Admin style={{ width: '35px', height: '45px' }} />
                    <h2 style={{ fontWeight: 400 }}>Admin page</h2>
                    <Close className="close_svg" onClick={() => close(false)} />
                </div>
                <div className="content_wrapper">
                    <div className="row-2">
                        <p>E-mail address:</p>
                        <p style={{ color: '#2798FC' }}>analysedsoft@mail.com</p>
                    </div>
                    <div className="row-2" style={{ width: '315px' }}>
                        <p>Password:</p>
                        <p style={{
                            paddingLeft: '38px',
                            color: '#2798FC',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}
                            onClick={handleClick}
                        >
                            Change
                        </p>
                    </div>
                </div>
            </Modal>
            {showChangePassword && <ChangePasswordModal close={close} setShowChangePassword={setShowChangePassword} />}
        </>
    )
}

export default SettingsModal