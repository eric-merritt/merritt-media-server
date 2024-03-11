"use client";

import Link from "next/link";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";


export default function SignUpPage() {

    const router = useRouter();
    const [ loading, setLoading ] = React.useState(false);

    const [ user, setUser ] = React.useState({
        username: '',
        password: '',
    });

    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);

            if (response) {
                router.push('/videos');
            };

        } catch ( error: any ) { 
            console.log("Login failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Loading..." : "Sign-Up"}</h1>
            <hr />

            <label htmlFor="username">Username: 
                <input
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="Enter your desired username"
                    />
            </label>
            <label htmlFor="password">Password: 
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="Enter your desired password"
                    />
            </label>
            <button
                onClick={onSignUp}
                >Sign Up
            </button>
            <hr />
                <p>Already a member? <Link href="/login">Log In</Link> instead.</p>
        </div>
    )
}