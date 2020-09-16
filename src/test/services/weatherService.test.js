import { getWeatherInfoForCity } from '../../api/services/weatherService';
import { assert, expect } from 'chai';
import NoRecordsError from '../../api/errors/NoRecordsError'

const weatherMockDAO = {
    findWeatherInfoByCity: async (city) => {
        if (!city) return null;
        return {
            'today': 10,
            'yesterday': 10,
            'week-average': 10
        };
    }
};

describe('Testing weather servce:', () => {
    it('it should return correct weather info', async () => {
        const info = await getWeatherInfoForCity("test", weatherMockDAO);
        expect(info).to.have.property('today');
        expect(info).to.have.property('yesterday');
        expect(info).to.have.property('week-average');
    })
    it('it should fail because city is undefined', async () => {
        try {
            await getWeatherInfoForCity(null, weatherMockDAO); //suppose here we are passing city that do not exit
            assert(false);
        } catch (error) {
            expect(error instanceof NoRecordsError).to.eq(true);
        }
    })
})
