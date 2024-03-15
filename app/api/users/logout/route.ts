import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '../../../../helper/getDataFromToken';
import connect from '../../../../lib/db.config';
import User from '../../../models/user';

connect();

export async function POST ( request: NextRequest ) {

    try {
    const username = getDataFromToken(request);

    await User.findOneAndUpdate({ username }, { verifyTokenExpiry: new Date(0) });

    const response = NextResponse.json({
        message: "Log out successful",
        success: true,
    })

    response.cookies.set("token", "");

    return response;

} catch (err) {
    
    return NextResponse.json({
        error: err,
        message: "Failed to log out"
    })
}

}