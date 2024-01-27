import React from 'react';
import { 
    Text,
    StyleSheet
 } from 'react-native';
 import {
    CodeField,
    useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';

const CodeInput = ({value, setValue}) => {
    
    const ref = useBlurOnFulfill({value, cellCount: 4});

    return(
        <CodeField
            ref={ref}
            caretHidden={false}
            value={value}
            onChangeText={setValue}
            cellCount={4}
            rootStyle={styles.root}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            clearTextOnFocus
            renderCell={({index, symbol, isFocused}) => (
                <Text
                    key={index}
                    style={styles.cell}
                >
                    {symbol}
                </Text>
            )}
        />
    )
};

export default CodeInput;

const styles = StyleSheet.create({
    cell: {
        width: hp('6.5%'),
        height: hp('6.5'),
        textAlign: 'center',
        padding:hp('0.5%'),
        fontSize:hp('4%'),
        borderWidth:1.5,
        borderColor:colors.orange,
        borderRadius: 15,
        color:colors.white
    },
    root: {
        marginVertical: hp('3%'),
        width:hp('33%')
    },
})