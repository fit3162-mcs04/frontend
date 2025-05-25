import jwt from 'jsonwebtoken'

export const verifyJwt = (token: string) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY! // This should match the key used to sign the token
    const decoded = jwt.verify(token, secretKey)
    return decoded
  } catch (error) {
    console.error("Error verifying JWT:", error)
    throw new Error("Invalid JWT")
  }
}