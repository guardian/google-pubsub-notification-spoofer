const Producer = require('sqs-producer');


const producer = Producer.create({
  queueUrl: 'http://localhost:9324/queue/google-pub-sub-dev',
  region: 'elasticmq',
  accessKeyId: 'x',
  secretAccessKey: 'x'
});

function send(message){
    let randomId = Math.floor(Math.random() * 10000).toString()
    let sqsMessage = JSON.stringify({
        id: randomId,
        body: message
    })

    console.log("Sending Message" + sqsMessage)
    producer.send([sqsMessage], function(err) {
      if (err) {
      console.log(err);
        return false;
      } else {
        return true;
      }
    });
}

module.exports = {
    send
}