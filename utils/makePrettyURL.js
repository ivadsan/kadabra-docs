export function makePrettyURL(str) {
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

  const prettyStr = normalizedStr
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return prettyStr;
}
