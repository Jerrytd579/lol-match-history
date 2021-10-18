const { RiotAPI, RiotAPITypes, PlatformId } = require("@fightmegg/riot-api");
const {APIKEY} = require('./secret.json')
const RGAPIKEY = APIKEY;


(async () => {
    const rAPI = new RiotAPI(RGAPIKEY);

    const summoner = await rAPI.summoner.getBySummonerName({
        region: PlatformId.NA1,
        summonerName: "Jerrytd579",
      });

    console.log(summoner);


    const championMastery = await rAPI.championMastery.getMasteryScore({
        region: PlatformId.NA1,
        summonerId: summoner.id
        }
    )

    console.log(championMastery);

    const rank = await rAPI.league.getEntriesBySummonerId({
        region: PlatformId.NA1,
        summonerId: summoner.id
    })
    console.log(rank);
})();
