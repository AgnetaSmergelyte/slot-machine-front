import './App.css';
import Toolbar from "./components/Toolbar";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import {useEffect} from "react";
import {changeId, changeName, changeMoney} from "./features/user";
import {useDispatch} from "react-redux";
import Play from "./pages/Play";


function App() {

    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (!token) {
            const autologin = localStorage.getItem("autologin");
            if (autologin) {
                sessionStorage.setItem("token", autologin);
                token = autologin;
            } else {
                nav("/login")
                return;
            }
        }
        const options = {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": token
            }
        }
        fetch("http://localhost:8080/getUser", options)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    dispatch(changeId(data.data.id));
                    dispatch(changeName(data.data.username));
                    dispatch(changeMoney(data.data.money));
                    nav("/play")
                }
            })
            .catch(error => {})
    }, []);
  return (
      <div className="App">
          <Toolbar />
          <Routes>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<SignUp />}/>
              <Route path="/play" element={<Play />} />
          </Routes>
      </div>
  );
}

export default App;
