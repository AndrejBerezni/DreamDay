import { deleteNote } from "../..";
import noteForm from "./noteForm";
import loadNotes from "./loadNotes";

export default function generateNoteElement(note, container) {
  // Create elements
  const noteDiv = document.createElement("div");
  const noteTitle = document.createElement("h1");
  const noteText = document.createElement("p");
  const buttonsDiv = document.createElement("div");
  const noteEdit = document.createElement("icon");
  const noteDelete = document.createElement("icon");
  const noteEditContainer = document.createElement("icon");
  const noteDeleteContainer = document.createElement("icon");

  // Add attributes
  noteDiv.classList.add("note-div");
  buttonsDiv.classList.add("note-buttons");
  noteTitle.innerText = note.title;
  noteText.innerText = note.text;

  noteEdit.classList.add("far", "fa-edit");
  noteDelete.classList.add("fas", "fa-trash");

  // Edit or delete note on click

  noteEditContainer.addEventListener("click", () => {
    noteForm(true, note);
  });

  noteDeleteContainer.addEventListener("click", () => {
    const confirmDeletionBox = document.createElement("div");
    const deletionBoxText = document.createElement("p");
    const deletionButtonsDiv = document.createElement("div");
    const confirmDeletionButton = document.createElement("button");
    const cancelDeletionButton = document.createElement("button");

    confirmDeletionBox.id = "confirm-task-deletion-box";

    deletionBoxText.innerText =
      "Are you sure that you want to delete this note?";
    confirmDeletionButton.innerText = "Yes";
    cancelDeletionButton.innerText = "No";

    cancelDeletionButton.addEventListener("click", () => {
      document.body.removeChild(confirmDeletionBox);
    });

    confirmDeletionButton.addEventListener("click", async () => {
      await deleteNote(note.title);
      document.body.removeChild(confirmDeletionBox);
      const notesContainer = document.getElementById('notes-container');
      notesContainer.innerHTML = "";
      await loadNotes(notesContainer);
    });

    deletionButtonsDiv.appendChild(cancelDeletionButton);
    deletionButtonsDiv.appendChild(confirmDeletionButton);

    confirmDeletionBox.appendChild(deletionBoxText);
    confirmDeletionBox.appendChild(deletionButtonsDiv);

    document.body.appendChild(confirmDeletionBox);
  });

  //Append elements

  noteEditContainer.appendChild(noteEdit);
  noteDeleteContainer.appendChild(noteDelete);

  buttonsDiv.appendChild(noteEditContainer);
  buttonsDiv.appendChild(noteDeleteContainer);

  noteDiv.appendChild(noteTitle);
  noteDiv.appendChild(noteText);
  noteDiv.appendChild(buttonsDiv);

  container.appendChild(noteDiv);
}
