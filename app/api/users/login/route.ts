import connect from '../../../../lib/db.config';
import User from '../../../models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

  // open connection to mongodb
        connect();

export async function POST (request: NextRequest) {

    try {

      
        
        const reqBody = await request.json();
        const { username, password } = reqBody;

        // check database for user
        const user = await User.findOne({username});

        if (!user) {
            return NextResponse.json({error: "No user with that username was found"}, { status: 400 });
        }

        // match password to saved password
        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword) {
            return NextResponse.json({error: "Invalid password"}, { status: 400 });
        }

        const tokenData = {
            username: user.username,
            userId: user._id
        };

        // create token with 24hr expiry
        const token = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!, 
            { 
                expiresIn: '1d'
            });            
       

        // create JSON response for successful login
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch ( error: any ) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } 
}

