/**
 * users.js
 * 
 * Gathers the relevant summoner data that we need for player profiles using the riot API
 * 
 */

const { RiotAPI, RiotAPITypes, PlatformId } = require("@fightmegg/riot-api");
const {APIKEY} = require('../secret.json');
const RGAPIKEY = APIKEY;

async function setRegion(regionString){
    let region;

    if(typeof(regionString) != string)
        throw `Error: region string ${regionString} is not type string`
    
    regionString = regionString.toLowerCase();
    regionString = regionString.trim();

    if(regionString === 'brazil' || regionString === 'br')
        region = PlatformId.BR1;
    else if(regionString === 'eune' || regionSTring === 'eu nordic and east')
        region = PlatformId.EUNE1
    else if(regionString === 'euw' || regionString === 'eu west')
        region = PlatformId.EUNE1;
    else if(regionString === 'jp' || regionString === 'japan')
        region = PlatformId.JP1;
    else if(regionString === 'kr' || regionString === 'korea')
        region = PlatformId.KR;
    else if(regionString === 'la1' || regionString === 'latin america north')
        region = PlatformId.LA1;
    else if(regionString === 'la2' || regionString === 'latin america south')
        region = PlatformId.LA2;
    else if(regionString === 'na' || regionString === 'north america')
        region = PlatformId.NA1;
    else if(regionString === 'oce' || regionString === 'oceania')
        region = PlatformId.OC1;
    else if(regionString === 'ru' || regionString === 'russia')
        region = PlatformId.RU;
    else if(regionSTring === 'tr' || regionString === 'turkey')
        region = PlatformId.TR1;
    else{
        throw `Error: region string ${regionString} not valid.`;
    }

    return region;
}

async function getUserBySummonerName(summonerName, regionString){
    // Uses the riot API to return a user object with info that we will actually be using
    const rAPI = new RiotAPI(RGAPIKEY);
    let summonerRegion = setRegion(regionString);

    const summoner = await rAPI.summoner.getBySummonerName({
        region: summonerRegion,
        summonerName: summonerName,
    });

    const summoner_champ_mastery = await rAPI.championMastery.getAllChampions({
        region: summonerRegion,

    })

    return summoner;
}

module.exports = {
    getUserBySummonerName
}