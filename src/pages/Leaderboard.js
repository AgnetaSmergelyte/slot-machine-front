import React, {useEffect, useState} from 'react';

const Leaderboard = () => {

    const [users, setUsers] = useState([]);
    const [activeTable, setActiveTable] = useState(1);

    useEffect(() => {
        getPlayersByMostMoney();
    }, [])

    async function getPlayersByMostMoney() {
        try {
            const res = await fetch("http://localhost:8080/mostMoney");
            const data = await res.json();
            setUsers(data.data);
            setActiveTable(1);
        } catch (error) {
            console.log('Server error')
        }
    }

    async function getPlayersByLostMoney() {
        try {
            const res = await fetch("http://localhost:8080/mostLost");
            const data = await res.json();
            setUsers(data.data);
            setActiveTable(2);
        } catch (error) {
            console.log('Server error')
        }
    }

    return (
        <div className="container">
            <h1>LEADERBOARD</h1>
            <div className="leaderboard">
                <div className="leaderboard-table-headers">
                    <div onClick={getPlayersByMostMoney} className={activeTable === 1 ? "active-table" : "inactive-table"}>HAVE MOST MONEY</div>
                    <div onClick={getPlayersByLostMoney} className={activeTable === 2 ? "active-table" : "inactive-table"}>LOST MOST MONEY</div>
                </div>
                <div>
                    {users.map((x, i) =>
                        <div key={i} className="leaderboard-table-row">
                            <div>{x.username}</div>
                            <div>Games: {x.games}</div>
                            <div>{x.money}€</div>
                        </div>)}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;