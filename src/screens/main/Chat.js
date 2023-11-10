import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import ProfileHeader from '../../components/ProfileHeader'

const Chat = () => {
    return (
        <Container>
            <ProfileHeader
                icon={true}
                text={'Messages'}
            />
        </Container>
    )
}

export default Chat

const styles = StyleSheet.create({})