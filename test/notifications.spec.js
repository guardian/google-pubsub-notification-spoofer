const { expect } = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const { sendMessageNotification } = require('../services/notifications');

describe('notification service', () => {
    let sandbox;
    let server;
    
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        server = sandbox.useFakeServer();
    });

    afterEach(() => {
        server.restore();
        sandbox.restore();
    });

    it('should return status of 204 on success', (done) => {
        const stubResponse = { data: 'this is the data', status: 204};
        const expectedStatus = 204;

        // sandbox.stub(axios, 'post').resolves([200]);
        sinon.stub(axios, 'post').resolves(Promise.resolve(stubResponse));
        sendMessageNotification()
            .then((status) => {
                expect(status).to.equal(expectedStatus);
            })
            .then(done, done);
    });

    it('should return status of 404 on page not found', (done) => {
        const stubResponse = { data: 'this is the data', status: 204};
        const expectedStatus = 404;

        // sandbox.stub(axios, 'post').resolves([200]);
        sinon.stub(axios, 'post').resolves(Promise.reject(stubResponse));
        sendMessageNotification()
            .then((status) => {
                expect(status).to.equal(expectedStatus);
            })
            .then(done, done);
    });
});
