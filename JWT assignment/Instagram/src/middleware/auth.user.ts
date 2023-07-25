import Joi from 'joi';

import jwt from "jsonwebtoken";



const key = 'secretKey';

export class Verify {
    static async verify_token(token) {
        // const token = req.headers.authorization;
        console.log(token);
        if (token) {
            const decoded = jwt.verify(token, key);
            return decoded;
        }
        else {
            return false;
        }
    }

    static verify_login_details = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(30).required()
    });

}