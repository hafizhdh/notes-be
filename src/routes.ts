import { Router } from "express";
import noteController from "./note/note.controller";

const router = Router()
  .use(noteController)

export default Router().use('/api/v1', router)