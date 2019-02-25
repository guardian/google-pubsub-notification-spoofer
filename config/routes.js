const ROUTES = {
    pages: {
        index: '/',
        success: '/success',
        error: '/error',
        notification: '/notification',
    }
}

const isSuccessStatus = status => status === 204;

module.exports = {
    ROUTES,
    isSuccessStatus
}