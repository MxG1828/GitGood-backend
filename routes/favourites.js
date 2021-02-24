const router = require("express").Router();

module.exports = (db) => {
  router.get("/favourites/", (request, response) => {
    const { userId } = request.query;
    db.query(
      `SELECT * FROM favourites
      JOIN repositories ON (repository_id = repositories.id)
      WHERE user_id = $1
      ;`,
      [Number(userId)]
    ).then((res) => {
      response.json(res.rows);
    });
  });

  router.put("/favourites", (request, response) => {
    console.log("requesting");
    const {
      repoid,
      username,
      repoName,
      repoLanguage,
      repoDescription,
      gitAvatar,
      repoOwner,
    } = request.body;
    db.query(
      `INSERT INTO repositories(id, reponame, repolanguage,repodescription,gitAvatar, repoowner)
    VALUES ($1, $2, $3, $4, $5, $6 ) ON CONFLICT (id) do nothing;`,
      [repoid, repoName, repoLanguage, repoDescription, gitAvatar, repoOwner]
    )

      .then((res) => {
        db.query(
          `
          INSERT INTO favourites (user_id, repository_id)
           VALUES ($1,$2 )
          ;`,

          [username, repoid]
        ).then((res) => {
          console.log("requested");
          response.json(res);
        });
      })
      .catch((error) => console.log(error));
  });

  router.delete("/favourites/:repo_id/:user_id", (request, response) => {
    const param = [
      request.params.repo_id,
      request.params.user_id,
    ];
    db.query(
      `DELETE FROM favourites
    WHERE repository_id = $1
    AND user_id = $2`,
      param
    ).then(() => {
      response.status(204).json({});
    });
  });

  return router;
};
