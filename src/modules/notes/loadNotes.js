import { getNotesForCurrentUser } from "../..";
import generateNoteElement from "./generateNoteElement";

export default async function loadNotes(container) {
    const notes = await getNotesForCurrentUser();
    notes.forEach(note => {
        generateNoteElement(note, container)
    })
};