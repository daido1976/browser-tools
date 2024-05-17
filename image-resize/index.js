document.addEventListener("DOMContentLoaded", () => {
  const dropArea = /** @type {HTMLDivElement} */ (
    document.getElementById("drop-area")
  );
  const fileInput = /** @type {HTMLInputElement} */ (
    document.getElementById("file-input")
  );
  const resizeBtn = /** @type {HTMLButtonElement} */ (
    document.getElementById("resize-btn")
  );
  const downloadLinks = /** @type {HTMLDivElement} */ (
    document.getElementById("download-links")
  );

  /**
   * @type {FileList}
   */
  let targetFiles;

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.add("highlight");
  });

  dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.remove("highlight");
  });

  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.remove("highlight");
    if (e.dataTransfer == null) return;

    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", (e) => {
    const input = /** @type {HTMLInputElement} */ (e.target);
    if (input.files == null) return;

    handleFiles(input.files);
  });

  resizeBtn.addEventListener("click", () => {
    const maxWidthInput = /** @type {HTMLInputElement} */ (
      document.getElementById("max-width")
    );
    const maxWidth = parseInt(maxWidthInput.value, 10);
    if (targetFiles.length > 0 && maxWidth > 0) {
      resizeImages(targetFiles, maxWidth);
    } else {
      alert("画像ファイルと有効な最大幅を選択してください。");
    }
  });

  /**
   * @param {FileList} files
   */
  function handleFiles(files) {
    targetFiles = files;
    console.log("ファイルが選択されました:", files);
  }

  /**
   * @param {FileList} files
   */
  function resizeImages(files, maxWidth) {
    downloadLinks.innerHTML = ""; // Clear previous links

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        if (event.target == null) return;

        const img = new Image();
        // @ts-ignore
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (ctx == null) return;

          const ratio = img.width / img.height;
          if (img.width > maxWidth) {
            canvas.width = maxWidth;
            canvas.height = maxWidth / ratio;
          } else {
            canvas.width = img.width;
            canvas.height = img.height;
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob == null) return;
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = file.name;
            link.textContent = `ダウンロード: ${file.name}`;
            link.className = "download-link";
            downloadLinks.appendChild(link);
          }, file.type);
        };
      };
    });
  }
});
