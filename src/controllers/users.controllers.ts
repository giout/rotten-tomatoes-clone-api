import { Request, Response, NextFunction } from "express"
import { AuthRequest } from "../types/auth.type"
import { UserBD } from "../types/users.type"
import { userExists } from "../utils/validation.util"
import { deleteUserBD, selectAllUsers, updateUser } from "../services/users.service"

export const getAuthUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get payload from token
        const { user } = req as AuthRequest
        const authUser = await userExists(user.id)
        res.status(200).json(authUser)
    } catch(e) {
        next(e)
    }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await selectAllUsers()
        // get ratings and add them to users
        // get reviews and add them to users
        res.status(200).json(users)
    } catch(e) {
        next(e)
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const user = await userExists(id)
        // get ratings and add them to user
        // get reviews and add them to user
        res.status(200).json(user)
    } catch(e) {
        next(e)
    }
}

export const putUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { firstName, lastName, password } = req.body
        const user = await updateUser(id, { firstName, lastName, password })
        res.status(200).json(user)
    } catch(e) {
        next(e)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        await deleteUserBD(id)
        res.status(200).end()
    } catch(e) {
        next(e)
    }
}