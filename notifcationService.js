import PushNotification from 'react-native-push-notification'
import firebase from 'react-native-firebase'
import { AsyncStorage } from 'react-native';

export const config = async () => {
    PushNotification.configure({

        // (required) Called when a remote or local notification is opened or received
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);


        },

    });
}



export const sendNotifcation = async () => {
    //you can add any token you need for send notifcation for it  
    const token = await AsyncStorage.getItem('fcmToken')
    const Firebase_API_KEY = "AAAAhUF8Mjc:APA91bFG-gYYgR8K2GLBO-__XaplHkBX86PuQ2ARzeYJngBx3LARLXjKmgn4e826fvzA5-W2RHC1BjIbeWWyJi9XxNN8s1ae_AExQ_ttm3O2zwSiCCKetTpw8HiTnX3l-ZJJKFKTUpID";
    const message = {
        registration_ids: [token],
        notification: {
            title: "APP",
            body: "This My Frist Notfication Text",
            "vibrate": 1,
            "sound": 2,
            "show_in_foreground": true,
            "priority": "high",
            "content_available": true
        }
    }
    let headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": "key=" + Firebase_API_KEY
    })

    let respone = await fetch("https://fcm.googleapis.com/fcm/send", { method: 'POST', headers, body: JSON.stringify(message) })
    respone = await respone.json()
    console.log("ressss", respone)
}

//get/set FCM token from storage and Check permasion 

export const SetFCMToken = async () => {
    firebase.messaging().hasPermission()
        .then(enabled => {
            if (enabled) {
                console.log('user has permission')
            } else {
                this.NotiPermission()
            }

        })

    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log('fcmToken', fcmToken)
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            console.log('fcmToken', fcmToken)
            await AsyncStorage.setItem('fcmToken', fcmToken)
        }
    }
}

NotiPermission = async () => {
    firebase.messaging().requestPermission()
        .then(() => {
            console.log('Done')
        }).catch(() => {
            console.log('rejected')
        })
}