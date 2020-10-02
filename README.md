# clinikk-tv

### Tech Stack: 
Node.js, MongoDB, Amazon s3

### Routes

```/register```: store details of new user in DB with password hashing \
```/login```: user authentication \
```/logout```: log out user and destroy session data \
```/uploadContent```: Allows admins (users with access level 1) to upload audio/video/pictures 
to AWS S3 bucket\
```/feed```: get lastest posts\
```/addToFavourites```: add selected post to favourites 
```/like```: like selected post \ 
```/dislike```: dislike selected post 
