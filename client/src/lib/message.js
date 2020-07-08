const stat = {};
stat.RECEIVED = 'received';
stat.READ = 'read';
stat.SENT = 'sent';

const dir = {};
dir.IN = 'in';
dir.OUT = 'out';

export const message = (() => {
    const msg = (id = 1, text = '', direction = dir.OUT, status = stat.SENT) => ({
        id: id,
        direction: direction,
        status: status,
        timestamp: new Date().getTime(),
        text: text,
    });

    const send = (id, text) => {
        return msg(id, text);
    };

    const response = (id, text) => {
        return msg(id, text, 'in', 'received');
    };

    return {
        send: send,
        response: response,
    };
})();

message.status = stat;
message.direction = dir;

export const responseMessages = (() => {
    const text = [
        'I invented a new word!',
        'Why do we tell actors to “break a leg?”',
        'Helvetica and Times New Roman walk into a bar.',
        'Get out of here!” shouts the bartender. "We don’t serve your type."',
        'Knock! Knock!',
        'Who is there?',
        'Control Freak.',
        'I ate a clock yesterday, it was very time-consuming.',
        'He got twelve months.',
        'A fire hydrant has H-2-O on the inside and K-9-P on the outside.',
    ];

    return {
        get: () => text[(Math.random() * text.length) | 0],
    };
})();
