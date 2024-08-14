import { Request, Response, Router } from "express";
import { createNote, deleteNote, findById, findMany, updateNote } from "./note.service";
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
 * GET /api/v1/note/:id
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

/**
 * POST /api/v1/note
*/
router.post('/note', async (req: Request, res: Response) => {
  try {
    const requestBody = req.body
    if (!requestBody) {
      throw new HttpException(400, "Request body cannot be empty");
    }
    const { title, body } = requestBody
    const note = await createNote(title, body)
    res.json(note)
  } catch (err: any) {
    res.status(err.errorCode).json({
      code: err.errorCode,
      message: err.message
    })
    
  }
})

/**
 * PUT /api/v1/note/:id
 */
router.put('/note/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (!id) {
      throw new HttpException(400, "Please provide an id")
    }
    
    const requestBody = req.body
    if (!requestBody) {
      throw new HttpException(400, "Request body cannot be empty");
    }
    
    const { title, body } = requestBody
    const note = await updateNote(id, title, body)
    res.json(note)
  } catch (err: any) {
    res.status(err.errorCode).json({
      code: err.errorCode,
      message: err.message
    })
  }
})

/**
 * DELETE /api/note/:id
*/
router.delete('/note/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (!id) {
      throw new HttpException(400, "Please provide an id")
    }
    await deleteNote(id)
    res.status(200).json({"message":"success"})
  } catch (err: any) {
    res.status(err.errorCode).json({
      code: err.errorCode,
      message: err.message
    })
    
  }
})

export default router