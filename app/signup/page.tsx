"use client";

import Link from "next/link";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";

import '../styles/globals.css';


export default function SignUpPage() {

    const router = useRouter();

    const [ user, setUser ] = React.useState({
        username: '',
        password: '',
    });

    const onSignUp = async () => {
        try {
            const response = await axios.post('/api/users/signup', user);
            router.push('/login');

        } catch ( error: any ) { 
            console.log("Sign up failed.", error.message);
        } 
    };

    return (
        <div>
            <h1>Sign-Up</h1>

            <form id="sign-up-form" action="">
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
                <label htmlFor="confirm-password">Re-enter Password:</label>
                <input
                        id="confirm-password"
                        type="password"
                        onChange={(e) => {
                            e.target.value === user.password ? e.target.classList.toggle('invalid') : e.target.className = 'invalid';
                        }}
                        placeholder="Re-enter your password"
                        />
                <span></span>
                <button onClick={onSignUp}>Sign Up</button>
            </form>
                
                <p id="form-link">Already a member? <Link href="/login">Log In</Link> instead.</p>
        </div>
    )
}