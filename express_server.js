// const { req, res } = require('express');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080; // default port 8080

//set view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const urlDatabase = {
  'b2xVn2': 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com'
};

function generateRandomString() {
  return Math.random().toString(16).substr(2, 6);
}
//landing page
app.get("/", (req, res) => {
  res.redirect('/urls');
});

//URL page
app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

//****POST REQUESTS
//add URL
app.post('/urls', (req, res) => {
  let shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  console.log(urlDatabase);
  res.redirect(`/urls/${shortURL}`);
});

//delete
app.post('/urls/:shortURL/delete', (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
})
//edit
app.post('/urls/:shortURL', (req, res) => {
  const redirURL = req.params.shortURL;
  urlDatabase[redirURL] = req.body.longURL;
  res.redirect(`/urls/${redirURL}`);
});

//routes
//urls route
app.get('/urls/:shortURL', (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render('urls_show', templateVars);
});
//route for shortened link
app.get('/u/:shortURL', (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
})

//LISTEN
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});





// const express = require("express");
// const app = express();
// const PORT = 8080;
// const bodyParser = require("body-parser");
// const cookieSession = require("cookie-session");
// const bcrypt = require("bcrypt");
// const { urlDatabase, userDatabase, randoString } = require("./helpers");


// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(cookieSession({
//   name: "session",
//   keys: ["house-key", "car-key", "egg"]
// }));

// const urlDatabase = {
//   "b2xVn2": "http://www.lighthouselabs.ca",
//   "9sm5xK": "http://www.google.com"
// };


// app.get("/", (req, res) => {
//   res.send("Hello!");
// });

// app.get("/urls.json", (req, res) => {
//   res.json(urlDatabase);
// });

// app.get("/hello", (req, res) => {
//   res.send("<html><body>Hello <b>World</b></body></html>\n");
// });

// app.get("/urls", (req, res) => {
//   const templateVars = { urls: urlDatabase };
//   res.render("urls_index", templateVars);
// });

// app.get("/urls/new", (req, res) => {
//   res.render("urls_new");
// });

// app.get("/urls/:shortURL", (req, res) => {
//   const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
//   res.render("urls_show", templateVars);
// });

// app.post("/urls", (req, res) => {
//   console.log(req.body);
//   res.send("Ok");
// });

// app.get("/u/:shortURL", (req, res) => {
//   const longURL = urlDatabase[req.params.shortURL];
//   res.redirect(longURL);
// });

// app.post("/urls/:shortURL/delete", (req, res) =>{
//   delete urlDatabase[req.params.shortURL];
//   console.log(urlDatabase);
//   res.redirect("/urls");
// });


// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });