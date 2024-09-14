function makePrettyURL(str) {
  // Reemplazar tildes y ñ
  const accentsMap = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    ñ: "n",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
    Ñ: "N",
    ü: "u",
    Ü: "U",
  };

  const accentsRegex = /[áéíóúñÁÉÍÓÚÑüÜ]/g;

  const normalizedStr = str.replace(accentsRegex, (char) => accentsMap[char]);

  // Eliminar caracteres especiales y reemplazar espacios por guiones
  const prettyStr = normalizedStr
    .toLowerCase() // Convertir a minúsculas
    .replace(/[^a-z0-9\s-]/g, "") // Eliminar caracteres especiales
    .trim() // Eliminar espacios al principio y al final
    .replace(/\s+/g, "-"); // Reemplazar espacios por guiones

  return prettyStr;
}

const originalString = "¡Hola, Mundo! Año 2024 está aquí.";
const prettyURL = makePrettyURL(originalString);

console.log(prettyURL); // "hola-mundo-ano-2024-esta-aqui"

module.exports = makePrettyURL;
