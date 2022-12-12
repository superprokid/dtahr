import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Dimensions, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Network from 'expo-network';
import styles from './style';
import AppLoader from '../../components/AppLoader';
import apiUtls, { USER_CHECKIN } from '../../common/apiUtls';
import { showErrorNetwork } from '../../common/commonFunc';
import { compareTwoTimeGreaterOrEqual } from '../../common/datetimeUtls';
import storageUtls from '../../common/storageUtls';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const limitTakePhoto = 1;
const limitFaceDetected = 6;
let countTakePhoto = 0;
let countFaceDetected = 0;
const COUNT_START = 3;
const WORKLOG_STATUS = {
    CHECK_IN: 0,
    CHECK_OUT: 1,
    NOT_WORKKING: 2,
}
const WORKLOG_TEXT = ['Checkin', 'Checkout', 'Not Working Time']

export default CheckinScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasPermisstion, setPermission] = useState();
    const [faceData, setFaceData] = useState(null);
    const [box, setBox] = useState(null);
    const [loaded, setLoaded] = useState(true);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [isPrepareCheckin, setIsPrepareCheckin] = useState(false);
    const [myInterval, setMyInterval] = useState(null);
    const [myCount, setMyCount] = useState(COUNT_START);
    const [allowCheckIn, setAllowCheckin] = useState(false);
    const [statusWorklog, setStatusWorklog] = useState(null);
    const cameraRef = useRef(null);
    
    const navigation = props.navigation;

    async function getStartData () {
        const result = await apiUtls.getCurrentWorklog();
        const startData = await apiUtls.getStart();
        if (result.failed || result == -1) {
            showErrorNetwork();
        } else {
            if (result) {
                if (result.work_status == WORKLOG_STATUS.CHECK_IN) {
                    setStatusWorklog(WORKLOG_STATUS.CHECK_OUT)
                } else {
                    setStatusWorklog(WORKLOG_STATUS.CHECK_IN);
                }
            } else {
                setStatusWorklog(WORKLOG_STATUS.CHECK_IN);
            }
            const now = new Date();
            if (now.getDay() === 0 || now.getDay() === 6) {
                setStatusWorklog(WORKLOG_STATUS.NOT_WORKKING);
            }
            if (startData.workTime) {
                if (compareTwoTimeGreaterOrEqual(now.getHours(), now.getMinutes(), startData.workTime.hour_end, startData.workTime.min_end)) {
                    setStatusWorklog(WORKLOG_STATUS.NOT_WORKKING);
                }
                if (startData.workTime.isHoliday) {
                    setStatusWorklog(WORKLOG_STATUS.NOT_WORKKING);
                }
            }
        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status === 'granted');
        })();
        
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoaded(true);
            getStartData();
            console.log('focus');
        });
        navigation.addListener('blur', () => {
            setLoaded(false);
        });

        return unsubscribe;
    }, [navigation])

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

    useEffect(() => {
        if (myCount == 0 && allowCheckIn) {
            console.log('taking the photooo');
            // setMyCount(COUNT_START);
            takePhoto();
        }
    }, [myCount])

    const handleFacesDetected = ({ faces }) => {
        if (faces.length) {
            setFaceData(faces[0]);
            if (isPrepareCheckin) {
                setIsPrepareCheckin(false);
                let count = COUNT_START;
                const inte = setInterval(() => {
                    if (count >= 0) {
                        setMyCount(count--);
                    }
                }, 1000);
                setTimeout(() => {
                    clearAllInterval(inte);
                }, 5000)
            }
        } else {
            setBox(null);
            setAllowCheckin(false);
            setMyCount(COUNT_START);
            // countFaceDetected = 0
        }

    }

    async function onCheckIn() {
        setIsPrepareCheckin(true);
        setAllowCheckin(true);
    }

    async function onCheckOut() {
        setIsLoading(true);
        const result = await apiUtls.callCheckOut();
        if (result.failed || result == -1) {
            showErrorNetwork();
        } else {
            Alert.alert('Information', result.message || 'Check out success', [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], { cancelable: true });
            await getStartData();
        }
        setIsLoading(false);
    }

    function clearAllInterval() {
        const intervalId = setInterval(() => {}, 10000);
        for (let i = 1; i < intervalId; i++) {
            clearInterval(i);
        }
    }

    const takePhoto = useCallback(async () => {
        try {
            if (cameraRef.current == null) {
                return;
            };
            console.log('Taking photo...');
            ToastAndroid.show('Taking the picture', ToastAndroid.LONG)
            setIsLoading(true);
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.1 });
            let file = {
                name: Date.now() + '.jpg',
                uri: photo.uri,
                type: "image/jpeg",
            }
            const formData = new FormData();
            formData.append('file', file);
            const result = await apiUtls.callCheckIn(formData);
            if (result.failed) {
                Alert.alert('Error', result.data.message || 'Something went wrong, please try later!', [
                    {
                        text: 'OK',
                        style: 'cancel'
                    }
                ], { cancelable: true });
            } else {
                Alert.alert('Information', result.message || 'Check in success', [
                    {
                        text: 'OK',
                        style: 'cancel'
                    }
                ], { cancelable: true });
                await getStartData()
            }
            
        } catch (e) {
            Alert.alert('Error', result.data.message || 'Something went wrong, please try later!', [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], { cancelable: true });
            // showErro
        } finally {
            setIsLoading(false);
            setIsPrepareCheckin(false);
            setAllowCheckin(false);
        }
    }, [cameraRef]);

    return (
        <View style={styles.pageContainer}>
            <View>
                {
                    loaded &&
                    <Camera
                        ref={cameraRef}
                        type={Camera.Constants.Type.front}
                        style={styles.camera}
                        onFacesDetected={handleFacesDetected}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode.fast,
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all,
                            minDetectionInterval: 100,
                            tracking: true,
                        }} />
                }
                {
                    box !== null && <View style={styles.box(box.x, box.y, box.width, box.height)} />
                }
            </View>
            {
                box && statusWorklog !== WORKLOG_STATUS.NOT_WORKKING &&
                <View style={styles.checkinModal}>
                {
                    !allowCheckIn && <Text style={styles.checkinModalText}>Do you want to <Text style={{color: statusWorklog == WORKLOG_STATUS.CHECK_IN ? '#26C6DA' : '#f24f13'}}>{WORKLOG_TEXT[statusWorklog]}</Text>?</Text>
                }
                {
                    allowCheckIn && <Text style={styles.checkinModalText}>{WORKLOG_TEXT[statusWorklog]} at <Text style={{color: '#26C6DA'}}>{myCount} secs</Text></Text>
                }
                {
                    !allowCheckIn && statusWorklog == WORKLOG_STATUS.CHECK_IN && <TouchableOpacity style={styles.checkinButton} onPress={onCheckIn}><Text style={styles.checkinText}>CHECK IN</Text></TouchableOpacity>
                }
                {
                    !allowCheckIn && statusWorklog == WORKLOG_STATUS.CHECK_OUT  && <TouchableOpacity style={styles.checkinButton} onPress={onCheckOut}><Text style={styles.checkinText}>CHECK OUT</Text></TouchableOpacity>
                }
                {
                    allowCheckIn && <Text>Recognizing your face...</Text>
                }
            </View>
            }
            { isLoading && <AppLoader/>}
        </View>
    );
}