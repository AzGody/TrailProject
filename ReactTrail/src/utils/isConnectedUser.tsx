// @ts-nocheck - may need to be at the start of file
import jwt_decode from "jwt-decode";

export const isConnectedUser = () => {
    const token = sessionStorage.getItem("JWT");

    if (token !== null) {
        const tokenPayload = jwt_decode(token);

        if (tokenPayload.roles.includes("ROLE_USER")) {
            return true;
        }
    }

    return false;
}