const { RiotAPI, PlatformId} = require('@fightmegg/riot-api')
const {strValid, regValid} = require('./util')
const {apikey} = require('./config.json')

let getSummonerByName = async (summonerName, region=PlatformId.NA1) => {
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
};

let getMatchlistByPuuid = async (puuid, cluster) => {
    if (!strValid(puuid) || !regValid(cluster))
        throw TypeError(`Invalid puuid or region: (${puuid}, ${cluster}))`);
    
    const rAPI = new RiotAPI(apikey);
    try {
        const matchList = await rAPI.matchV5.getIdsbyPuuid({
            puuid,
            cluster});
        return matchList;
    } catch (e) { console.log(e) };
};

let getMatchlistBySummoner = async (summonerName, region) => {
    if (!strValid(summonerName) || !regValid(region))
        throw TypeError(`Invalid summoner name or region: (${summonerName}, ${region}))`);
    
    const rAPI = new RiotAPI(apikey);
    try {
        const summoner = await rAPI.summoner.getBySummonerName({
            summonerName,
            region});

        const puuid = summoner.puuid;
        try {
            const matches = rAPI.matchV5.getIdsbyPuuid({
                cluster: deduceCluster(region),
                puuid
            });
            return matches;
        } catch (e) {
            console.log(e);
        }
    } catch (e) { console.log(e) };

    return matchList;
};

let matchlistToMatchDTO = async (matchList) => {
    if (!matchList || !Array.isArray(matchList) || matchList.length === 0)
        throw TypeError("Invalid matchlist");

    const rAPI = new RiotAPI(apikey);
    const result = [];

    for (const matchId of matchList) {
        if (!strValid(matchId)) throw TypeError("Invalid match ID");
        const regionStr = matchId.substring(0, matchId.indexOf('_'));
        const cluster = deduceCluster(regionStr);
        try {
            const match = await rAPI.matchV5.getMatchById({cluster, matchId});
            result.push(match);
        } catch (e) {
            console.log("Failed to get match " + matchId);
            console.log(e);
        }
    }
    return result;
}

let deduceCluster = regionPrefix => {
    switch (regionPrefix.toUpperCase()) {
        case 'NA1':
        case 'LA1':
        case 'LA2':
        case 'BR1':
            return PlatformId.AMERICAS;
        case 'EUW1':
        case 'EUN1':
        case 'RU':
        case 'TR1':
            return PlatformId.EUROPE;
        case 'KR':
        case 'JP':
            return PlatformId.ASIA;
        default:
            throw TypeError("match ID did not match known platform id");
    }
};

let getMatchById = async (matchId) => {
    if (!strValid(matchId)) 
        throw TypeError("Invalid match ID");

    const rAPI = new RiotAPI(apikey);
    try {
        const match = await rAPI.matchV5.getMatchById({
            cluster: deduceCluster(matchId.substring(0, matchId.indexOf('_'))),
            matchId});
        return match;
    } catch (e) {
        throw Error("Request failed: " + JSON.stringify(e));
    }
};

module.exports = {
    getSummonerByName,
    getMatchlistByPuuid,
    getMatchlistBySummoner,
    getMatchById,
    matchlistToMatchDTO,
    deduceCluster
}
