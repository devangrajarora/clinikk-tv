# clinikk-tv

### Tech Stack: 
Node.js, MongoDB, Amazon s3

### Routes

```/register```: store details of new user in DB with password hashing <br />
```/login```: user authentication  <br />
```/logout```: log out user and destroy session data  <br />
```/uploadContent```: Allows admins (users with access level 1) to upload audio/video/pictures 
to AWS S3 bucket <br />
```/feed```: get lastest posts <br />
```/addToFavourites```: add selected post to favourites <br />
```/myFavourites```: view your favourite posts <br />
```/like```: like selected post <br />
```/dislike```: dislike selected post <br />
 

