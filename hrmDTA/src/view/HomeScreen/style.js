const styles = StyleSheet.create({
    pageContainer: {
        width: width,
        height: height,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    camera: {
        width: width,
        height: height * 0.7
    },
    buttonContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    box: (x, y, width, height) => {
        return {
            position: 'absolute',
            top: y,
            left: x,
            height,
            width,
            borderWidth: 2,
            borderColor: 'red'
        }
    }
});

export default styles