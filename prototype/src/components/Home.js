import React from 'react';
import logo from './lollogo-192x192.png'
import SummonerSearch from "./SummonerSearch"

const Home = () => {
    return (<div className="home">
        <img className="logo" src={logo} alt="logo"/>
        <SummonerSearch />
        <div class="Description">
            <h2>What is this?</h2>
            <p>Welcome to the League of Legends Match Analyzer! Simply enter your League of Legends summoner name 
                to view your recent matches and our evaluation of your performance.
            </p>
        </div>
    </div>);
};

export default Home;