import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import Error from "./Error"

const HOST = "http://localhost:3000"

const MatchList = () => {

    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState({error: false, message: null,
        status: null});

    const [summoner, setSummoner] = useState(params.summonerName);

    // if (!puuid) setError({message: "No puuid", status: 500});

    useEffect( () => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const { data } = await axios(`${HOST}/matchlistBySummoner/${summoner}`);
                setMatches(data.data);
                console.log(data.data);
            } catch (e) {
                console.log(e);
                setError({error: true,
                    message: e, 
                    status: e.response ? e.response.status : 500});
                setLoading(false);
            }
        } 
        fetchData().then(_ => setLoading(false));
    }, [summoner]);

    return <div className="matchlist">
        {loading && <p> Loading... </p>}
        {!loading && error.error && <Error status={error.status} message={error.message}/>}
        {!error.error && !loading && matches.map(x => <p>totally a match!</p>)}
    </div>;
}

export default MatchList;