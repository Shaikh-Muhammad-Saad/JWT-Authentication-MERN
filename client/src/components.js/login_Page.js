import axios from "axios";
import { useState } from "react";


const LogIn_Page = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const login = async () => {
        const data = { email, password };
        console.log(data);
        try {
            const res = await axios.post("/login", data);
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    };

    const get = async () => {
        try {
            const res = await axios.get("/posts");
            console.log(res);
            // console.log(document.cookie);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <center>
                <h1>
                    User LOGIN Page
                </h1>
                <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter E-mail" />
                <br />
                <br />
                <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                <br />
                <br />
                <button onClick={login}>Login </button>
                <button onClick={get}>get cookie </button>
            </center>


        </>
    );

};

export default LogIn_Page;