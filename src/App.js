import {useEffect, useState} from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import List from "./Components/List";
import "./App.css";


function App() {
    const [inputText, setInputText] = useState([]);
    const [message, setMessage] = useState("");
    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    let inputHandler = (e) => {
        //convert input text to lower case
        console.log(message)
        // const lowerCase = message.toLowerCase();
        const params = {
            question: message,
        };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            json:true,
            body: JSON.stringify( params )
        };

        fetch("/solve", options).then((res) =>
            res.json().then((data) => {
                debugger;
                const ans_list = data['list']
                setInputText(ans_list);
                console.log(data);
            })
        );

    };

    return (
        <div className="main">
            <h1>React Search</h1>
            <div className="search">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    label="Search"
                />
            </div>
            <button onClick={inputHandler}>
                Search
            </button>
            <List input={inputText} />
        </div>
    );
}

export default App;