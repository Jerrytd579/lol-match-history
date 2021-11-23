const { RiotAPI, PlatformId} = require('@fightmegg/riot-api')
const {strValid, regValid} = require('./util')
const {apikey} = require('./config.json')

let getSummonerByName = async (summonerName, region) => {
    if (!strValid(summonerName) || !regValid(region))  
        throw TypeError("Invalid name or region");

    const rAPI = new RiotAPI(apikey);

    try {
        const summoner = await rAPI.summoner.getBySummonerName({
            region: region,
            summonerName: summonerName 
        });
        return summoner;
    } catch (e) { return e;}
}

let getMatchlistByAccount = async (puuid, cluster) => {
    if (!strValid(puuid) || !regValid(cluster))
        throw TypeError(`Invalid/missing region or account ID: (${puuid}, ${cluster})`);
    const rAPI = new RiotAPI(apikey);
    try {
        const matchList = await rAPI.matchV5.getIdsbyPuuid({
            puuid,
            cluster});
        return matchList;
    } catch (e) { return e; }
}

// wraps around the above two functions
let getMatchlistBySummoner = async (summonerName, region) => {
    if (!strValid(summonerName) || !regValid(region))
        throw TypeError(`Invalid summoner name or region: (${summonerName}, ${region}))`);
    
    const summoner = await getSummonerByName(summonerName, region);
    const matchList = await getMatchlistByAccount(summoner.puuid, PlatformId.AMERICAS);

    return matchList;
}

module.exports = {
    getSummonerByName,
    getMatchlistByAccount,
    getMatchlistBySummoner
}
