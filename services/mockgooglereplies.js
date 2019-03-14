const googleAccessToken = {
    access_token: "random",
    expires_in: 9399,
    scope: "random-scope",
    token_type: "refresh",
}

const subscriptionPurchase = {
  "kind": "androidpublisher#subscriptionPurchase",
  "startTimeMillis": 1,
  "expiryTimeMillis": 12,
  "autoRenewing": true,
  "priceCurrencyCode": "GBP",
  "priceAmountMicros": 50000000,
  "countryCode": "GB",
  "developerPayload": "devPayload",
  "paymentState": 1,
  "cancelReason": 1,
  "userCancellationTimeMillis": 1,
  "cancelSurveyResult": {
    "cancelSurveyReason": 1,
    "userInputCancelReason": "reason"
  },
  "orderId": "orderId",
  "linkedPurchaseToken": "linkedPurchaseToken",
  "purchaseType": 1,
  "profileName": "profileName",
  "emailAddress": "yusuf.faraji.freelancer@theguardian.com",
  "givenName": "Yusuf",
  "familyName": "Faraji",
  "profileId": "profileId"
}

module.exports = {
    subscriptionPurchase,
    googleAccessToken
}
