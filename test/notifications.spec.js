const { expect } = require('chai');
const sinon = require('sinon');
const { createPubSubMessage } = require('../services/notifications');

describe('Notification service', () => {
    const mockNow = new Date('1995-12-17T03:24:00');
    const mockNowEpoch = mockNow.getTime().toString();

    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(mockNow);
    });

    afterEach(() => {
        clock.restore();
    });

    describe('createPubSubMessage', () => {
        it('should include timestamps and base64 encoded developerNotification', () => {
            const sku = "my.sku";
            const notificationType = "2";

            const expectedDeveloperNotification = {
                version: "1.0",
                packageName: "com.some.thing",
                eventTimeMillis: mockNowEpoch,
                subscriptionNotification: {
                    version: "1.0",
                    notificationType: 2,
                    purchaseToken: "PURCHASE_TOKEN",
                    subscriptionId: sku
                }
            };

            const expectedMessage = {
                subscription: "subscription",
                message: {
                    messageId: "randomstring",
                    publishTime: mockNowEpoch,
                    data: Buffer.from(JSON.stringify(expectedDeveloperNotification)).toString("base64")
                }
            };
            const message = createPubSubMessage(sku, notificationType);

            expect(message)
                .to.deep.equal(expectedMessage);
        });
    });
});
