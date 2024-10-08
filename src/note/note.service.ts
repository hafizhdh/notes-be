import HttpException from "../model/http-exception.model"
import prisma from "../plugin/prisma/prisma.service"

const findMany = async () => {
  const notes = await prisma.note.findMany()
    .catch((e) => {
      throw new HttpException(500, "Error fetching notes")
    })
  return notes
}

const findById = async (id: string) => {
  const note = await prisma.note.findUniqueOrThrow({
    where: {
      id: id
    }
  }).catch((e) => {
    if (e.code === 'P2025') {
      throw new HttpException(404, "Note not found");
    } else {
      throw new HttpException(500, "Error fetching note")
    }
  })
  return note
}


const createNote = async (title: string, body: string) => {
  if (!title || !body) {
    throw new HttpException(400, "Missing properties")
  }
  
  const note = await prisma.note.create({
    data: {
      title,
      body
    }
  }).catch((e) => {
    throw new HttpException(500, "Error creating note")
  })
  
  return note
}

const updateNote = async (id: string, title: string, body: string) => {
  const note = await prisma.note.findUnique({
    where: {
      id: id
    }
  })
  
  if (!note) {
    throw new HttpException(404, "Note not found")
  }
  
  if (!title && !body) {
    throw new HttpException(400, "Missing properties")
  }
  
  const updatedNote = await prisma.note.update({
    where: {
      id: id
    },
    data: {
      title: title ? title : note.title,
      body: body ? body : note.body
    }
  }).catch((e) => {
    throw new HttpException(500, "Error updating note")
  })

  return updatedNote
}

const deleteNote = async (id: string) => {
  const note = await prisma.note.findUnique({
    where: {
      id: id
    }
  })
  if (!note) {
    throw new HttpException(404, "Note not found")
  }

  await prisma.note.delete({
    where: {
      id: id
    }
  }).catch((e) => {
    throw new HttpException(500, "Error deleting note")
  })
}

export {
  findMany,
  findById,
  createNote,
  updateNote,
  deleteNote
}