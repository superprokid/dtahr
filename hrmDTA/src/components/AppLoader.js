import AnimatedLottieView from "lottie-react-native";
import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";

const AppLoader = (props) => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <AnimatedLottieView source={require('../assets/gifs/dotsloading.json')} autoPlay loop />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1
    }
})

export default AppLoader
