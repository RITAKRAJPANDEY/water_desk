import { AppError } from "../../errors/appError";
import { AuthError } from "../../errors/authError"
import { addRefreshToken, addUserRepo, findUserRepo } from "./auth.repositories";
import { compareHash, createAccessToken, createCryptoHash, hasher } from "./auth.utils";
import { Forbidden } from "../../errors/forbidden";

export const verifyUserServices = async ({ username, password, confirmPassword }) => {
    try {
        if (password !== confirmPassword) {
            throw new AuthError();
        }
        const hashedPassword = hasher(password);
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
            throw new AuthError();
        }
        const isValid = await compareHash(password, user.password_hash);
        if (!isValid) {
            throw new AuthError();
        }
        const accessToken = createAccessToken(user.id);
        const refreshToken = createCryptoHash();
        const hashedRefreshToken = hasher(refreshToken);
        await addRefreshToken({ tokenHash: hashedRefreshToken, user_id: user.id });
        return { accessToken: accessToken, refreshToken: refreshToken, created_at: user.created_at };
    } catch (err) {
        throw err;
    }
}

export const rotateRefreshToken = async (refreshToken) => {
    const user = await fetchRefreshToken(refreshToken);
    try {
        if(!user){
            throw new AuthError();
        }
        if (user.revoked) {
            await revokealluserrepo(user.id);
            throw new Forbidden();
        }
        if(new Date(user.expires_at).getTime() < Date.now()){
            throw new AuthError();
        }
        const newRefreshToken = createCryptoHash();
        const newAccessToken = createAccessToken(user.user_id);
        await storeRefreshToken(hasher(newRefreshToken));
        return {newAccessToken:newAccessToken,newRefreshToken:newRefreshToken,createdAt:user.created_at}

    } catch (err) {
        throw err;
    }
} 