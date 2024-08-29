// import { Show, createEffect, createSignal } from "solid-js";
import "./App.css";
import { superTokensInit } from "./config/supertokens";
import Session from "supertokens-web-js/recipe/session";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Dashboard() {
    const navigate = useNavigate();
    superTokensInit();

    const [loading, setLoading] = useState(true);

    const getSessionInfo = async () => {
        const response = await fetch("http://localhost:3001/sessioninfo", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();

        alert(JSON.stringify(data));
    };

    async function signOut() {
        await Session.signOut();
        navigate("/");
    }

    useEffect(() => {
        (async () => {
            if (await Session.doesSessionExist()) {
                setLoading(false);
            } else {
                navigate("/");
            }
        })();
    }, []);

    return (
        <div className="wrapper">
            <div className="form-wrap">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <button onClick={getSessionInfo}>Session Info</button>
                        <button onClick={signOut}>Sign Out</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
