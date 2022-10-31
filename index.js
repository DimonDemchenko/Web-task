async function SetDatabase() {
  const data = await fetch(`./items.json`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
  // console.log(data)
  for (const [index, item] of data.entries()) {
    // console.log(index, item)
    window.localStorage.setItem(index, JSON.stringify(item));
  }
  // console.log(JSON.parse(window.localStorage.getItem(1)))
  createMarkup();
  openModal();
}
let colection = document.querySelector("#app");
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
        `<div><img class="data-modal-open" src="${photo.url}" alt=""></div>`
    )
    .join("");

  colection.insertAdjacentHTML("beforeend", markup);

  const input = document.createElement("input");
  const label = document.createElement("label");
  label.for = "InputTag";
  label.classList.add("add");
  label.style.backgroundImage = 'url("./photos/background.png")';
  input.type = "file";
  input.id = "InputTag";
  input.classList.add("add");
  input.addEventListener("change", addImage);
  colection.appendChild(label);
  label.appendChild(input);
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
      modal.classList.remove("is-hidden");
    });
  }
  let closeModal = document.querySelector(".modal-btn-close");
  console.log(closeModal);
  let modal = document.querySelector(".modal");

  closeModal.addEventListener("click", () => {
    modal.classList.add("is-hidden");
  });
}

SetDatabase();
