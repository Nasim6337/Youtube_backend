const fs = require('fs/promises'); 

const deleteFiles = async (files) => {
     try { 
        for (const file of files)
             { await fs.unlink(file); console.log(`File ${file} deleted successfully`); 
            } 
        }
      catch (error) { console.error(`Error deleting file: ${error.message}`);
}}

module.exports=deleteFiles;