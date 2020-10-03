# clinikk-tv

### Tech Stack: 
Node.js, MongoDB, Amazon s3

### Routes

```/register```: store details of new user in DB with password hashing <br />
```/login```: user authentication and creating user session <br />
```/logout```: log out user and destroy session data  <br />
```/uploadContent```: Allows admins (users with access level 1) to upload audio/video/pictures 
to AWS S3 bucket and stores post information in database <br />
```/feed```: gets list of lastest posts from database with s3 link which can be used to display media content on the frontend<br />
```/addToFavourites```: add selected post to favourites <br />
```/myFavourites```: view your favourite posts <br />
```/like```: like selected post <br />
```/dislike```: dislike selected post <br />
```/contentByCategory```: gets posts tagged under specified category <br />
 

