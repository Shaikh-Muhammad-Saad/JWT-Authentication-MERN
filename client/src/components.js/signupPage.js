import axios from "axios";
import { useState } from "react";

const SignUp_Page = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [user_name, setUser_name] = useState();

    const send_Data = async () => {
        const data = {email, password, user_name};
        try{
            const res =  await axios.post("/register", data);
            console.log(res)
        }catch(error){
            console.log(error);
        }
    };
    return (
        <>
            <center>
                <h1>
                    User SIGNUP Page
                </h1>
                <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter E-mail" />
                <br />
                <br />
                <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                <br />
                <br />
                <input type="text" onChange={(e) => setUser_name(e.target.value)} placeholder="Enter User Name" />
                <br />
                <br />
                <button onClick={send_Data}>Register User</button>
            </center>


        </>
    );

};

export default SignUp_Page;