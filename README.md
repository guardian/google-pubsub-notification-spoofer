# Google pubsub spoofer

This application has been created to allow us to test the notification endpoint that handles 
the SKU's in the [subscribe with google service](https://github.com/guardian/subscribe-with-google)

### Start the application

```
npm start
```

### Run tests

```
npm test
```

### To build the ElasticMQ instance:

```
./build-image.sh
```

### To run the ElasticMQ instance:
```
docker run -p 9324:9324 local-sqs-spoofer
```

Once the application is started - Browse through to `http://localhost:5000/` and send messages through to ElasticMQ.
