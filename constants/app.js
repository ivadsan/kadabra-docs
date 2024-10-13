const path = require("path");

module.exports = {
  PATH: {
    DOCS: path.join("./public", "docs"),
    ASSETS: path.join("./public", "assets"),
    EXAMPLE_FOLDER: path.join("./public", "docs", "kadabra-docs", "example"),
    EXAMPLE_FILE: path.join(
      "./node_modules",
      "docs",
      "kadabra-docs",
      "example",
      "README.md"
    ),
  },
  FILE: {
    DEFAULT_FILENAME: "README.md",
  },
};
