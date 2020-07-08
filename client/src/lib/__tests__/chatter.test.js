import _Chatter from '../chatter';

describe('Number of unread messages', () => {
    const num = 41;
    it(`At start it is ${num} unread messages`, () => {
        expect(_Chatter.unreadMessages().count).toBe(num);
    });

    it(`fetches next 10 messages`, () => {
        let msgs = _Chatter.fetch();
        expect(msgs[0].id).toBe(11);
        msgs = _Chatter.fetch();
        expect(msgs[0].id).toBe(21);
        msgs = _Chatter.fetch();
        expect(msgs[0].id).toBe(31);
    });

    it(`fetches top 10 messages`, () => {
        let msgs = _Chatter.fetchTop();
        expect(msgs[0].id).toBe(21);
    });

    it(`fetches start of unread messages`, () => {
        let msgs = _Chatter.fetchStartOfUnreadMessages();
        expect(msgs[msgs.length - 1].id).toBe(400);
    });

    it(`fetches the end of messages`, () => {
        let msgs = _Chatter.fetchTheEndOfMessages();
        expect(msgs[msgs.length - 1].id).toBe(441);
    });

    it(`send message, through callback function get list of messages`, () => {
        let list = [];
        _Chatter.sendMessage('Jest is manipulating App :)', (l) => (list = l));
        expect(list.length).not.toBe(0);
        expect(list[list.length - 1].text).toBe('Jest is manipulating App :)');
    });

    it(`send message, through callback function get list of messages`, () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
        _Chatter.responseMessage();
        let msgs = _Chatter.fetchTheEndOfMessages();
        expect(msgs[msgs.length - 1].text).toBe('Knock! Knock!');
    });

    it(`fetches number of unread messages: 1`, () => {
        expect(_Chatter.unreadMessages().count).toBe(1);
    });

    it(`update 'direction, status' of the second last message to 'in, received', now unread messages is: 43`, () => {
        let msgs = _Chatter.fetchTheEndOfMessages();
        _Chatter.updateMessage(msgs[msgs.length - 2].id, { direction: 'in', status: 'received' });
        expect(_Chatter.unreadMessages().count).toBe(43);
    });
});
