import favicons from "favicons";
import fs from "fs";
import path from "path";

const source = "public/genxbaby-logo.svg"; // your master logo file
const output = "public/";

const configuration = {
  path: "/", 
  appName: "GenXBaby",
  appShortName: "GenXBaby",
  appDescription: "Fintech OS for Borrowers, Investors, Owners, and Admins.",
  developerName: "GenXBaby",
  developerURL: null,
  background: "#000000",
  theme_color: "#000000",
  display: "standalone",
  orientation: "portrait",
  start_url: "/",
  version: "1.0",
  logging: true,
  pixel_art: false,
  loadManifestWithCredentials: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    favicons: true,
    windows: true,
    yandex: false,
  },
};

favicons(source, configuration, (error, response) => {
  if (error) {
    console.error(error.message);
    return;
  }

  // Write images
  response.images.forEach((image) => {
    fs.writeFileSync(path.join(output, image.name), image.contents);
  });

  // Write files (manifest, browserconfig)
  response.files.forEach((file) => {
    fs.writeFileSync(path.join(output, file.name), file.contents);
  });

  // Write HTML (optional)
  fs.writeFileSync(path.join(output, "favicon-snippet.html"), response.html.join("\n"));

  console.log("GenXBaby favicon set generated successfully.");
});
