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
                {username && <b>Prisijungęs kaip: <em>{username}</em></b>}
                <div className="d-flex g10">
                    {!username && <NavLink className="menu-item" to="/register">Registruotis</NavLink>}
                    {!username && <NavLink className="menu-item" to="/login">Prisijungti</NavLink>}
                </div>
                {username && <button onClick={logout}>Atsijungti</button>}
            </div>
        </div>
    );
};

export default Toolbar;