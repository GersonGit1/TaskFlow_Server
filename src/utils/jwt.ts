import jwt from 'jsonwebtoken'
import Types from 'mongoose'

export type UserPayload = {
    id: Types.ObjectId
}

export const generateJWT = (payload: UserPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
    return token
}