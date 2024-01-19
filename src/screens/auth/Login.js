import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackHeader from '../../components/BackHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import InputText from '../../components/InputText'
import PrimaryButton from '../../components/PrimaryButton'
import { ShowToast } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/slices/AuthSlice'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const { token, signin_loading } = useSelector(state => state.userData)
    console.log('loader', token)

    const onLoginPress = async () => {
        if (!email) {
            return ShowToast('Please type your email')
        } else {
            dispatch(login({
                email: email,
                password: password
            }))
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
                <Text style={styles.heading}>Login</Text>
            </View>
            <View style={styles.screen}>
                <View style={styles.inputWrapper}>
                    <InputText
                        label={'Enter your email'}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder={'Email'}
                        keyboardType={'email-address'}
                        icon={'mail-outline'}
                    />
                    <InputText
                        label={'Enter your password'}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        icon={'lock-closed-outline'}
                    />
                    <View style={{ paddingTop: hp('3%') }}>
                        <PrimaryButton
                            title="Login"
                            indicator={signin_loading}
                            onPress={() => onLoginPress()}
                        />
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Login

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
    }
})