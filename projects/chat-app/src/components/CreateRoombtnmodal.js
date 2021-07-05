import React, { useCallback, useRef, useState } from 'react'
import {Alert, Button, ControlLabel, Form, FormControl, FormGroup, Icon,Modal, Schema} from 'rsuite'
import { useModalState } from '../misc/custom-hooks'
import firebase from 'firebase/app'
import { database } from '../misc/firebase'
const {StringType}= Schema.Types

const model=Schema.Model({
    name:StringType().isRequired('Chat name is required'),
    description:StringType().isRequired('Description is required')
})


const INITIAL_FORM ={
    name: '',
    description: ''
}

const CreateRoombtnmodal = () => {
    const {isOpen, open, close}= useModalState()
    const [formValue, setFromValue]=useState(INITIAL_FORM)
    const [isLoading,setIsLoading]=useState(false)

    const formRef= useRef()
    const onFormChange=useCallback( value=>{
        setFromValue(value)
    },[])

    const onSubmit = async () => {
        if(!formRef.current.check()){
            return;
        }

        setIsLoading(true)

        const newRoomData= {
                ...formValue,
                createdAt : firebase.database.ServerValue.TIMESTAMP
        }
        try{
            await database.ref('rooms').push(newRoomData)
            Alert.info(`${formValue.name} has been created` ,4000 )

            setIsLoading(false)
            setFromValue(INITIAL_FORM)
            close()
        }catch(err){
            setIsLoading(false)
            Alert.error(err.message, 4000)
        }
    }

    return (
        <div className="mt-2">
            <Button block color="green" onClick={open} > 
            <Icon icon="creative"/> Create new Chat Room
            </Button>

            <Modal show={isOpen} onHide={close}>
            <Modal.Header>
                <Modal.Title>New Chat Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form fluid onChange={onFormChange} 
                ref={formRef }
                formValue={formValue} model={model} >
                    <FormGroup>
                        <ControlLabel>Room Name</ControlLabel>
                        <FormControl name="name" placeholder="Enter chat room name" />
                   </FormGroup>
                   <FormGroup>
                        <ControlLabel>Discription</ControlLabel>
                        <FormControl componentClass="textarea" rows={5} 
                        name="description" placeholder="Enter room description..." />
                   </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button block appearance="primary" onClick={onSubmit} disabled={isLoading} >
                    Create New Chat Room
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreateRoombtnmodal
 