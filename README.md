# belly-button-biodiversity
In this project, I created an user-interative website using index.html, charts.js and the sample.json data file. 
<br \> Since we have the sample.json data file which is an external file, browsers by default do not permit reading of resources from multiple sources. This is known as the CORS error message which stands for Cross-Origin Resources Sharing.To bypass this error, we need to first nevigate to the directory where index.html is located and ran `python -m http:server` in the CLI.

<br \> To better understand the issue, think about when a user is logging in on a website. The server receives the user's information, compares it against information in its database, and approves or denies the login attempt. This is called the request-response model. Running `python -m http:server` helps us skirt this restriction. Pthon's HTTP server provides a web address for both the JSON and HTML files to avoid these security issues.
