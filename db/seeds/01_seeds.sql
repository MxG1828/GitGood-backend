INSERT INTO users (username,password) 
VALUES ('test','test'),
      ('test1','test1')
;


INSERT INTO repositories(id,repoowner,reponame,repolanguage,repodescription,gitAvatar)
VALUES(5,'kvnchu2','1RMCalculator', 'HTML', 
'This is a calculator I created to calculate your 1 repetition maximum for any exercise, that is based on the weight and number of repetitions you can complete. Epley"s equation is used for the calculation.', 
'https://avatars.githubusercontent.com/u/62811480?s=460&u=7fe7a26890fca097c2797c905da718d83c16a48d&v=4')
;

INSERT INTO favourites (user_id, repository_id)
VALUES (1,5)