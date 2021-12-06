import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HOST = "http://localhost:3000";

const SummonerSearch = () => {
    let navigate = useNavigate();
    let [summonerName, setSummonerName] = useState("");

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        navigate(`/matchList/${summonerName}`);
    };

    
    return (
        <div id="summonerSearch">
            <form onChange={e => 
                {
                    setSummonerName(e.target.value);
                    console.log(summonerName);
                }}
            onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Summoner name <br/>
                    <input type="text" id="summonerName"/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

const Home = () => {
    return (<div className="home">
        <SummonerSearch />
    </div>);
};

export default Home;