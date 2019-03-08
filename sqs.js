const Producer = require('sqs-producer');


const producer = Producer.create({
  queueUrl: 'http://localhost:9324/google-pub-sub-dev',
  region: 'elasticmq',
  accessKeyId: 'x',
  secretAccessKey: 'x'
});

function send(message){
    let id = Math.random().toString()
    producer.send([{
      id: id,
      body: message
    }], function(err) {
      if (err) console.log(err);
    });
}

module.exports = {
    send
}