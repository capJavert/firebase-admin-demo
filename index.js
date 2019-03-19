var admin = require('firebase-admin');

var serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lappsus-b97de.firebaseio.com"
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

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const port = 6666

app.post('/auth', async (req, res) => {
    console.log('/auth', req.body)

    const { uid } = req.body
    var additionalClaims = {
        userId: "0"
    }

    try {
        const token = await admin.auth().createCustomToken(uid, additionalClaims)

        res.json({
            token
        })
    } catch (e) {
        console.error('Error creating custom token:', e)
        res.json(e)
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
