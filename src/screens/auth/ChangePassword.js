import { View, Text, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import BackHeader from '../../components/BackHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import InputText from '../../components/InputText'
import PrimaryButton from '../../components/PrimaryButton'
import { ShowToast } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../redux/slices/AuthSlice'
import { useNavigation } from '@react-navigation/native'

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigation = useNavigation()

    const dispatch = useDispatch()

    const { change_loading, token } = useSelector(state => state.userData)
    console.log('loader whyy', change_loading)

    const onChangePassword = async () => {
        if (!currentPassword) {
            return ShowToast('Please type your password')
        } else if (!newPassword) {
            return ShowToast('Please type your new password')
        } else if (!confirmPassword) {
            return ShowToast('Please Re type your password')
        } else if (confirmPassword !== newPassword) {
            return ShowToast('Password does not match')
        } else if (newPassword.length < 8) {
            return ShowToast('Password is too short')
        } else {
            const res = await dispatch(changePassword({
                current_password: currentPassword,
                new_password: newPassword
            }))
            // console.log('response from action',res)
            if (res.payload) {
                navigation.navigate('home')
            }
        }
    }

    return (
        <ImageBackground
            source={require('../../assets/images/otpbg.png')}
            resizeMode="cover"
            style={{ flex: 1 }}
        >
            <BackHeader />
            <View style={styles.labelWrapper}>
                <Text style={styles.heading}>Change Password</Text>
            </View>
            <ScrollView contentContainerStyle={styles.screen}>
                <View style={styles.inputWrapper}>
                    <InputText
                        label={'Enter your current password'}
                        value={currentPassword}
                        onChangeText={(text) => setCurrentPassword(text)}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        icon={'lock-closed-outline'}
                    />
                    <InputText
                        label={'Enter your new password'}
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text)}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        icon={'lock-closed-outline'}
                    />
                    <InputText
                        label={'Confirm Password'}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        icon={'lock-closed-outline'}
                    />
                    <View style={{ paddingTop: hp('3%'), alignItems: 'center' }}>
                        <PrimaryButton
                            title={'Change Password'}
                            indicator={change_loading}
                            onPress={() => onChangePassword()}
                        />
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
    },
    heading: {
        fontSize: hp('5%'),
        color: '#fff',
        fontFamily: 'Lora-Medium',
    },
    labelWrapper: {
        padding: hp('7%'),
        paddingTop: hp('3%')
    },
    inputWrapper: {
        width: '85%'
    }
})