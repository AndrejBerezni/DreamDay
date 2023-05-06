import { createChapter } from "../..";

export default function addChapterForm() {
  // Create elements
  const chapterForm = document.createElement("form");
  const formTitle = document.createElement("h1");
  const titleLabel = document.createElement("label");
  const title = document.createElement("input");
  const buttonsDiv = document.createElement("div");
  const submitButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  // Set attributes to elements
  chapterForm.id = "chapter-form";

  formTitle.innerText = "New Chapter";

  titleLabel.setAttribute("for", "chapter-title");
  titleLabel.innerText = "Chapter Name";
  titleLabel.classList.add('chapter-title-label');

  title.setAttribute("type", "text");
  title.setAttribute("name", "chapter-title");
  title.setAttribute("required", "");
  title.classList.add('chapter-title')

  buttonsDiv.id = "form-buttons-div";

  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Submit";

  cancelButton.setAttribute("type", "button");
  cancelButton.innerText = "Cancel";

  //Handle form submit
  chapterForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await createChapter(title.value);
    document.body.removeChild(chapterForm);
    location.reload();
  });

  // Remove form by clicking cancel button
  cancelButton.addEventListener("click", () => {
    document.body.removeChild(chapterForm);
  });

  // Append elements and load form
  buttonsDiv.appendChild(cancelButton);
  buttonsDiv.appendChild(submitButton);

  chapterForm.appendChild(formTitle);
  chapterForm.appendChild(titleLabel);
  chapterForm.appendChild(title);
  chapterForm.appendChild(buttonsDiv);

  document.body.appendChild(chapterForm);
}
