import { Request, Response, NextFunction } from "express"
import { selectAllGenres, selectGenreById } from "../services/genres.service"

export const getAllGenres = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genres = await selectAllGenres()
        res.status(200).json({
            code: 200,
            data: genres
        })
    } catch(e) {
        next(e)
    }
}

export const getGenreById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const genre = await selectGenreById(id)
        res.status(200).json({
            code: 200,
            data: genre
        })
    } catch(e) {
        next(e)
    }
}