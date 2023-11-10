import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Message from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

const MessageOption = () => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.messageCard} activeOpacity={0.9}
            onPress={() => navigation.navigate('SecondaryStack',{screen: 'Chat'})}
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