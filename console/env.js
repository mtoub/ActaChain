const fs = require("fs");
const path = require("path");

// Path to the .key file
const keyFilePath = path.join(__dirname, "certs", "private.key");

// Path to the .env file
const envFilePath = path.join(__dirname, ".env");

// Read the .key file
fs.readFile(keyFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the .key file:", err);
    return;
  }

  // Create the .env content
  const envContent = `PUBLIC_KEY="${data.replace(/\n/g, "\\n")}"\n`;

  // Write to the .env file
  fs.writeFile(envFilePath, envContent, (err) => {
    if (err) {
      console.error("Error writing to the .env file:", err);
      return;
    }

    console.log(".env file created successfully.");
  });
});
