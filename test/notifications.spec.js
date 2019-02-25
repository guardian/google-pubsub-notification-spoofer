const { expect } = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const { sendMessageNotification, createDeveloperNotification } = require('../services/notifications');
const { HANDLE_MESSAGE } = require('../config/api');
describe('Notification service', () => {

    describe('API responses', () => {
        let sandbox;
        let server;
        
        beforeEach(() => {
            sandbox = sinon.createSandbox();
            server = sandbox.useFakeServer();
        });

        afterEach(() => {
            server.restore();
            sandbox.restore();
            axios.post.restore(); // unwraps stubbed function
        });

        it('should return status of 204 on success', (done) => {
            const stubResponse = { data: 'this is the data', status: 204 };
            const expectedStatus = 204;

            sinon.stub(axios, 'post').resolves(Promise.resolve(stubResponse));
            sendMessageNotification()
                .then((status) => {
                    expect(status).to.equal(expectedStatus);
                })
                .then(done, done);
        });

        it('should return status of 404 on page not found', (done) => {
            const stubResponse = { 
                response: {
                    status: 404,
                    statusText: 'Not Found',
                }
            };
            const expectedStatus = 404;

            sinon.stub(axios, 'post').resolves(Promise.reject(stubResponse));
            sendMessageNotification()
                .then((status) => {
                    expect(status).to.equal(expectedStatus);
                })
                .then(done, done);
        });
    });

    describe('createDeveloperNotification', () => {
        it('should change eventTimeMillis to a number', () => {
            const expectedDeveloperNotification = { 
                "version":"1.0",
                "packageName":"com.some.thing",
                "eventTimeMillis": sinon.match.number,
                "subscriptionNotification":
                {
                    "version":"1.0",
                    "notificationType": null,
                    "purchaseToken":"PURCHASE_TOKEN",
                    "subscriptionId":"my.sku"
                }
            }

            const notificationType = 2;
            const newDeveloperNotification = createDeveloperNotification(notificationType);

            expect(newDeveloperNotification)
                .to.have.property('eventTimeMillis')
                .which.is.a('number')
                .above(0)
                .and.satisfy(Number.isInteger);
        });

        it('should change notification type to a 2', () => {
            const expectedDeveloperNotification = { 
                "version":"1.0",
                "packageName":"com.some.thing",
                "eventTimeMillis": sinon.match.number,
                "subscriptionNotification":
                {
                    "version":"1.0",
                    "notificationType": null,
                    "purchaseToken":"PURCHASE_TOKEN",
                    "subscriptionId":"my.sku"
                }
            }

            const notificationType = 2;
            const newDeveloperNotification = createDeveloperNotification(notificationType);
            
            expect(newDeveloperNotification)
                .to.have.property('subscriptionNotification')
                .to.have.property('notificationType')
                .to.equal(2)
        });
    });

    describe('API routes', () => {
        it('should have /push/handle-message as the HANDLE_MESSAGE route', () => {
            const expectedRoute = '/push/handle-message';

            expect(HANDLE_MESSAGE).to.equal(expectedRoute);
        })
    })
    
});
