import React, { useCallback, useState } from 'react'
import { Input, InputGroup, Icon, Alert } from 'rsuite'
import firebase from 'firebase/app'
import { database } from '../../../misc/firebase'
import { useParams } from 'react-router'
import {useProfile} from '../../../context/profile.context'
function assembleMessage(profile, chatId){
        return{
            roomId: chatId,
            author:{
                name: profile.name,
                uid:profile.uid,
                createdAt:profile.createdAt,
                ...(profile.avatar ?{avatar:profile.avatar} : {}),
            },
            createdAt:firebase.database.ServerValue.TIMESTAMP,
        }
} 

const Bottom = () => {

    const[input,setInput]=useState('')
    const {profile}=useProfile()
    const {chatId} =useParams()
    const[isLoading,setIsLoading]=useState(false)
    const onInputChange= useCallback((value)=>{
        setInput(value)
    },[])

    const onSendClick =async () => {
        if(input.trim() === ''){
            return;
        }
        const msgData=assembleMessage(profile,chatId)
        msgData.text=input;
        const updates={};
        const messageId=database.ref('messages').push().key;
        updates[`/messages/${messageId}`]=msgData;
        updates[`/rooms/${chatId}/lastMessage`]={
            ...msgData,
            msgId: messageId,
        }
        setIsLoading(true)
        try{
            await database.ref().update(updates)
            setInput('')
            setIsLoading(false)

        }catch(err){
            Alert.error(err.message)
            setIsLoading(false)
        }
    }
    
    return (
        <div>
            <InputGroup>
            <Input placeholder="Write a message here..."
             value={input} onChange={onInputChange} />
            <InputGroup.Button color="blue" appearance="primary"
            onClick={onSendClick}
            disabled={isLoading}>
                <Icon icon="send" />
            </InputGroup.Button>
            </InputGroup>
        </div>
    )
}

export default Bottom
