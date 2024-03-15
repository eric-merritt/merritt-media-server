"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Page() {
  
  const router = useRouter();

  const onLogout = async () => {

    try {
      await axios.post('/api/users/logout');
      router.push('/login');
    } catch (err) {
      console.log(err);
    }
  } 

  return (
    <>
    <h1>Videos Page</h1> <ul><li><p><button onClick={onLogout}>Log-Out</button></p></li></ul>
    <div id="video-content" className="grid grid-cols-3 grid-rows-3">
      <div className="videoContent"></div>
      <div className="videoContent"></div>
      <div className="videoContent"></div>
      <div className="videoContent"></div>
      <div className="videoContent"></div>
      <div className="videoContent"></div>
      <div className="videoContent"></div>
      <div className="videoContent"></div>
      <div className="videoContent"></div>
    </div>
    </>
  );

};