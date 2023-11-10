import { StatusBar } from 'react-native'
import React from 'react'

const AppStatusBar = () => {
    return (
        <StatusBar
            backgroundColor={'transparent'} translucent={true} barStyle={'light-content'}
        />
    )
}

export default AppStatusBar
