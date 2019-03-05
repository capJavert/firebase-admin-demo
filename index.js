var admin = require('firebase-admin');

var serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dummy-87c4d.firebaseio.com"
});

// This registration token comes from the client FCM SDKs.
var registrationToken = 'e_D5ldxGWB4:APA91bEZ_VEtQO3Nl8X4HYj9c3sxch8K4GcrtB-SOT7qP-A79hOeLx59MwrXeCG4WMgKX7CgmfldYVo7zqL_6aoBSMBY2UB0KnlsbIp3EZamfp-rRDXvyJD57QKxe7DytSevSEMIKXBs';

var message = {
  android: {
    priority: 10
  },
  data: {
    title: 'A1 Lapsuss',
    message: 'Kako se kaže?'
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
