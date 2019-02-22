const express = require('express');
const bodyParser = require('body-parser');
const { ROUTES, isSuccessStatus } = require('./config/routes')

const app = express();
const PORT = 5000;
const pages = ROUTES.pages;

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const {
    subscriptionNotifications, 
    sendMessageNotification,
} = require('./services/notifications');

app.set('view engine', 'ejs');

// index page
app.get(pages.index, (req, res) => {
    res.render('pages' + pages.index, {
        subscriptionNotifications
    });
});

// success page
app.get(pages.success, (req, res) => { 
    res.render('pages' + pages.success);
});

// errop page
app.get(pages.error, (req, res) => { 
    res.render('pages' + pages.error);
})

app.post(pages.handleNotification, (req, res) => {

    sendMessageNotification(req.body.subscriptionNotification)
        .then(status => {
            const redirectPage = (isSuccessStatus(status)) ? pages.success : pages.error;
        
            res.redirect(302, redirectPage);
        });
})

app.listen(PORT, () => {
    console.log('app is running on port:', PORT);
});
