import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SummonerSearch = () => {
    let navigate = useNavigate();
    let [summonerName, setSummonerName] = useState("");
    let [error, setError] = useState(false);

    const handleSubmit = async (evt) => {
        setError(false);
        evt.preventDefault();
        if (summonerName.replace(/ +/, '') === '' || summonerName.length > 16) {
            setError(true);
            return;
        } else navigate(`/matchList/${summonerName}`);
    };
    
    return (
        <div className="Summoner-search">
            
            <form onChange={e => 
                {
                    setSummonerName(e.target.value);
                }}
            onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Summoner name <br/>
                    <input className={error ? "error" : ""} type="text" id="summonerName"/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default SummonerSearch;