// controllers/usersController.js
const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be formatted properly."
const aplhaNumericErr = "must only contain numbers."
const ageLengthErr = "must be between 18 and 120 characters."
const bioLength = "cant be above 200 characters."

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
    
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

const validateUser = [
    body("firstName").trim()
      .isAlpha().withMessage(`First name ${alphaErr}`)
      .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
    body("lastName").trim()
      .isAlpha().withMessage(`Last name ${alphaErr}`)
      .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
    body("email").trim()
      .isEmail().withMessage(`Email ${emailErr}`),
    body("age").trim()
      .isAlphanumeric().withMessage(`Age ${aplhaNumericErr}`)
      .isInt({min: 18, max: 120}).withMessage(`Age ${ageLengthErr}`),
    body("bio").trim()
      .isLength({max: 200}).withMessage(`Bio ${bioLength}`)
  ];

  exports.usersCreatePost = [
    validateUser,
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("createUser", {
          title: "Create user",
          errors: errors.array(),
        });
      }
      const { firstName, lastName, email, age, bio } = req.body;
      usersStorage.addUser({ firstName, lastName, email, age, bio});
      
      res.redirect("/");
    }
  ];

  exports.usersUpdateGet = (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    console.log(user)
    res.render("updateUser", {
      title: "Update user",
      user: user,
    });
  };
  
  exports.usersUpdatePost = [
    validateUser,
    (req, res) => {
      const user = usersStorage.getUser(req.params.id);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("updateUser", {
          title: "Update user",
          user: user,
          errors: errors.array(),
        });
      }
      const { firstName, lastName, email, age, bio } = req.body;
      usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
      res.redirect("/");
    }
  ];
  
  // Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = (req, res) => {
    usersStorage.deleteUser(req.params.id);
    res.redirect("/");
  };

  exports.usersSearchGet = (req, res) => {
    //const user = usersStorage.getUser(req.params.id);
   // console.log(req.query.firstName)
    const user = usersStorage.searchUser(req.query.firstName)
    //console.log(user);
    res.render("search", {
      title: "Search user",
      user: user,
     
    });
  }