# This is a basic SQL editor(SQLPro) made in React.js framework
One can import sql files into the editor, write queries, run queries, get corresponding tables generated and displayed and eventually save the sql file.
Tables can also be exported as csv, pdf, excel.

# Future plans:
Adding support for various different RDBMS.


Clone the repo and run the following:
### `cd atlan`
### `npm install`
### `npm start`

# I have used the following packages:
1. axios -> for requests
2. file-saver -> to save files
3. jspdf -> to export as pdf
4. sheetjs-style -> for handling excel file
5. papaparse -> to parse csv
6. react-pro-sidebar -> for sidebar display
7. react-quill -> for text editor

# We have attached three example queries in "Run" bar:
1. Small query -> Runs fast
2. Medium query -> Takes a second
3. Large query -> Takes a lot of time -> Have used useDeferredValue hook of react to solve slow render issues by adding a delay. It can also improve the speed of an application by delaying state updates.

# The page load time of application = 323 ms
It can be seen in the chrome dev tools > Network

