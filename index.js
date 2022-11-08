const colection = document.querySelector(".collection");
const modalForm = document.querySelector("#modalForm");
const button = document.querySelector(".button");
const form = document.querySelector(".form");
const modalParams = document.querySelector(".popupSizeParams");
const modal = document.querySelector(".modal");
async function SetDatabase() {
  const data = await fetch(`./items.json`, {
    method: "GET",
  }).then((res) => {
    return res.json();
  });
  for (const [index, item] of data.entries()) {
    window.localStorage.setItem(index, JSON.stringify(item));
  }
  createMarkup();
}

function getData() {
  let arr = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    arr.push(JSON.parse(window.localStorage.getItem(i)));
  }
  return arr;
}

function createMarkup() {
  let arrayData = getData();
  console.log(arrayData);
  const markup = arrayData
    .map(
      (photo, index) =>
        `<div><img class="data-modal-open photos" id="${index}" src="${photo.url}" alt=""></div>`
    )
    .join("");

  colection.insertAdjacentHTML("afterbegin", markup);
  createBlockOnClick();
  openModal();
}

function createBlockOnClick() {
  const blockAddPhoto = document.querySelector(".blockAddPhoto");
  blockAddPhoto.addEventListener("click", () => {
    modalForm.classList.remove("is-hidden");
  });
  modalFormOnclick();
}
function modalFormOnclick() {
  modalForm.addEventListener("click", (event) => {
    if (event.target == modalForm) {
      modalForm.classList.add("is-hidden");
    }
  });
  formButtonOnClick();
}

function formButtonOnClick() {
  const inputName = document.querySelector(".inputName");
  const photoDescription = document.querySelector(".description");
  const photoFile = document.querySelector(".photoFile");
  button.addEventListener("click", () => {
    if (
      inputName.value === "" ||
      photoDescription.value === "" ||
      photoFile.files.length === 0
    ) {
      alert("Введіть обов’язкові поля!!!");
    } else {
      form.submit(readPhotoUrl());
    }
  });
}
function readPhotoUrl() {
  const fileList = document.querySelector(".photoFile").files;
  const reader = new FileReader();
  const file = fileList.item(0);
  reader.addEventListener("load", (event) => {
    setNewPhoto(event.target.result);
    modalForm.classList.add("is-hidden");
  });
  reader.readAsDataURL(file);
}
function setNewPhoto(url) {
  window.localStorage.setItem(
    window.localStorage.length,
    JSON.stringify({
      name: document.querySelector(".inputName").value,
      name2: document.querySelector(".description").value,
      like: false,
      dislike: false,
      count_like: 0,
      count_dislike: 0,
      url: url,
      comments: [],
    })
  );
  colection.innerHTML = "";
}

//Функції для роботи з фото після кліку
function openModal() {
  let arrImages = document.querySelectorAll(".data-modal-open");
  console.log(arrImages);
  for (let img of arrImages) {
    img.addEventListener("click", () => {
      getPhotoData(img);
      modalParams.classList.remove("is-hidden");
      modal.classList.remove("is-hidden");
    });
  }
  closeModal();
}

let id;
let data;
let countLike = document.querySelector(".count_of_like");
let countDislike = document.querySelector(".count_of_dislike");

function getPhotoData(img) {
  popupImage.src = img.src;
  id = img.id;
  data = JSON.parse(window.localStorage.getItem(img.id));
  document.querySelector("#name").textContent = data.name;
  document.querySelector("#description").textContent = data.name2;
  countLike.innerHTML = data.count_like;
  countDislike.innerHTML = data.count_dislike;
  likeAndDislike(data);
  createMarkupForComments();
}

function closeModal() {
  let closeModal = document.querySelector(".modal-btn-close");
  closeModal.addEventListener("click", () => {
    const btn1 = document.querySelector(".like__block");
    const btn2 = document.querySelector(".dislike__block");
    btn1.removeEventListener("click", () => { });
    btn2.removeEventListener("click", () => { });
    modal.classList.add("is-hidden");
    modalParams.classList.add("is-hidden");
    clearComments();
  });
}
//Механіка лайків
const btn1 = document.querySelector(".like__block");
const btn2 = document.querySelector(".dislike__block");
const btn_like = document.querySelector(".like");
const btn_dislike = document.querySelector(".dislike");

function likeAndDislike(img) {
  console.log(img.like);
  if (img.like) {
    btn_like.classList.add("green");
  } else {
    btn_like.classList.remove("green");
  }
  if (img.dislike) {
    btn_dislike.classList.add("red");
  } else {
    btn_dislike.classList.remove("red");
  }

  btn1.addEventListener("click", likes);

  btn2.addEventListener("click", dislikes);
}

function likes() {
  if (btn_dislike.classList.contains("red")) {
    btn_dislike.classList.remove("red");
    data.count_dislike--;
    data.dislike = false;
    countDislike.innerHTML--;
  }
  btn_like.classList.toggle("green");
  if (btn_like.classList.contains("green")) {
    data.like = true;
    data.count_like++;
    countLike.innerHTML++;
  } else {
    data.like = false;
    data.count_like--;
    countLike.innerHTML--;
  }
  updatePhotoData();
}

function dislikes() {
  if (btn_like.classList.contains("green")) {
    btn_like.classList.remove("green");
    data.count_like--;
    data.like = false;
    countLike.innerHTML--;
  }
  btn_dislike.classList.toggle("red");
  if (btn_dislike.classList.contains("red")) {
    data.dislike = true;
    data.count_dislike++;
    countDislike.innerHTML++;
  } else {
    data.dislike = false;
    data.count_dislike--;
    countDislike.innerHTML--;
  }
  updatePhotoData();
}

function updatePhotoData() {
  window.localStorage.setItem(id, JSON.stringify(data));
}

// Функції для роботи з коментарями
function createMarkupForComments() {
  const comments_list = document.querySelector(".comment_list");
  const markupForComments = data.comments
    .map((coment) => `<li>${coment}</li>`)
    .join("");

  comments_list.insertAdjacentHTML("beforeend", markupForComments);
  setNewComment()

}

function clearComments() {
  const comments_list = document.querySelector(".comment_list");
  comments_list.innerHTML = "";
}
const bool = true;
function setNewComment() {
  const commnetButton = document.querySelector('.comment__input')

  commnetButton.addEventListener('click', commnetButtonClick, bool)


}
function commnetButtonClick() {
  const commnetButton = document.querySelector('.comment__input')
  const commentText = document.querySelector('.comment__message')
  data.comments.push(commentText.value)
  window.localStorage.setItem(id, JSON.stringify(data))
  const comments_list = document.querySelector(".comment_list");
  commentText.value = ""
  comments_list.innerHTML = ""
  createMarkupForComments()
  bool = false


}
SetDatabase();
