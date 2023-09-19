import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeId, changeName} from "../features/user";

const Toolbar = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector(state => state.name);

    function logout() {
        localStorage.removeItem("autologin");
        sessionStorage.removeItem("token");
        dispatch(changeId(''));
        dispatch(changeName(''));
        nav("/login");
    }

    return (
        <div>
            <div className="toolbar space-btw a-center">
                {username && <b>Logged in as: <em>{username}</em></b>}
                {!username && <div className="d-flex g10">
                    <NavLink className="menu-item" to="/register">Sign Up</NavLink>
                    <NavLink className="menu-item" to="/login">Log In</NavLink>
                </div>}
                {username && <NavLink className="menu-item" to="/play">Play</NavLink>}
                {username && <NavLink className="menu-item" to="/leaderboard">Leaderboard</NavLink>}
                {username && <button onClick={logout}>Log Out</button>
            }
        </div>
</div>
)
    ;
};

export default Toolbar;