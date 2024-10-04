const { input, select, Separator, rawlist } = require("@inquirer/prompts");
const createCategory = require("./createCategory");
const listCategories = require("./listCategories");
const initCli = async () => {
  let exit = false;

  while (!exit) {
    const answer = await rawlist({
      message: "Select an option",
      choices: [
        { name: "Create category", value: "createCategory" },
        { name: "Create document", value: "createDoc" },
        { name: "Explore categories", value: "explore" },
        { name: "Help", value: "help" },
        { name: "Exit", value: "exit" },
      ],
    });

    switch (answer) {
      case "createCategory":
        const category = await input({
          message: "Enter the name of the category",
        });

        const response = createCategory(category);
        response
          ? console.log(`\n\u2705 Category '${category}' created!\n`)
          : null;
        break;

      case "createDoc":
        const documentName = await input({
          message: "Enter the name of the document",
        });
        console.log(`Document '${documentName}' created!`);
        break;

      case "explore":
        console.log("Exploring categories...");
        listCategories();
        break;

      case "help":
        console.log("Showing help...");
        break;

      case "exit":
        exit = true;
        console.log("Exiting the CLI. Goodbye!");
        break;

      default:
        console.log("Invalid option. Try again.");
    }
  }
};

initCli();
