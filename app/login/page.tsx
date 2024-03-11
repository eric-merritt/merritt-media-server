"use client";

import Link from "next/link";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";


export default function LoginPage() {

    const router = useRouter();
    const [ loading, setLoading ] = React.useState(false);

    const [ user, setUser ] = React.useState({
        username: '',
        password: '',
    });

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);

            if (response) {
                router.push('/');
            };

        } catch ( error: any ) { 
            console.log("Login failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />

            <label htmlFor="username">Username: 
                <input
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="Enter your username"
                    />
            </label>
            <label htmlFor="password">Password: 
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="Enter your password"
                    />
            </label>
            <button
                onClick={onLogin}
                >Log In
            </button>
            <hr />
            <p>Not a member yet? <Link href="/signup">Sign Up</Link> now.</p>
        </div>
    )
}