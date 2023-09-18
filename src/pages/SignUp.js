import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

const SignUp = () => {

    const nav = useNavigate();
    const usernameRef = useRef();
    const password1Ref = useRef();
    const password2Ref = useRef();
    const [errorMsg, setErrorMsg] = useState('');

    async function signup() {
        const username = usernameRef.current.value;
        const password1 = password1Ref.current.value;
        const password2 = password2Ref.current.value;

        if (username === '') {
            setErrorMsg('Enter Username');
            return;
        }
        if (password1 === '') {
            setErrorMsg('Enter Password');
            return;
        }
        if (password1 !== password2) {
            setErrorMsg('Passwords do not match');
            return;
        }

        const userData = {
            username: usernameRef.current.value,
            password: password1Ref.current.value,
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userData)
        }
        try {
            const res = await fetch("http://localhost:8080/signup", options);
            const data = await res.json();
            if (data.error) {
                setErrorMsg(data.message);
            } else {
                nav("/login");
            }
        } catch (err) {
            setErrorMsg('Server Error');
        }
    }

    return (
        <div className="container">
            <div className="form">
                <input type="text" ref={usernameRef} placeholder="Username"/>
                <input type="password" ref={password1Ref} placeholder="Password"/>
                <input type="password" ref={password2Ref} placeholder="Repeat your password"/>
                <b className="text-center text-red">{errorMsg}</b>
                <button onClick={signup}>Sign Up</button>
            </div>
        </div>
    );
};

export default SignUp;