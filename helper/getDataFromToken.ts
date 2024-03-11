import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest ) => {

    try {

        // Retrieve token from cookies
        const token = request.cookies.get("token")?.value || '';

        // Verify and decode the token using the secret key
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        // Return username from decoded token
        return decodedToken.username;

    } catch (error: any) {
        throw new Error(error.message);
    }
}