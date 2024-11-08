import path from "path";

export const PATH = {
  DOCS: path.join("./public", "docs"),
  ASSETS: path.join("./public", "assets"),
  DIRECTORY: path.join("./public", "directory"),
  EXAMPLE_FOLDER: path.join("./public", "docs", "kadabra-docs", "example"),
  EXAMPLE_FILE: path.join(
    "./node_modules",
    "docs",
    "kadabra-docs",
    "example",
    "README.md"
  ),
};
export const FILE = {
  DEFAULT_FILENAME: "README.md",
  DIR_MAIN: "main.json",
  TOC: "toc.json",
};
