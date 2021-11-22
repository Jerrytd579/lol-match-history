const { RiotAPI, PlatformId} = require('@fightmegg/riot-api')
const {strValid, regValid} = require('./util')
const {apikey} = require('./config.json')
const {axios} = require('axios')

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

    if (!summoner) throw Error("Summoner not found")
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

module.exports = {
    getSummonerByName,
    getMatchlistByAccount
}
