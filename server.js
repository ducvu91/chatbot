const APP_SECRET = 'f64324ec706d45b5e9de93c4b5b19fe0';
const VALIDATION_TOKEN = 'chatbot';
const PAGE_ACCESS_TOKEN = 'EAAH17oX3IIIBAEyVlhK716HDZAe5GAIqQeo7YjzEEh6O1UHPQ5UHb86u4re6ohmHnYVhVo1I9TzhXgwfjZAuiV1hrOvJ9UIPpRtuZCEdieNCkMnX6OkVLuUsgIN16BwnHZARLZAh6K2KcUSiFSoN4K2JHFE4to8kLZCAIhtWdiKKWaex2VwPIS';


var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
var server = http.createServer(app);
var request = require("request");

app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

app.get('/webhook', function(req, res) { // Đây là path để validate tooken bên app facebook gửi qua
  if (req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token.');
});

app.post('/webhook', function(req, res) { // Phần sử lý tin nhắn của người dùng gửi đến
   var entries = req.body.entry;
//   for (var entry of entries) {
//     var messaging = entry.messaging;
//     for (var message of messaging) {
//       var senderId = message.sender.id;
//       if (message.message) {
//         if (message.message.text) {
//           var text = message.message.text;
//           sendMessage(senderId, "Hello!! I'm a bot. Your message: " + text);
//         }
//       }
//     }
//   }
  
  console.log(req);
});

// Đây là function dùng api của facebook để gửi tin nhắn
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: PAGE_ACCESS_TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        text: message
      },
    }
  });
}

app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0");

server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});
