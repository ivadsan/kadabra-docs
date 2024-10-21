import { CONFIG } from "../constants/config.js";

export const validateInput = (value) => {
  if (!value) {
    console.log(`\n\u{1F7E1} The field cannot be empty\n`);
    return false;
  }
  if (value.length > CONFIG.MAX_FILENAME_LENGTH) {
    console.log(
      `\n\u{1F7E1} Must be less than ${CONFIG.MAX_FILENAME_LENGTH} characters\n`
    );
    return false;
  }
  return true;
};
