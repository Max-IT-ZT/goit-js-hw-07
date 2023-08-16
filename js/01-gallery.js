import { galleryItems } from "./gallery-items.js";
const list = document.querySelector(".gallery");
const renderList = (arr) =>
  arr
    .map(
      (item) =>
        `<li class="gallery__item">
           <a class="gallery__link" href="${item.original}">
             <img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}" />
           </a>
         </li>`
    )
    .join("");

let instance = null;

const listClick = (event) => {
  event.preventDefault();

  if (event.target.tagName !== "IMG") {
    return;
  }

  const imgElement = event.target;
  const data = imgElement.dataset.source;

  instance = basicLightbox.create(`
    <div class="modal">
        <img class="gallery__image" src="${data}" alt="${imgElement.alt}" />
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
