import { message, responseMessages } from '../message';

describe('Message format to send', () => {
    it(`Message OUT`, () => {
        const mockDate = new Date(1594232955272);
        const mockDateMethod = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
        expect(message.send(12, 'Message OUT')).toEqual({
            direction: 'out',
            id: 12,
            status: 'sent',
            text: 'Message OUT',
            timestamp: 1594232955272,
        });
        mockDateMethod.mockRestore();
    });

    it(`Message IN`, () => {
        const mockDate = new Date(1594232951272);
        const mockDateMethod = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
        expect(message.response(32, 'Message IN')).toEqual({
            direction: 'in',
            id: 32,
            status: 'received',
            text: 'Message IN',
            timestamp: 1594232951272,
        });
        mockDateMethod.mockRestore();
    });

    it(`Get response message`, () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        expect(responseMessages.get()).toEqual('Who is there?');
    });
});
