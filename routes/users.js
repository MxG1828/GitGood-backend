const router = require("express").Router();

module.exports = (db) => {
  router.get("/login", (request, response) => {
    const { userName } = request.query;
    console.log(userName);
    db.query(
      `SELECT * FROM users
      WHERE username = $1
      ;`,
      [userName]
    )
      .then((res) => {
        response.json(res);
      })
      .catch((err) => {
        response.json(err);
      });
  });
  router.put("/login", (request, response) => {
    const { userName, active } = request.body;
    db.query(`
    UPDATE users
    SET active = $2
    WHERE username = $1
    RETURNING id, username
    `,[userName, active]).then(res=>{
      response.json(res);
    }).catch(err=>response.json(err))
  });

  router.put("/register", (request, response) => {
    const { userName, password } = request.body;
    db.query(
      `INSERT INTO users(username,password)
    VALUES ($1, $2)
    RETURNING id, username, password, active;`,
      [userName, password]
    )
      .then((res) => {
        response.json(res);
      })
      .catch((error) => response.json(error));
  });
  return router;
};
