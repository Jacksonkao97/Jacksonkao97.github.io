import { chromium } from "playwright-core";

// Launches an installed Google Chrome (preinstalled on GitHub's Ubuntu
// runners), or the Chrome/Chromium binary at CHROME_PATH.
export async function launchChrome() {
  try {
    return await chromium.launch(
      process.env.CHROME_PATH
        ? { executablePath: process.env.CHROME_PATH }
        : { channel: "chrome" }
    );
  } catch (error) {
    throw new Error(
      "Could not start Chrome. Install Google Chrome or set CHROME_PATH " +
        "to a Chrome/Chromium binary.",
      { cause: error }
    );
  }
}
