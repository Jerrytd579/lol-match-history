const express = require('express')
const {getMatchlistByPuuid, getSummonerByName, getMatchById, getMatchlistBySummoner} = require('./data')
const {strValid, regValid} = require('./util');
const cors = require('cors');
const { DDragon } = require('@fightmegg/riot-api');

const app = express();
const router = express.Router();
app.use(cors());

const region = "na1";
const cluster = "americas";

router.get('/puuidBySummoner/:summonerName', async (req, res) => {
    console.log("Got request: " + req.originalUrl);
    const summonerName = req.params.summonerName;
    if (!strValid(summonerName)) return res.status(400).json({error: "Invalid summoner name"});
    // if (!regValid(region)) return res.status(400).json({error: "Invalid region"});
    try {
        const result = await getSummonerByName(summonerName, region);
        if (!result.puuid) return res.status(500).json({error: "PUUID missing"});
        return res.json({puuid: result.puuid});
    } catch (e) {
        return res.status(400).json({error: e});
    }
});

router.get('/matchlistByPuuid/:puuid', async (req, res) => {
    console.log("Got request: " + req.originalUrl);
    const puuid = req.params.puuid;
    if (!strValid(puuid)) 
        return res.status(400)
            .json({error: 'no puuid given'});

    try {
        const matchIdList  = await getMatchlistByPuuid(puuid, cluster);
        const result = [];
 
        for (const matchId of matchIdList) {
            // request full match details
            try {
                const match = await getMatchById(matchId);
                result.push(match);
            } catch (e) {
                if (e.response && e.response.status === 429) console.log("rate limited");
                return res.status(e.response ? e.response.status: 500).json(
                    {error: "unable to retrieve match id " + matchId}
                );
            }
        }
        return res.json({data: result});
    } catch (e) {
        console.log(e);
        return res.status(e.response ? e.response.status : 500).json(
            {error: e}
        );
    }
});

router.get('/matchlistBySummoner/:summonerName', async (req, res) => {
    console.log("Got request: " + req.originalUrl);
    const summonerName = req.params.summonerName;
    if (!strValid(summonerName)) 
        return res.status(400)
            .json({error: 'no summonerName given'});

    try {
        const matchIdList  = await getMatchlistBySummoner(summonerName, region);
        const result = [];
 
        for (const matchId of matchIdList) {
            // request full match details
            try {
                const match = await getMatchById(matchId);
                result.push(match);
            } catch (e) {
                if (e.response && e.response.status === 429) console.log("rate limited");
                return res.status(e.response ? e.response.status: 500).json(
                    {error: "unable to retrieve match id " + matchId}
                );
            }
        }
        return res.json(result);
    } catch (e) {
        return res.status(e.response ? e.response.status : 500).json(
            {error: e}
        );
    }
});

router.get('/champs', async ( _ , res) => {
    const ddragon = new DDragon();
    try {
        const { data } = await ddragon.champion.all();
        return res.json(data);
    } catch (e) {
        return res.status(e.response ? e.response.status : 404).json({error: "Champion data not available"});
    }  
});

router.get('/champs/:championName', async (req,res) => {
    const championName = req.params.championName;
    const ddragon = new DDragon();
    try {
        const {data} = await ddragon.champion.byName({championName});
        return res.json(data[championName]);
    } catch (e) {
        console.log(e);
        return res.status(e.response ? e.response.status : 404).json({error: "Champion data not available"});
    }
});  

app.use(router);

app.listen(3000, () => {
    console.log("🚀 Express server up");
})