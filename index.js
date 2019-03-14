var admin = require('firebase-admin');

var serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dummy-87c4d.firebaseio.com"
});

// This registration token comes from the client FCM SDKs.
var registrationToken = 'exKezHDsyAw:APA91bFsQjvbHXn1wb_jZnw43JyORzB7Tu2AUELFiJ3hMr062DrEetaK8ut5Ra5kOSGJmlgZGP60jMF_mVXvfWsRTiq8BUiVvIX8M0AtZdLJ1fWWGnpWgoK-eoZmCaorM6OWjyBzaTIl';

var message = {
  android: {
    priority: 'high'
  },
  data: {
    title: 'A1 Lapsuss',
    message: 'Kako se kaže?'
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
/* admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
    process.exit(0);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
    process.exit(1);
}); */

var uid = 'mycustomtokenbitch';
var additionalClaims = {
  userId: "0"
};

admin.auth().createCustomToken(uid, additionalClaims)
  .then(function(customToken) {
    // Send token back to client
    console.log(customToken)
  })
  .catch(function(error) {
    console.log('Error creating custom token:', error);
  });
