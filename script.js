const addBtn = document.querySelector("#add");

//local storage
const updateLocalStorageData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];
  //console.log(textAreaData);

  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  //console.log(notes);

  //add item to LS in JSON form
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
      <div class="operation">
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
      </div>

      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>
  `;

  note.insertAdjacentHTML("afterbegin", htmlData);

  //get references
  const editBtn = note.querySelector(".edit");
  const delBtn = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  //delete note
  delBtn.addEventListener("click", (ev) => {
    note.remove();
    updateLocalStorageData();
  });

  //toggle edit button
  textArea.value = text;
  mainDiv.innerHTML = text;

  editBtn.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });
  textArea.addEventListener("change", (ev) => {
    const value = ev.target.value;
    mainDiv.innerHTML = value;

    //call updateLS function
    updateLocalStorageData();
  });

  //add created note element to the body of website
  document.body.appendChild(note);
};

// get data from local storage
const notes = JSON.parse(localStorage.getItem("notes"));

//display every available notes in the website body
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

// add note event, call addNewNote function
addBtn.addEventListener("click", () => addNewNote());
