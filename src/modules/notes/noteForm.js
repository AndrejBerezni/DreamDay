import Note from "../noteClass";
import { createNote, deleteNote } from "../..";
import loadNotes from "./loadNotes";

export default function noteForm(isEdit, note = null) {
  // Create elements
  const form = document.createElement("form");
  const titleLabel = document.createElement("label");
  const title = document.createElement("input");
  const textLabel = document.createElement("label");
  const text = document.createElement("textarea");
  const buttonsDiv = document.createElement("div");
  const submitButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  //Add attributes
  form.id = "note-form";

  titleLabel.innerText = "Title";
  titleLabel.setAttribute("for", "note-form-title");

  title.value = isEdit ? note.title : "";
  title.setAttribute("name", "note-form-title");
  title.setAttribute("type", "text");
  title.setAttribute("required", "");
  title.id = "note-form-title";

  textLabel.innerText = "Text";
  textLabel.setAttribute("for", "note-form-title");

  text.value = isEdit ? note.text : "";
  if (!isEdit) {
    text.setAttribute("placeholder", "Write your note here...");
  }
  text.setAttribute("name", "note-form-text");
  text.setAttribute("rows", "10");
  text.setAttribute("cols", "40");
  text.setAttribute("required", "");
  text.id = "note-form-text";

  buttonsDiv.id = "form-buttons-div";

  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Save";
  cancelButton.setAttribute("type", "button");
  cancelButton.innerText = "Cancel";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newNote = new Note(title.value, text.value);

    /* If titles do not match, new document will be created and we will have duplicates.
    This way we prevent that: */
    if (isEdit && note.title !== newNote.title) {
      await deleteNote(note.title);
    }
    await createNote(newNote);
    document.body.removeChild(form);

    // Reload notes
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = "";
    await loadNotes(notesContainer);
  });

  cancelButton.addEventListener("click", () => {
    document.body.removeChild(form);
  });

  //   Append elements
  buttonsDiv.appendChild(cancelButton);
  buttonsDiv.appendChild(submitButton);

  form.appendChild(titleLabel);
  form.appendChild(title);
  form.appendChild(textLabel);
  form.appendChild(text);
  form.appendChild(buttonsDiv);

  document.body.appendChild(form);
}
