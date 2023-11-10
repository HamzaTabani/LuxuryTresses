import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

const Container = ({ children }) => {
    return (
        <ImageBackground
            source={require('../assets/images/homebg.png')}
            style={styles.bg_home}>
            {children}
        </ImageBackground>
    );
};

export default Container;

const styles = StyleSheet.create({
    bg_home: {
        flex: 1
    }
})   