const { RiotAPI, RiotAPITypes, PlatformId } = require("@fightmegg/riot-api");
const {APIKEY} = require('./secret.json');
const RGAPIKEY = APIKEY;

const name = "P1zzasniper";
//const name = ";oaij;foij;";

(async () => {
    const rAPI = new RiotAPI(RGAPIKEY);

    const summoner = await rAPI.summoner.getBySummonerName({
        region: PlatformId.NA1,
        summonerName: name,
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
