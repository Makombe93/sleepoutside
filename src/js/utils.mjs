// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get parameters from a URL
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return product;
}

//Make a new function in the utils.mjs file called renderListWithTemplate and export it.
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
  const htmlStrings = list.map(templateFn);
  if (clear){
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function numberOfItemsIcon(){
  const cart = getLocalStorage("so-cart");
  const quantity = cart.length;
  const icon = `<div class="cart-icon">${quantity}</div>`;
  const cartElement = document.querySelector(".cart");
  cartElement.insertAdjacentHTML("beforeend", icon);
}

export function renderWithTemplate(template, parent, data, callback) {
  parent.insertAdjacentHTML("afterbegin", template);
  if(callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const html = await fetch(path);
  const template = await html.text()
  return template;
}


export async function loadHeaderFooter () {
  const header = await loadTemplate("../partials/header.html");
  const footer = await loadTemplate("../partials/footer.html");
  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("footer");
  renderWithTemplate(footer, footerElement);
  renderWithTemplate(header, headerElement, header, numberOfItemsIcon);
}