import LocalStorageHandler from '../localStorageHandler';
import { message, responseMessages } from '../message';

const Config = require('../../../config');
const SampleJson = require(`../${Config.app.file}`);

////////////////////////////////////////////////////////////////

let maxFetch = Config.app.maxFetch || 10;
let maxItems = Config.app.maxItems || 50;

const lsh = new LocalStorageHandler(maxItems, maxFetch, Config.app.LOCALSTORAGE_KEY, SampleJson);

////////////////////////////////////////////////////////////////

describe('Manipulating with local storage data', () => {
    it(`Size of the local storage is 441`, () => {
        expect(lsh.size()).toBe(441);
    });

    it(`Retrive data from top. Num of them is: ${maxItems}`, () => {
        expect(lsh.getData().length).toBe(maxItems);
    });

    const items = 30;
    const start = lsh.size() - items;
    it(`Retrive data from the end. Start: ${start} | items returned: ${items}`, () => {
        expect(lsh.fetchDataFromIndex(start, maxItems).length).toBe(items);
    });

    jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
    const mockDate = new Date(1594232955272);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    it(`SENT msg: Add new data to the conversation`, () => {
        lsh.addData(message.send(5000, responseMessages.get()));
        expect(lsh.fetchDataFromIndex(lsh.size() - 1)).toEqual([
            { direction: 'out', id: 5000, status: 'sent', text: 'Knock! Knock!', timestamp: 1594232955272 },
        ]);
    });

    it(`RESPONSE msg: Add new data to the conversation`, () => {
        lsh.addData(message.response(5001, responseMessages.get()));
        expect(lsh.fetchDataFromIndex(-1)).toEqual([
            { direction: 'in', id: 5001, status: 'received', text: 'Knock! Knock!', timestamp: 1594232955272 },
        ]);
    });

    it(`Nume of all messages is: 443`, () => {
        expect(lsh.size()).toBe(443);
    });

    it(`Update data of the last message`, () => {
        const data = lsh.fetchDataFromIndex(-1);
        const id = data[0].id;
        lsh.updateData(id, { status: 'sent' });

        expect(lsh.fetchDataFromIndex(-1)[0]).toEqual({
            direction: 'in',
            id: 5001,
            status: 'sent',
            text: 'Knock! Knock!',
            timestamp: 1594232955272,
        });
    });
});
