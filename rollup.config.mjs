import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss"; // Procesa SCSS a CSS

export default {
  input: "src/App.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-react"],
      babelHelpers: "bundled",
    }),
    commonjs(),
    postcss({
      extensions: [".css", ".scss"], // Archivos que manejará el plugin
      extract: true, // Si es true, genera un archivo CSS separado
      minimize: true, // Minimizar el CSS resultante
      use: [
        [
          "sass",
          {
            includePaths: ["./src/styles"], // Ruta opcional si tienes variables globales u otros archivos SCSS
          },
        ],
      ],
    }),
  ],
  external: ["react", "react-dom"],
};
