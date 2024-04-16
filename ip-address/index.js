async function initializeIpDisplay() {
  const ipAddress = /** @type {HTMLParagraphElement} */ (
    document.getElementById("ipAddress")
  );

  try {
    const ipData = await fetchIpData();
    ipAddress.style.fontWeight = "bold";
    ipAddress.textContent = `あなたのIPアドレス: ${ipData.ip}`;
  } catch (error) {
    console.error("Error occurred while fetching IP address:", error);
    ipAddress.textContent = "IPアドレスが取得できませんでした...😭";
  }
}

/**
 * @returns {Promise<{ip: string}>}
 */
async function fetchIpData() {
  const response = await fetch("https://api.ipify.org?format=json");
  if (!response.ok) {
    throw new Error("Failed to fetch IP data");
  }
  return await response.json();
}

document.addEventListener("DOMContentLoaded", initializeIpDisplay);
