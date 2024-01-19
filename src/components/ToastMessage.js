import React from 'react';
import CustomToast, { BaseToast } from 'react-native-toast-message';
import colors from '../assets/colors';

const ToastMessage = ({ position }) => {

    const toastConfig = {
        success: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: colors.orange, borderLeftWidth: 7 }}
                contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: colors.primary }}
                text1Style={{
                    fontSize: 15,
                    color: colors.orange,
                    fontWeight: '400'
                }}
            />
        ),
    }

    return (
        <CustomToast
            config={toastConfig}
            position={position}
            visibilityTime={3000}
        />
    )

}

export default ToastMessage;