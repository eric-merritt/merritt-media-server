"use client";

import Link from "next/link";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";


export default function LoginPage() {

    const [ loading, setLoading ] = React.useState(false);

    const [ user, setUser ] = React.useState({
        username: '',
        password: '',
    });        
    
    const Router = useRouter();


    const onLogin = async () => {


        setLoading(true);

        try {
            const response = await axios.post('/api/users/login', user);
            Router.push('/');
        } catch ( error: any ) { 
            console.log("Login failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            

            <form id="login-form" action="">
                <label htmlFor="username">Username:</label>

                    <input
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        placeholder="Enter your username"
                        />
                <label htmlFor="password">Password:</label>

                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="Enter your password"
                        />
                <button
                    onClick={onLogin}
                    >Log In
                </button>
            </form>
            <p id="form-link">Not a member yet? <Link href="/signup">Sign Up</Link> now.</p>
        </div>
    )
}