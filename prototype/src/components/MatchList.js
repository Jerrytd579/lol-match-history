import React, {useEffect, useState} from 'react'
import {useParams, Link, useLocation} from 'react-router-dom'
import axios from 'axios';
import Error from "./Error"
import SummonerSearch from "./SummonerSearch"

const HOST = "http://localhost:3000"

const getStatsFor = (player, match) => { 
    if (!player || !match) throw TypeError("invalid input");
    const players = match.info.participants;
    const playerStats = players[players.findIndex( x => x.summonerName === player)];
    if (!playerStats) console.log(`PLAYER STATS UNDEFINED: ${player}, ${JSON.stringify(match)}`);
    return playerStats;
};

const MatchList = () => {
    const location = useLocation();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState({error: false, message: null,
        status: null});

    var summoner = params.summonerName;
    if (!summoner) summoner = location.pathname.split('/')[1];
    useEffect( () => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const { data } = await axios(`${HOST}/matchlistBySummoner/${summoner}`);
                setMatches(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setError({error: true,
                    message: e, 
                    status: e.response ? e.response.status : 500});
                setLoading(false);
            }
        }
        fetchData();
    }, [summoner]);

    return <div className="matchlist">
        <SummonerSearch />
        {loading && <Loading />}
        {!loading && error.error && <Error status={error.status} message={error.message}/>}
        {!error.error && !loading && matches.map(x => <MatchComponent key={x.metadata.matchId} match={x} summoner={summoner} 
            playerStats={getStatsFor(summoner, x)}/>)}
    </div>;
};


const Lobby = (props) => {
    const Player = ({name}) => 
        <td> 
            <Link to={"/matchList/" + name}>
                {name}
            </Link> 
        </td>;

    return (
        <table>
            <tbody>
            <tr>
                <Player name={props.names[0]} />
                <Player name={props.names[5]} />
            </tr>
            <tr>
                <Player name={props.names[1]} />
                <Player name={props.names[6]} />
            </tr>
            <tr>
                <Player name={props.names[2]} />
                <Player name={props.names[7]} />
            </tr><tr>
                <Player name={props.names[3]} />
                <Player name={props.names[8]} />
            </tr><tr>
                <Player name={props.names[4]} />
                <Player name={props.names[9]} />
            </tr>
            </tbody>
        </table>
    );
};

const MatchComponent = (props) => {
    const [expanded, setExpanded] = useState(false);
    const playerStats = props.playerStats; 
    const KDA = () => (
        <div className="Kda">
            <p className="Stat-counts">{`${playerStats.kills} / ${playerStats.deaths} / ${playerStats.assists}`}</p>
            <p className="Kda-ratio"> KA/D:  {playerStats.deaths > 0 ? 
                // find (K+A) / D ratio and round
                Number((playerStats.kills + playerStats.assists) / playerStats.deaths).toFixed(2) 
                // perfect KA/D if 0 deaths
                : "Perfect"}</p>
            <p className="Game-outcome">{playerStats.win ? "Victory" : "Defeat"}</p>
        </div>
    );

    const ChampImg = () => 
        <div className="Champ-img-container">
            <img className="Champ-img" src={`/champImgs/${playerStats.championName}_0.jpg`} alt={playerStats.championName}/>
            <p>{playerStats.championName}</p>
        </div>
    
    const OtherStats = () => 
        <div className="Other-stats">
            <table className="Stats-table">
                <thead>
                <tr>
                    <td>Gold earned</td>
                    <td>{playerStats.goldEarned}</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Damage dealt</td>
                    <td>{playerStats.totalDamageDealtToChampions}</td>
                </tr>
                <tr>
                    <td>Vision score</td>
                    <td>{playerStats.visionScore}</td>
                </tr>
                </tbody>
            </table>
        </div>;

    const ExpandButton = () => {
        return <button className="Details-button" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Hide" : "Show analysis"}
        </button>
    };

    if (!playerStats) return null;
    else return (<div className={`${expanded ? "Match-summary-expanded" : "Match-summary"} ${playerStats.win ? "win" : "lose"}`}>
        <KDA />
        <ChampImg />
        <OtherStats />
        <div>
            Participants:
            <Lobby className="Lobby" names={props.match.info.participants.map(x => x.summonerName)} />
        </div>
        <ExpandButton />
        {expanded && 
            <Analysis matchData={props.match.info} subject={playerStats.summonerName}/>    
        }
    </div>);
}

const Loading = () => 
    <div className="Loading">
        <img className="Load-gif" src="/loading.gif" alt="Loading..."/>
        <p>Loading, please wait...</p> 
    </div>;

const Analysis = (props) => {
    const metrics = ['totalDamageDealtToChampions',
        'damageDealtToObjectives',
        'wardsPlaced',
        'wardsKilled',
        'totalTimeCCDealt',
        'totalMinionsKilled'];

    const sorts = {
        totalDamageDealtToChampions: [],
        damageDealtToObjectives: [],
        wardsPlaced: [],
        wardsKilled: [],
        totalTimeCCDealt: [],
        totalMinionsKilled: []
    }

    const sortLists = {
        totalDamageDealtToChampions: [],
        damageDealtToObjectives: [],
        wardsPlaced: [],
        wardsKilled: [],
        totalTimeCCDealt: [],
        totalMinionsKilled: []
    }

    for (const field of metrics) {
        const participants = props.matchData.participants;
        participants.sort((a, b) => b[field] - a[field]);
        sorts[field] = participants.findIndex(x => x.summonerName === props.subject);
        sortLists[field] = participants.map(x => x.championName);
    }

    // evaluation
    const tags = [];
    
    if (sorts.totalDamageDealtToChampions < 3) 
        tags.push({
            good: true,
            info: 'High damage to players'
        });
    else if (sorts.totalDamageDealtToChampions > 6)
        tags.push({
            good: false,
            info: 'Low damage to players'
        });
    
    if (sorts.damageDealtToObjectives < 3) 
        tags.push({
            good: true,
            info: 'High damage to objectives'
        });
    else if (sorts.damageDealtToObjectives > 6)
        tags.push({
            good: false,
            info: 'Low damage to objectives'
        });
    
    if (sorts.wardsPlaced < 3) 
        tags.push({
            good: true,
            info: 'Many wards placed'
        });
    else if (sorts.wardsPlaced > 6)
        tags.push({
            good: false,
            info: 'Few wards placed'
        });
    
    if (sorts.wardsKilled < 3) 
        tags.push({
            good: true,
            info: 'Many wards cleared'
        });
    else if (sorts.wardsKilled > 6)
        tags.push({
            good: false,
            info: 'Few wards cleared'
        });

    if (sorts.totalTimeCCDealt < 3) 
        tags.push({
            good: true,
            info: 'High control of enemy'
        });
    else if (sorts.totalTimeCCDealt > 6)
        tags.push({
            good: false,
            info: 'Low control of enemy'
        });

    if (sorts.totalMinionsKilled < 3) 
        tags.push({
            good: true,
            info: 'Many minions killed'
        });
    else if (sorts.totalMinionsKilled > 6)
        tags.push({
            good: false,
            info: 'Few minions killed'
        });
    
    console.log(sortLists);

    return <div class="Analysis">
        {tags.map((x, idx) => <Tag tag={x} key={idx}/>)}
    </div>
}

const Tag = (props) => 
    <p className={props.tag.good ? "Good-tag" : "Bad-tag"}>{props.tag.info}</p>;


export default MatchList; 