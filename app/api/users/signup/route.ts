import connect from '../../../../lib/db.config';
import User from '../../../models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {

    try {

        const reqBody = await request.json();
        const { username, password } = reqBody;

        const user = await User.findOne({ username });

        if (user) {
            return NextResponse.json({ error: "A user already exists with this username" }, { status: 400 });
        }

        // password hashing with bcryptjs
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
            isAdmin: username === 'ericm2009' ? true : false,
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        }, { status: 301 })
        
    } catch (error: any) {

        return NextResponse.json({ error: error.message }, { status: 500 });

    }
};