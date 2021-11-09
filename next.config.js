const readManifestFile = async () => {
  const manifestFilePath = `${__dirname}/simple-web.yml`;
  const fs = require("fs");
  return fs.readFileSync(manifestFilePath, "utf8");
};

module.exports = {
  generateBuildId: async () => {
    const manifest = await readManifestFile();
    const crypto = require("crypto");
    const shasum = crypto.createHash("sha1").update(manifest).digest("hex");

    return shasum;
  },
};
