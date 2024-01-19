import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Ionicons'

const InputText = ({ label, value, placeholder, onChangeText, icon, keyboardType, secureTextEntry }) => {
    return (
        <View style={{ marginBottom: hp('2%') }}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputStyle}>
                <Icon
                    name={icon}
                    color="#bbb9bd"
                    size={26}
                    style={{ marginLeft: 10 }}
                />
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={'#bbb9bd'}
                    keyboardType={keyboardType}
                    onChangeText={onChangeText}
                    style={styles.input}
                />
            </View>
        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    inputStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        borderWidth: 1,
        borderRadius: 40,
        borderColor: '#D49621',
    },
    label: {
        fontSize: hp('2%'),
        color: '#bbb9bd',
        marginBottom: 15,
        marginTop: 25,
    },
    input: {
        marginLeft: hp('2%'),
        width: '70%',
        color: '#bbb9bd'
    }
})