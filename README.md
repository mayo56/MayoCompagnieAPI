# MayoAPI
> MayoStream
Service de streaming comme YouTube
```
/stream
```
Base de l'url
## Obtenir les informations de vidéos
`GET`
```
/stream/info/:id
```
Renvoie: 
### __Si existante__
`status:200`
```json
{
  "data" : {
    "id" : "id de la vidéo",
    "name" : "nom de la vidéo",
    "extention" : "extention de fichier vidéo",
  }
}
```
### __Si inexistante__ 
`status:404`
```json
{
  "error": "video not found"
}
```
## Obtenir la vidéo
`GET`
```
/stream/:id
```
Renvoie: 
### __Si existante__
`status:200`
```
Fichier vidéo
```
### __Si inexistante__ 
`status:404`
```
Error: ENOENT: no such file or directory
```
## Poster une vidéo
`POST`
```
/stream/post
```
__Requit:__
```json
{
  "file" : "ici, le fichier vidéo"
}
```
Renvoie: 
### __Si existante__
`status:200`
```txt
Ok !
```
### __Si inexistante__ 
`status:401`
```json
{
  "error": "Don't have video"
}
```
