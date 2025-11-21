import jwt from 'jsonwebtoken'

export type UserPayload = {
    id: string
}

export const generateJWT = (payload: UserPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
    return token
}