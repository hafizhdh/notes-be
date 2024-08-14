import { Request, Response, Router } from "express";
import { findById, findMany } from "./note.service";
import HttpException from "../model/http-exception.model";

const router = Router()

/**
 * GET /api/v1/note
 */
router.get('/note', async (req: Request, res: Response) => {
  try {
    const notes = await findMany()
    res.json(notes)
  } catch (err: any) {
    res.status(err.errorCode).json({
      code: err.errorCode,
      message: err.message
    })
  }
})

/**
 * GET /api/v1/:id
 */
router.get('/note/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (!id) {
      throw new HttpException(400, "Please provide an id")
    }
    const note = await findById(id)
    res.json(note)
  } catch (err: any) {
    res.status(err.errorCode).json({
      code: err.errorCode,
      message: err.message
    })
  }
})

export default router