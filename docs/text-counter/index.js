// @ts-check

/**
 * 文字数、空白・改行なしの文字数、行数をカウントします。
 * @param {string} text 入力されたテキスト
 * @param {boolean} includeHTML HTMLタグをカウントするかどうかのフラグ
 */
function countCharacters(text, includeHTML) {
  const processedText = includeHTML ? text : text.replace(/<[^>]*>?/gm, "");
  const textNoSpaces = processedText.replace(/\s+/g, "");
  const lines = processedText.split(/\r*\n/);

  return {
    allChars: processedText.length,
    charsWithoutSpaces: textNoSpaces.length,
    numberOfLines: lines.length,
  };
}

function mount() {
  const inputText = /** @type {HTMLTextAreaElement} */ (
    document.getElementById("inputText")
  );
  const countAll = /** @type {HTMLLIElement} */ (
    document.getElementById("countAll")
  );
  const countChars = /** @type {HTMLLIElement} */ (
    document.getElementById("countChars")
  );
  const countLines = /** @type {HTMLLIElement} */ (
    document.getElementById("countLines")
  );
  const htmlSwitch = /** @type {HTMLInputElement} */ (
    document.getElementById("htmlSwitch")
  );

  const updateCounts = () => {
    const { allChars, charsWithoutSpaces, numberOfLines } = countCharacters(
      inputText.value,
      htmlSwitch.checked
    );

    countAll.textContent = allChars.toString();
    countChars.textContent = charsWithoutSpaces.toString();
    countLines.textContent = numberOfLines.toString();
  };

  inputText.addEventListener("input", updateCounts);
  htmlSwitch.addEventListener("change", updateCounts);
}

mount();
