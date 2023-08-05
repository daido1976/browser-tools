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
    loadHTML("shared/header.html", document.getElementById("header"));
    loadHTML("shared/footer.html", document.getElementById("footer"));
    loadCSS("shared/header.css");
    loadCSS("shared/footer.css");
  });
}

mount();
