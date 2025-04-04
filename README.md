# INSTRUCTIONS TO BUILD AND RUN APPLICATION

The application allows users to perform CRUD applications on a table storing information on different foods. It uses a simple Node.js + Express Backend connected to a local MySQL database. The frontend is created using HTML/CSS.

Prerequisites: The following need to be installed

- Node.js
- MySQL Server/ MySQL Workbench

1. Run 'npm install' command in the project root directory
2. Open MySQL Workbench
3. Open the provided 'database.sql' file and click the execute icon to run it
4. Verify that the drud_db database is present and the food table was created with some mock records
5. (Optional) If a different database username and password is being used, update the info in the 'server.js' file.
6. Start the server by running the following command: 'node server.js'
7. Open 'index.html' in a browser to access the Web app
