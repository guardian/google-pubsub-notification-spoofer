const express = require('express');
const bodyParser = require('body-parser');
const { ROUTES, isSuccessStatus } = require('./config/routes')

const sqsProducer = require('./sqs')

const app = express();
const PORT = 5000;
const pages = ROUTES.pages;

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const {
    subscriptionNotifications, 
    sendMessageNotification,
    SubscriptionNotificationEnum,
    createDeveloperNotification
} = require('./services/notifications');

app.set('view engine', 'ejs');

// index page
app.get(pages.index, (req, res) => {
    res.render('pages' + pages.index, {
        subscriptionNotifications,
        notificationRoute: pages.notification,
    });
});

// success page
app.get(pages.success, (req, res) => { 
    res.render('pages' + pages.success, {
        notificationType: SubscriptionNotificationEnum[req.query.notificationType],
    });
});

// error page
app.get(pages.error, (req, res) => { 
    res.render('pages' + pages.error, {
        errorStatus: req.query.errorStatus,
    });
})

app.post(pages.notification, (req, res) => {
    const { subscriptionNotification, skuId } = req.body;

  const successRoute = pages.success + '?notificationType=' + subscriptionNotification;
  const errorRoute = pages.error + '?errorStatus=500';

  sqsProducer.send(createDeveloperNotification(skuId, subscriptionNotification))
    .then(() => res.redirect(302, successRoute), () => res.redirect(302, errorRoute))
})

app.listen(PORT, () => {
    console.log('app is running on port:', PORT);
});
