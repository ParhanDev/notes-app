import express from "express";
import { addNoteHandler, getAllNotesHandler, getNoteByIdHandler } from "../Handlers/notesHandler.js";

const notesRouter = express.Router();

notesRouter.post("/notes", addNoteHandler);
notesRouter.get("/notes", getAllNotesHandler);
notesRouter.get("/notes/:id", getNoteByIdHandler);

export default notesRouter;
