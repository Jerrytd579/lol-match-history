const { RiotAPI, RiotAPITypes, PlatformId } = require("@fightmegg/riot-api");
const userData = require('./data/user');

const {APIKEY} = require('./secret.json');
const RGAPIKEY = APIKEY;

const name = "jerrytd579";
//const name = ";oaij;foij;";

(async () => {
    const rAPI = new RiotAPI(RGAPIKEY);

    const summoner = await rAPI.summoner.getBySummonerName({
        region: PlatformId.NA1,
        summonerName: name,
      });
    console.log(summoner);


//     const championMastery = await rAPI.championMastery.getMasteryScore({
//         region: PlatformId.NA1,
//         summonerId: summoner.id
//         });
//    console.log(championMastery);

//     const rank = await rAPI.league.getEntriesBySummonerId({
//         region: PlatformId.NA1,
//         summonerId: summoner.id
//     })
//     console.log(rank);

//     // So apparently this chunk of code is depricated, and there's no info on that anywhere
//     // Fun!!!
//     // try{
//     // const matches = await rAPI.match.getMatchlistByAccount({
//     //     region: PlatformId.NA1,
//     //     accountId: summoner.accountId
//     // });
//     // console.log(matches);
//     // } catch(e){
//     //     await console.log(e);
//     // }

    const matchV5 = await rAPI.matchV5.getIdsbyPuuid({
        cluster: PlatformId.AMERICAS,
        puuid: summoner.puuid
    });
    console.log(matchV5);

    const match = await rAPI.matchV5.getMatchById({
        cluster: PlatformId.AMERICAS,
        matchId: matchV5[0]
    });
    console.log(match);
//      console.log(match.info.participants[8]);

    // var date = new Date(gameEndTimeStamp * 1000);
    // // Hours part from the timestamp
    // var hours = date.getHours();
    // // Minutes part from the timestamp
    // var minutes = "0" + date.getMinutes();
    // // Seconds part from the timestamp
    // var seconds = "0" + date.getSeconds();

    // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    // console.log(formattedTime);
})();
