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
      name2: "something",
      like: false,
      dislike: false,
      count_likes: 0,
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

function getPhotoData(img) {
  popupImage.src = img.src;
  const data = JSON.parse(window.localStorage.getItem(img.id));
  document.querySelector("#name").textContent = data.name;
  document.querySelector("#description").textContent = data.name2;
  likeAndDislike(data);
}
function closeModal() {
  let closeModal = document.querySelector(".modal-btn-close");
  closeModal.addEventListener("click", () => {
    const btn1 = document.querySelector(".like__block");
    const btn2 = document.querySelector(".dislike__block");
    btn1.removeEventListener("click", like);
    btn2.removeEventListener("click", dislike);
    modal.classList.add("is-hidden");
    modalParams.classList.add("is-hidden");
  });
}
const btn1 = document.querySelector(".like__block");
const btn2 = document.querySelector(".dislike__block");
const btn_like = document.querySelector(".like");
const btn_dislike = document.querySelector(".dislike");
//Механіка лайків
function likeAndDislike(img) {
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

  btn1.addEventListener("click", like(img));

  btn2.addEventListener("click", dislike(img));
}
function like(img) {
  if (btn_dislike.classList.contains("red")) {
    btn_dislike.classList.remove("red");
    img.count_dislike--;
    img.dislike = false;
  }
  btn_like.classList.toggle("green");
  if (btn_like.classList.contains("green")) {
    img.like = true;
    img.count_like++;
  } else {
    img.like = false;
    img.count_like--;
  }
}

function dislike(img) {
  if (btn_like.classList.contains("green")) {
    btn_like.classList.remove("green");
    img.count_like--;
    img.like = false;
  }
  btn_dislike.classList.toggle("red");
  if (btn_dislike.classList.contains("red")) {
    img.dislike = true;
    img.count_dislike++;
  } else {
    img.dislike = false;
    img.count_dislike--;
  }
  console.log("Кількість дизлайків" + img.count_dislike);
}
SetDatabase();

// let colection = document.querySelector("#app");
// let modal = document.querySelector(".modal");
// let modalParams = document.querySelector(".popupSizeParams");
// let popupImage = document.querySelector("#popupImage");
// const button = document.querySelector(".button");

// async function SetDatabase() {
//   const data = await fetch(`./items.json`, {
//     method: "GET",
//   }).then((res) => {
//     return res.json();
//   });
//   for (const [index, item] of data.entries()) {
//     window.localStorage.setItem(index, JSON.stringify(item));
//   }
//   createMarkup();
//   openModal();
// }

// function getData() {
//   let arr = [];
//   for (let i = 0; i < window.localStorage.length; i++) {
//     arr.push(JSON.parse(window.localStorage.getItem(i)));
//   }
//   return arr;
// }

// function createMarkup() {
//   let arrayData = getData();

//   const markup = arrayData
//     .map(
//       (photo) =>
//         `<div><img class="data-modal-open" id="${photo.name}" src="${photo.url}" alt=""></div>`
//     )
//     .join("");

//   colection.insertAdjacentHTML("beforeend", markup);
//   createAddBlock();
// }
// formValidate();

// function createAddBlock() {
//   const photoAdd = document.createElement("div");
//   photoAdd.style.backgroundImage = 'url("./photos/background.png")';
//   photoAdd.classList.add("add");
//   photoAdd.addEventListener("click", () => {
//     modalForm.classList.remove("is-hidden");
//     let inputName = document.querySelector(".inputName");
//     inputName.value = "";
//     inputName.addEventListener("input", formValidate);
//   });

//   colection.appendChild(photoAdd);
//   createBlockOnClick();
// }

// function createBlockOnClick() {
//   const button = document.querySelector(".button");
//   const modalForm = document.querySelector("#modalForm");
//   modalForm.addEventListener("click", (event) => {
//     if (event.target == modalForm) {
//       modalForm.classList.add("is-hidden");
//     }
//   });
//   button.addEventListener("click", () => {
//     if (button.disabled) {
//       Notiflix.Notify.failure("Qui timide rogat docet negare");
//     }
//   });
// }

// function setNewPhoto(url) {
//   window.localStorage.setItem(
//     window.localStorage.length,
//     JSON.stringify({
//       name: document.querySelector(".inputName").value,
//       name2: "something",
//       count_likes: "121",
//       count_dislike: "134",
//       url: url,
//       comments: [],
//     })
//   );
//   colection.innerHTML = "";
//   createMarkup();
//   openModal();
// }

// function openModal() {
//   let arrImages = document.querySelectorAll(".data-modal-open");
//   console.log(arrImages);
//   for (let img of arrImages) {
//     img.addEventListener("click", () => {
//       popupImage.src = img.src;
//       document.querySelector("#name").textContent = "Some";
//       modalParams.classList.remove("is-hidden");
//       modal.classList.remove("is-hidden");
//     });
//   }
//   closeModal();
// }
// function closeModal() {
//   let closeModal = document.querySelector(".modal-btn-close");
//   closeModal.addEventListener("click", () => {
//     modal.classList.add("is-hidden");
//     modalParams.classList.add("is-hidden");
//   });
// }

// function formValidate() {
//   let nameInput = document.querySelector(".inputName");
//   if (nameInput.value === "") {
//     button.disabled = true;
//   } else {
//     button.disabled = false;
//   }
// }

// SetDatabase();
