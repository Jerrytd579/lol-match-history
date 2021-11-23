import React, { useState, useHistory } from 'react';
import {withRouter} from 'react-router-dom'
const {getMatchlistBySummoner} = require('../data')

const SummonerSearch = async () => {

    let history = useHistory();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const matchIds = await getMatchlistBySummoner(evt.target.value);
            // redirect to matchlist
            history.push({
                pathname: '/matchList',
                state: {matchIds}
            });
        } catch (e) {
            console.log(e);
        }
    };
    
    return (
        <div id="summonerSearch">
            <form onSubmit={handleSubmit}>
                <label>
                    Summoner name
                    <input type="text" value="Summoner name..."/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

const Home = () => {
    return <div className="home">
        <SummonerSearch />
    </div>;
};

export default Home;