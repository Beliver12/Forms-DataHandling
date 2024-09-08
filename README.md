# Forms-DataHandling

I made a form with ``GET`` method in ``createUser.ejs`` and 
in action to accept name ```action="/<%= user.firstName %>/search"```

than created new route wich accepts ``GET`` request ```usersRouter.get("/:firstName/search", usersController.usersSearchGet);```
