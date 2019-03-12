const axios = require('axios');
const api = require('../config/api');

const SubscriptionNotificationEnum = {
    1: 'SUBSCRIPTION_RECOVERED', // - A subscription was recovered from account hold.
    2: 'SUBSCRIPTION_RENEWED', // - An active subscription was renewed.
    3: 'SUBSCRIPTION_CANCELED', // - A subscription was either voluntarily or involuntarily cancelled. For voluntary cancellation, sent when the user cancels.
    4: 'SUBSCRIPTION_PURCHASED', // - A new subscription was purchased.
    5: 'SUBSCRIPTION_ON_HOLD', // - A subscription has entered account hold (if enabled).
    6: 'SUBSCRIPTION_IN_GRACE_PERIOD', // - A subscription has entered grace period (if enabled).
    7: 'SUBSCRIPTION_RESTARTED', // - User has reactivated their subscription from Play > Account > Subscriptions (requires opt-in for subscription restoration)
    8: 'SUBSCRIPTION_PRICE_CHANGE_CONFIRMED', // - A subscription price change has successfully been confirmed by the user.
    9: 'SUBSCRIPTION_DEFERRED', // - A subscription's recurrence time has been extended.
    12: 'SUBSCRIPTION_REVOKED', // - A subscription has been revoked from the user before the expiration time.
    13: 'SUBSCRIPTION_EXPIRED', // - A subscription has expired.
}

const subscriptionNotifications = [
    { type: SubscriptionNotificationEnum[1], value: 1 },
    { type: SubscriptionNotificationEnum[2], value: 2 },
    { type: SubscriptionNotificationEnum[3], value: 3 },
    { type: SubscriptionNotificationEnum[4], value: 4 },
    { type: SubscriptionNotificationEnum[5], value: 5 },
    { type: SubscriptionNotificationEnum[6], value: 6 },
    { type: SubscriptionNotificationEnum[7], value: 7 },
    { type: SubscriptionNotificationEnum[8], value: 8 },
    { type: SubscriptionNotificationEnum[9], value: 9 },
    { type: SubscriptionNotificationEnum[12], value: 12 },
    { type: SubscriptionNotificationEnum[13], value: 13 },
]


const developerNotification = {
  "version":"1.0",
  "packageName":"com.some.thing",
  "eventTimeMillis": null,
  "subscriptionNotification":
  {
    "version":"1.0",
    "notificationType": null,
    "purchaseToken":"PURCHASE_TOKEN",
    "subscriptionId": null
  }
}

const googlePushMessage = {
  "message": {
    "data": null,
    "messageId": "randomstring",
    "publishTime": null
  },
  "subscription": "subscription"
}


const createDeveloperNotification = (skuId, notificationType) => {

    // add notificationType to subscriptionNotification
    const subscriptionNotification = { 
        ...developerNotification.subscriptionNotification, 
        notificationType: parseInt(notificationType),
        subscriptionId: skuId,
    }

    // add eventTimeMillis and subscriptionNotification to developerNotification
    const newDeveloperNotification = { 
        ...developerNotification, 
        subscriptionNotification, 
        eventTimeMillis: Date.now().toString(),
    }


    console.log(JSON.stringify(newDeveloperNotification))

    const newInnerMessage = {
      ...googlePushMessage.message,
        publishTime: Date.now().toString(),
        data: Buffer.from(JSON.stringify(newDeveloperNotification)).toString("base64")
    }

    const newPushMessage = {
      ...googlePushMessage,
      message: newInnerMessage
    }

    return newPushMessage;
}

module.exports = {
    subscriptionNotifications,
    createDeveloperNotification,
    SubscriptionNotificationEnum,
}