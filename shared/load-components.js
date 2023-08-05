/**
 * @param {string} url
 * @param {HTMLElement | null} element
 */
function loadHTML(url, element) {
  if (element === null) {
    console.warn(`Element not found in ${url}.`);
    return;
  }

  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      element.innerHTML = html;
    })
    .catch((error) => {
      console.warn("Something went wrong on load shared components.", error);
    });
}

/**
 * @param {string} url
 */
function loadCSS(url) {
  const head = document.getElementsByTagName("head")[0];
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  head.appendChild(link);
}

function mount() {
  document.addEventListener("DOMContentLoaded", function () {
    const origin = window.location.origin;
    loadHTML(`${origin}/shared/header.html`, document.getElementById("header"));
    loadHTML(`${origin}/shared/footer.html`, document.getElementById("footer"));
    loadCSS(`${origin}/shared/header.css`);
    loadCSS(`${origin}/shared/footer.css`);
  });
}

mount();
