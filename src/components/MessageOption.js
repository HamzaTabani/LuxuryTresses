import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Message from 'react-native-vector-icons/Feather'

const MessageOption = () => {
    return (
        <TouchableOpacity style={styles.messageCard} activeOpacity={0.9}
            onPress={() => alert('work in progress')}
        >
            <Message
                name={'message-square'}
                color={colors.white}
                size={23}
            />
        </TouchableOpacity>
    )
}

export default MessageOption

const styles = StyleSheet.create({
    messageCard: {
        backgroundColor: colors.lightgreen,
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('6.5%'),
        borderRadius: 100,
        width: hp('6.5%')
    }
})