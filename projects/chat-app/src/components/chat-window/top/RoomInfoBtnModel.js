import React, { memo } from 'react'
import { useCurrentRoom } from '../../../context/curreent-room.context'
import { useModalState } from '../../../misc/custom-hooks'
import { Button, Modal } from 'rsuite'

const RoomInfoBtnModel = () => {
    const {isOpen,close,open}=useModalState()
    const description=useCurrentRoom(v=>v.description)
    const name= useCurrentRoom(v=> v.name)
    return (
        <div>
            <Button appearance="link" className="px-0"onClick={open}>
                Room Information
            </Button>
            <Modal show={isOpen} onHide={close}> 
            <Modal.Header>
                <Modal.Title>
                    About {name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 className="mb-1">Description</h6>
                <p> {description} </p>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
    )
}

export default memo(RoomInfoBtnModel)
