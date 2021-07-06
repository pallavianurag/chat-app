import React from 'react'
import { Drawer, Button, Divider, Alert } from 'rsuite'
import EditableInput from '../components/EditableInput'
import { useProfile } from '../context/profile.context'
import { database } from '../misc/firebase'
import ProviderBlock from './ProviderBlock'
import AvatarUploadBtn from './AvatarUploadBtn'
import { getuserUpdate } from '../misc/helpers'

const Dashboard = ({onSignOut}) => {
    const {profile}=useProfile()
    const onSave = async newData =>{

      try {
          const updates = await getuserUpdate(profile.uid,
            'name',
            newData,
            database)
            await database.ref().update(updates)
          Alert.success('Nickname has been updated',4000)
      }catch(err){
          Alert.error(err.message,4000)
      }
    }
    return (
        <>
          <Drawer.Header>
              <Drawer.Title> Dashboard  </Drawer.Title>
          </Drawer.Header>

          <Drawer.Body>
            <h3>Hey, {profile.name}</h3>
            <ProviderBlock />
            <Divider />
            <EditableInput
             name="nickname"
              initialValue={profile.name} 
              onSave={onSave} label={<h6 className="mb-2">Nickname</h6>} />
              <AvatarUploadBtn />
          </Drawer.Body>
          <Drawer.Footer>
            <Button block color="red" onClick={onSignOut} >
                Sign Out</Button>
          </Drawer.Footer>
        </>
    )
}

export default Dashboard
