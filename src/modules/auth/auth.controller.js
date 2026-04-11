import { NextResponse } from "next/server";
import { loginService, rotateRefreshTokenService, verifyUserServices } from "./auth.services"
import { cookies } from "next/headers";

export const verifyUserController = async (data) => {
    try {
        const user = await verifyUserServices(data);
        return NextResponse.json({
            success: true,
            username: user.username,
            createdAt: user.createdAt
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const loginController = async (data) => {
    const user = await loginService(data);
    const cookieStore = await cookies();

    cookieStore.set('refreshToken', user.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 32
    });
    cookieStore.set('accessToken', user.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 16 //  
    })

    return NextResponse.json({
        success: true,
        createdAt: user.created_at
    });
}

export const rotateRefreshTokenController = async (refreshToken) => {
    try{
    const user = await rotateRefreshTokenService(refreshToken);
    const cookieStore = await cookies();
    cookieStore.set('accessToken', user.newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 16,
    });
    cookieStore.set('refreshToken', user.newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 32
    })
    return NextResponse.json({
        success: true,
        createdAt: user.createdAt
    });
}catch(err){
    console.error(err);
    return NextResponse.json({
        success:false,
        message:'unable to rotate token'
    });
}
}

export const logoutController = async () => {
    await logoutUserService();
    return NextResponse.json({
        success: true,
        message: "logged out successfully"
    });
}