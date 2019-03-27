const googleAccessToken = {
    access_token: "random",
    expires_in: 9399,
    scope: "random-scope",
    token_type: "refresh",
}

const subscriptionPurchase = {
  "kind": "androidpublisher#subscriptionPurchase",
  "startTimeMillis": "1",
  "expiryTimeMillis": "1",
  "autoRenewing": true,
  "priceCurrencyCode": "GBP",
  "priceAmountMicros": "500000000",
  "countryCode": "GB",
  "developerPayload": "devPayload",
  "paymentState": 1,
  "orderId": "orderId-28764587264389289467",
  "linkedPurchaseToken": "linkedPurchaseToken",
  "purchaseType": 1,
  "profileName": "profileName",
  "emailAddress": "yusuf.faraji.freelancer@guardian.com",
  "givenName": "givenName",
  "familyName": "familyName",
  "profileId": "profileId"
}

module.exports = {
    subscriptionPurchase,
    googleAccessToken
}
