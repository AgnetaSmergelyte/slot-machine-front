import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeMoney} from "../features/user";

const Play = () => {

    const dispatch = useDispatch();
    const money = useSelector(state => state.money);
    const [selectedSum, setSelectedSum] = useState(5);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [slot1, setSlot1] = useState('seven');
    const [slot2, setSlot2] = useState('seven');
    const [slot3, setSlot3] = useState('seven');
    const [spinning, setSpinning] = useState(false);

    function roll() {
        if (money - selectedSum < 0) {
            setError('Not enough money');
            return;
        } else {
            setSpinning(true);
            setError('');
            setSuccess('');
        }

        let token = sessionStorage.getItem("token");
        const options = {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": token
            }
        }
        fetch("http://localhost:8080/roll/" + selectedSum, options)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    dispatch(changeMoney(money-selectedSum));
                    setSlot1('spinning');
                    setTimeout(() => {
                        setSlot2('spinning');
                    }, 200);
                    setTimeout(() => {
                        setSlot3('spinning');
                    }, 400);
                    setTimeout(() => {
                        setSlot3('spinning');
                    }, 600);
                    setTimeout(() => {
                        setSlot1(data.data.slots[0]);
                    }, 1000);
                    setTimeout(() => {
                        setSlot2(data.data.slots[1]);
                    }, 2000);
                    setTimeout(() => {
                        setSlot3(data.data.slots[2]);
                        if (data.data.win) setSuccess(`Won ${data.data.winnings}€ !!!`);
                        dispatch(changeMoney(Number(data.data.payback)));
                        setSpinning(false);
                    }, 3000);
                } else {
                    setError(data.message);
                }
            })
            .catch(error => setError('Server error'))
    }

    return (
        <div className="container">
            <h1>Money: {money}€</h1>
            <h2 className="text-green">{success}</h2>
            <div className="slots">
                <div className={slot1}></div>
                <div className={slot2}></div>
                <div className={slot3}></div>
            </div>
            <h2>Bid:</h2>
            <div className="d-flex g10">
                <button className={selectedSum === 1 ? "btn-number selected" : "btn-number"} onClick={() => setSelectedSum(1)}>1€</button>
                <button className={selectedSum === 5 ? "btn-number selected" : "btn-number"} onClick={() => setSelectedSum(5)}>5€</button>
                <button className={selectedSum === 10 ? "btn-number selected" : "btn-number"} onClick={() => setSelectedSum(10)}>10€</button>
            </div>
            <button className="btn-big" onClick={!spinning ? () => roll() : null}>ROLL</button>
            <b className="text-red">{error}</b>
        </div>
    );
};

export default Play;