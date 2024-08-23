import { Show, createEffect, createSignal } from "solid-js";
import "./App.css";
import { superTokensInit } from "./config/supertokens";
import Session from "supertokens-web-js/recipe/session";
import { useNavigate } from "@solidjs/router";

function Dashboard() {
    const navigate = useNavigate();
    superTokensInit();

    const [loading, setLoading] = createSignal(true);

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

    createEffect(async () => {
        if (await Session.doesSessionExist()) {
            setLoading(false);
        } else {
            navigate("/");
        }
    });

    return (
        <div class="wrapper">
            <div class="form-wrap">
                <Show when={loading()}>Loading...</Show>
                <Show when={!loading()}>
                    <button onClick={getSessionInfo}>Session Info</button>
                    <button onClick={signOut}>Sign Out</button>
                </Show>
            </div>
        </div>
    );
}

export default Dashboard;
