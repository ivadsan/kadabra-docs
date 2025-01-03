import { rawlist } from "@inquirer/prompts";
import { createCategory, listCategories } from "./category.js";
import { createDocument } from "./document.js";
import { showHelp } from "./help.js";

export const initCli = async () => {
  let exit = false;

  while (!exit) {
    const answer = await rawlist({
      message: "Select an option",
      choices: [
        { name: "Create category", value: "createCategory" },
        { name: "Explore categories", value: "explore" },
        { name: "Create document", value: "createDoc" },
        { name: "Help", value: "help" },
        { name: "Exit", value: "exit" },
      ],
    });

    switch (answer) {
      case "createCategory":
        await createCategory();
        break;

      case "explore":
        console.log("Exploring categories...\n");
        await listCategories();
        break;

      case "createDoc":
        await createDocument();
        break;

      case "help":
        showHelp();
        break;

      case "exit":
        exit = true;
        console.log("\nExiting the CLI. Goodbye!\n");
        break;

      default:
        console.log("\nInvalid option. Try again.\n");
    }
  }
};

initCli();
