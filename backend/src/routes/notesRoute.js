import express from "express";
import { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, updateNoteByIdHandler} from "../Handlers/notesHandler.js";
import { deleteNoteByIdHandler } from "../Handlers/notesHandler.js";

const notesRouter = express.Router();

notesRouter.post("/notes", addNoteHandler);
notesRouter.get("/notes", getAllNotesHandler);
notesRouter.get("/notes/:id", getNoteByIdHandler);
notesRouter.put("/notes/:id", updateNoteByIdHandler);
notesRouter.delete("/notes/:id", deleteNoteByIdHandler);

export default notesRouter;
