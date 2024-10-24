export const showHelp = () => {
  console.clear(); // Limpiar consola para mayor legibilidad
  console.log(`
    --- CLI Help Guide ---
  
    This CLI provides five core functionalities to manage categories and documents:
  
    1. **Create Category**

       This option allows you to create a new category. 
       You will be prompted to enter the category name. 
       The CLI will automatically generate a folder in the following path:
       
       \`public/docs/{category-name}/\`
       
       A default \`README.md\` file will also be created inside this folder.
       
       - **Usage**: Enter the category name when prompted. 
       The category name must be unique and within the character limit.
    
    2. **Explore Categories**

       This feature lists all existing categories found under \`public/docs/\`. 
       The categories will be paginated for easy navigation. 
       This is a purely informative step, allowing you to see the available categories.
       
       - **Usage**: Browse through the list of categories or exit when you're done.
    
    3. **Create Document**

       This option requires you to select a category where the document will be created. 
       If no categories exist, the CLI will prompt you to create one first.
       Once you select a category, you will be asked to provide the document name.
       A new folder and a \`README.md\` file will be created inside the selected category, 
       with the following path:
       
       \`public/docs/{category-name}/{document-name}/README.md\`
       
       - **Usage**: Select or search for a category, then provide the document name.
    
    4. **Help**

       Displays this help guide with instructions on how to use the CLI.
    
    5. **Exit**
    
       Exits the CLI.
  
    --- End of Help Guide ---
    `);
};
