const {getMatchlistByAccount, getSummonerByName} = require('./data')
const {PlatformId} = require('@fightmegg/riot-api')

const test = async () => {
    const SUMMONER_NAME = "ALLRIVENNOBRAIN";
    let summonerObj;

    try {
        summonerObj = await getSummonerByName('ALLRIVENNOBRAIN', PlatformId.NA1);
    } catch (e) {console.error("Failed to retrieve summoner"); return {error:e}}
    console.log(`Summoner retrieved; ID: ${summonerObj.id}`);

    let matchList;    
    try {matchList = await getMatchlistByAccount(summonerObj.puuid,
        PlatformId.AMERICAS)}
    catch (e) {console.error("Failed to retrieve matchlist"); return {error:e}}
    console.log(`Matchlist retrieved; ${matchList.length} items`);

    return {summonerObj,
        matchList};
}

module.exports = {
    test
}