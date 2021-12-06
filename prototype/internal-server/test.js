
const {PlatformId} = require('@fightmegg/riot-api')
const axios = require('axios')

const {matchlistToMatchDTO} = require('./data')

const SUMMONER_NAME = "ALLRIVENNOBRAIN";
const PUUID = "-IIUi6kY_O-cKGVAwxioWJ-Lq5yjM-Q3drv7HUlI0vVtP90RujhN0-4k3sU62eGQEmG5MqfWPoDcYQ";
const REGION = PlatformId.NA1;
const CLUSTER = PlatformId.AMERICAS;

const testGetMatchlistByPuuid = async () => {
    const endpt = `http://localhost:3000/matchlistByPuuid/${CLUSTER}/${PUUID}`;
    try {
        let { data } = await axios(endpt);
        return data;
    } catch (e) {
        return e;
    }
};

const MATCHLIST = ['NA1_4126788452', 'NA1_4126899957'];

const testMatchlistToMatchDTO = async () => {
    try {
        let result = await matchlistToMatchDTO(MATCHLIST);
        return result;
    } catch (e) {
        return e;
    }
}

const testPuuidBySummoner = async () => {
    const endpt = `http://localhost:3000/puuidBySummoner/${REGION}/${SUMMONER_NAME}`;
    try {
        let {data} = await axios(endpt);
        return data;
    } catch (e) {
        return e;
    }
}

const testAll = async () => {
    return {
        getMatchlistByPuuid: await testGetMatchlistByPuuid(),
        matchlistToMatchDTO: await testMatchlistToMatchDTO(),
        puuidBySummoner: await testPuuidBySummoner()
    };
}

module.exports = {
    testAll
}