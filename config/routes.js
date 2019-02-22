const ROUTES = {
    pages: {
        index: '/',
        success: '/success',
        error: '/error',
        handleNotification: '/handle-notification',
    }
}

const isSuccessStatus = status => status === 204;

module.exports = {
    ROUTES,
    isSuccessStatus
}