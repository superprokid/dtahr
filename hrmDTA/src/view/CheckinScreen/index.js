import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, Image, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Network from 'expo-network';
import styles from './style';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const limitTakePhoto = 1;
const limitFaceDetected = 6;
let countTakePhoto = 0;
let countFaceDetected = 0;

export default CheckinScreen = (props) => {
    const [hasPermisstion, setPermission] = useState();
    const [faceData, setFaceData] = useState(null);
    const [box, setBox] = useState(null);

    const [photoUrl, setPhotoUrl] = useState(null);

    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status === 'granted');
        })();
    }, [])

    if (hasPermisstion === false) {
        return <Text>No access to camera</Text>
    }

    useEffect(() => {
        if (faceData) {
            setBox({
                width: faceData.bounds.size.width,
                height: faceData.bounds.size.height,
                x: faceData.bounds.origin.x,
                y: faceData.bounds.origin.y,
            })
        } else {
            setBox(null);
        }
    }, [faceData])

    const handleFacesDetected = ({ faces }) => {
        if (faces.length) {
            setFaceData(faces[0]);
            countFaceDetected++;
            if (countFaceDetected >= limitFaceDetected) {
                if (box) {
                    countFaceDetected = 0
                    takePhoto();
                }
                countFaceDetected = 0
            }
        } else {
            setBox(null);
            countFaceDetected = 0
        }

    }

    async function checkIn() {
        let file = {
            name: Date.now() + '.jpg',
            uri: photoUrl,
            type: "image/jpeg",
        }
        const formData = new FormData();

        const netWorkStatus = await Network.getNetworkStateAsync();

        formData.append('file', file);
        // fetch('http://26.74.195.215:5000/user', {
        //     method: 'POST',
        //     body: formData,
        // }).then((res) => {
        //     console.log(res);
        //     ToastAndroid.show('Checkin success', ToastAndroid.LONG)
        // }).catch((err) => {
        //     console.log("failed")
        //     console.log(err)
        //     ToastAndroid.show('Checkin failed', ToastAndroid.LONG)
        // })
        fetch('http://192.168.1.5:3000/api/user/app/checkin', {
            method: 'POST',
            body: formData
        }).then((res) => {
            console.log(res.status);
            ToastAndroid.show('Checkin success', ToastAndroid.LONG)
        }).catch((err) => {
            // console.log("failed")
            console.log(err)
            ToastAndroid.show('Checkin failed', ToastAndroid.LONG)
        })
    }

    function back() {
        setPhotoUrl(null);
    }

    const takePhoto = useCallback(async () => {
        if (countTakePhoto < limitTakePhoto) {
            countTakePhoto++;
            try {
                if (cameraRef.current == null) {
                    countTakePhoto--;
                    return;
                };
                console.log('Taking photo...');
                ToastAndroid.show('Taking the picture', ToastAndroid.LONG)
                const photo = await cameraRef.current.takePictureAsync({quality: 0.1});
                setPhotoUrl(photo.uri);
                console.log(photo);
                countTakePhoto--;

            } catch (e) {
                console.error('Failed to take photo!', e);
                countTakePhoto--;
            }
        }
    }, [cameraRef]);

    return (
        <View style={styles.pageContainer}>
            {
                photoUrl === null &&
                <View>
                    <Camera
                        ref={cameraRef}
                        type={Camera.Constants.Type.back}
                        style={styles.camera}
                        onFacesDetected={handleFacesDetected}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode.fast,
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all,
                            minDetectionInterval: 100,
                            tracking: true,
                        }} />
                    {
                        box !== null && <View style={styles.box(box.x, box.y, box.width, box.height)} />
                    }
                </View>
            }
            {
                photoUrl !== null &&
                <>
                    <Image style={styles.camera} source={{ uri: photoUrl }} ></Image>
                    <View style={styles.buttonContainer}>
                        <Button title='Checkin' onPress={checkIn}></Button>
                        <Button title='Back' onPress={back}></Button>
                    </View>
                </>
            }


        </View>
    );
}