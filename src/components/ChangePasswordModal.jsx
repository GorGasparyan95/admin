import React from "react";
import Modal from 'react-modal'
import { ReactComponent as Admin } from '../assets/admin.svg'
import { ReactComponent as Close } from '../assets/close.svg'
import NewPassword from "../pages/NewPassword";

const ChangePasswordModal = ({ setShowChangePassword, close }) => {
    // const [values, setValues] = useState(
    //     {
    //         newPwd: '',
    //         confirm: ''
    //     }
    // )
    // const [showNewPwd, setShowNewPwd] = useState(false)
    // const [showConfirmPwd, setShowConfirmPwd] = useState(false)
    // const [errors, setErrors] = useState({
    //     newPwd: false,
    //     confirm: false
    // })

    return (
        <Modal
            className='ghChangePasswordModal'
            isOpen
            onRequestClose={setShowChangePassword}
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
                <Close className="close_svg" onClick={() => {
                    close(false)
                    setShowChangePassword(false)
                }} />
            </div>
            <div className="content_wrapper">
                <div className="row-2">
                    <p>E-mail address:</p>
                    <p style={{ color: '#2798FC' }}>analysedsoft@mail.com</p>
                </div>
                <div className="row-2" style={{ width: '315px', alignItems: 'flex-start' }}>
                    <p>Password:</p>
                  <NewPassword change={true}/>
                </div>
            </div>
        </Modal>
    )
}

export default ChangePasswordModal