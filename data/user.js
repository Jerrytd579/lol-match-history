const { RiotAPI, RiotAPITypes, PlatformId } = require("@fightmegg/riot-api");
const {APIKEY} = require('../secret.json');
const RGAPIKEY = APIKEY;

async function getUserBySummonerName(summonerName){
    const rAPI = new RiotAPI(RGAPIKEY);

    const summoner = await rAPI.summoner.getBySummonerName({
        region: PlatformId.NA1,
        summonerName: summonerName,
    });

    return summoner;
}