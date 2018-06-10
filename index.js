
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const app = express();


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Session middleware

// Create an instance of Pusher
const pusher = new Pusher({
    appId: '540739',
    key: 'f65c9b9beda96b315dfa',
    secret: '72ac7845880aea1ab958',
    cluster: 'eu',
    encrypted: true
});


app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

// get authentictation for the channel;
app.post('/pusher/auth', (req, res) => {
        const socketId = req.body.socket_id;
        const channel = req.body.channel_name;
        var presenceData = {
            user_id: Math.random().toString(36).slice(2) + Date.now()
        }
        const auth = pusher.authenticate(socketId, channel, presenceData);
        res.send(auth);
});

// ssl verification (sslforfree -> letsencrypt)
app.get('/.well-known/acme-challenge/1u6uiDO0-OtJUMgcIuiTDR3I8ErdwrcVwzMQMMjBDMA', (req, res) => {
    return res.sendFile(__dirname + '/.well-known/acme-challenge/1u6uiDO0-OtJUMgcIuiTDR3I8ErdwrcVwzMQMMjBDMA');
});

//listen on the app
app.listen(8080, () => {
    return console.log('Server is up on 8080')
});
