async function SetDatabase() {
  const data = await fetch(`./items.json`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
  for (const [index, item] of data.entries()) {
    window.localStorage.setItem(index, JSON.stringify(item));
  }
  createMarkup();
  openModal();
}
let colection = document.querySelector("#app");
let modal = document.querySelector(".modal");
let modalParams = document.querySelector(".popupSizeParams");
let popupImage = document.querySelector("#popupImage");
function getData() {
  let arr = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    arr.push(JSON.parse(window.localStorage.getItem(i)));
  }
  return arr;
}
function createMarkup() {
  let arrayData = getData();
  const markup = arrayData
    .map(
      (photo) =>
        `<div><img class="data-modal-open" id="${photo.name}" src="${photo.url}" alt=""></div>`
    )
    .join("");

  colection.insertAdjacentHTML("beforeend", markup);

  const input = document.querySelector("#inputString");
  const label = document.createElement("label");
  const modalForm = document.querySelector("#modalForm");
  const photoAdd = document.createElement("div");

  photoAdd.classList.add("add");
  modalForm.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target == modalForm) {
      modalForm.classList.add("is-hidden");
    }
  });
  photoAdd.style.backgroundImage = 'url("./photos/background.png")';

  photoAdd.addEventListener("click", () => {
    modalForm.classList.remove("is-hidden");
  });
  colection.appendChild(photoAdd);
  input.addEventListener("change", addImage);
  colection.appendChild(label);
}
function addImage(event) {
  const fileList = event.target.files;
  const reader = new FileReader();
  const file = fileList.item(0);
  reader.addEventListener("load", (event) => {
    setNewPhoto(event.target.result);
  });
  reader.readAsDataURL(file);
}
function setNewPhoto(url) {
  window.localStorage.setItem(
    window.localStorage.length,
    JSON.stringify({
      name: "some",
      name2: "something",
      count_likes: "121",
      count_dislike: "134",
      url: url,
      comments: [],
    })
  );
  colection.innerHTML = "";
  createMarkup();
  openModal();
}
function openModal() {
  let arrImages = document.querySelectorAll(".data-modal-open");
  console.log(arrImages);
  for (let img of arrImages) {
    img.addEventListener("click", () => {
      popupImage.src = img.src;
      document.querySelector("#name").textContent = "Some";
      modalParams.classList.remove("is-hidden");
      modal.classList.remove("is-hidden");
    });
  }
  let closeModal = document.querySelector(".modal-btn-close");
  closeModal.addEventListener("click", () => {
    modal.classList.add("is-hidden");
    modalParams.classList.add("is-hidden");
  });
}

SetDatabase();
