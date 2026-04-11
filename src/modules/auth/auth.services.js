import { AppError } from "../../errors/appError";
import { AuthError } from "../../errors/authError"
import { addRefreshToken, addUserRepo, findUserRepo, getRefreshToken,  revokeAllTokensRepo, storeNewRefreshToken } from "./auth.repositories";
import { compareHash, createAccessToken, createCryptoHash, hasher, shaHash } from "./auth.utils";
import { Forbidden } from "../../errors/forbidden";

export const verifyUserServices = async ({ username, password, confirmPassword }) => {
    try {
        if (password !== confirmPassword) {
            throw new AuthError();
        }
        const hashedPassword = await hasher(password);
        const user = await addUserRepo(username, hashedPassword);
        return { createdAt: user.created_at, username: user.username }
    } catch (err) {
        if (err.code === "23505") {
            throw new AppError('User Already Exists', 409);
        }
        throw err;
    }
}

export const loginService = async ({ username, password }) => {
    try {
        const user = await findUserRepo(username);
        if (!user) {
            console.error('User not found:', username);
            throw new AuthError();
        }
        const isValid = await compareHash(password, user.password_hash);
        if (!isValid) {
            console.error('Invalid password for user:', username);
            throw new AuthError();
        }
        const accessToken = createAccessToken(user.id);
        const refreshToken = createCryptoHash();
        const hashedRefreshToken = shaHash(refreshToken);
        await addRefreshToken({ tokenHash: hashedRefreshToken, user_id: user.id });
        return { accessToken: accessToken, refreshToken: refreshToken, created_at: user.created_at };
    } catch (err) {
        console.error('Login service error:', err);
        throw err;
    }
}

export const rotateRefreshTokenService = async (refreshToken) => {
    const user = await getRefreshToken(shaHash(refreshToken));
    try {

        if(!user){
            throw new AuthError();
        }

        if (user.revoked) {
            await revokeAllTokensRepo(user.user_id);
            throw new Forbidden();
        }

        if(new Date(user.expires_at).getTime() < Date.now()){
            throw new AuthError();
        }

        // now revoke the previous token and store the new refreshtoken then only return the tokens to the user
        const newRefreshToken = createCryptoHash();
        const newAccessToken = createAccessToken(user.user_id);
        await storeNewRefreshToken(shaHash(newRefreshToken));
        return {newAccessToken:newAccessToken,newRefreshToken:newRefreshToken,createdAt:user.created_at}

    } catch (err) {
        throw err;
    }
} 

export const logoutUserService = () =>{
   const revokeAllTokens = revokeAllTokensRepo()
}