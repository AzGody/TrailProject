// @ts-nocheck - may need to be at the start of file
import jwt_decode from "jwt-decode";

export const isAdmin = () => {
    const token = sessionStorage.getItem("JWT");

    if (token !== null) {
        const tokenPayload = jwt_decode(token);

        if (tokenPayload.roles.includes("ROLE_ADMIN")) {
            return true;
        }
    }

    return false;
}