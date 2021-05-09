const accountSid = "AC3aa934451695ae0d03c735b0d6cd5f44";
const authToken = "56c5f62babe32b006366a0d096dcc59d";
const client = require('twilio')(accountSid, authToken);
client.messages
  .create({
     body: 'Thanks for signing up for Twilio message alerts! You will receive a notification at your next garbage day.',
     from: '+17272708783',
     to: '+16478792580'
   })
  .then(message => console.log(message.sid));


  