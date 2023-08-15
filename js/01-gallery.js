import { galleryItems } from "./gallery-items.js";
// Change code below this line
console.log(galleryItems);
const list = document.querySelector(".gallery");
console.dir(list);
const renderList = (arr) =>
  arr
    .map(
      (item) =>
        `<li class="gallery__item"><a class="gallery__link"href="${item.original}"><img class="gallery__image"src="${item.preview}"data-source="${item.original}"alt="${item.description}"/></a></li>`
    )
    .join("");
let instance = null;
const listClick = (event) => {
  event.preventDefault();
  if (event.target.tagName !== "IMG") {
    return;
  }

  const data = event.target.dataset.source;
  const source = galleryItems.find((item) => item.original === data);

  instance = basicLightbox.create(`
    <div class="modal">
        <img class="gallery__image" src="${source.original}" alt="${source.description}" />
    </div>
  `);

  instance.show();
  document.addEventListener("keydown", modalKeydownHandler);
};

const modalKeydownHandler = (event) => {
  if (event.key === "Escape") {
    instance.close();
    document.removeEventListener("keydown", modalKeydownHandler);
  }
};

list.insertAdjacentHTML("beforeend", renderList(galleryItems));
list.addEventListener("click", listClick);
