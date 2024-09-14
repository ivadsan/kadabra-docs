const { input, select, Separator, rawlist } = require("@inquirer/prompts");

const createCategory = (value) => {
  if (!value) {
    console.log("The field cannot be empty");
    return false;
  }
  if (value.length > 100) {
    console.log("Category must be less than 100 characters");
    return false;
  }

  return value.toLowerCase().split(" ").join("-");
};

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
        createCategory(category)
          ? console.log(`Category '${category}' created!`)
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
