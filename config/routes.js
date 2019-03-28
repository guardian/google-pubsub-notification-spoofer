const ROUTES = {
    pages: {
        index: '/',
        success: '/success',
        error: '/error',
        notification: '/notification',
        accessToken: '/o/oauth2/token/',
        subscriptionPurchase: '/androidpublisher/v3/applications/:organisation/purchases/subscriptions/:sku/tokens/:purchaseToken'
    }
}

const isSuccessStatus = status => status === 204;

module.exports = {
    ROUTES,
    isSuccessStatus
}
