const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");

// async function createMusic(req,res){

//     const token = req.cookies.token;

//     if(!token){
//         return res.status(401).json({message:"Unautorized"})
//     }

//     try {

//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         // console.log(decoded);

//         if(decoded.role!=='artist'){
//             return res.status(403).json({message:"you don't have access to create music"})
//         }

//         const {title}=req.body;
//         const file=req.file;

//         const result=await uploadFile(file.buffer.toString('base64'))

//         const music = await musicModel.create({
//             uri:result.url,
//             title,
//             artist:decoded.id,
//         })

//         res.status(201).json({
//             message:"Music created successfully!",
//             music:{
//                 id:music._id,
//                 uri:music.uri,
//                 title:music.title,
//                 artist:music.artist
//             }
//         })

//     } catch (error) {
//         console.log(error)

//         res.status(401).json({message:"Unautorized!"})

//     }
// }

// async function createAlbum(req,res){
//     const token =req.cookies.token;

//     if(!token){
//         return res.status(401).json({message:"Unautorized!"})
//     }

//     try {

//         const decoded=jwt.verify(token, process.env.JWT_SECRET)

//         if(decoded.role!=="artist"){
//             return res.status(403).json({message:"You don't have access to create an album"})
//         }

//         const {title, musics}=req.body;

//         const album = await albumModel.create({
//             title,
//             artist:decoded.id,
//             musics:musics,
//         })

//         res.status(201).json({
//             message:"album created successfully",
//             album:{
//                 id:album._id,
//                 title:album.title,
//                 artist:album.artist,
//                 musics:album.musics,
//             }
//         })
//     } catch (error) {
//         console.error(error);
//         return res.status(401).json({message:"Unautorized!"})
//     }
// }

//We will be optmizing the code as both of them have almost same logic and are having repetative code lines so to optmize it we will be creating a middleware

async function createMusic(req, res) {

  const { title } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Music created successfully!",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

async function createAlbum(req, res) {
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics,
  });

  res.status(201).json({
    message: "album created successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics,
    },
  });
}


async function getAllMusics(req,res){
    const musics=await musicModel
    .find()
    .skip(2) //here we are telling how many songs we need to skip
    .limit(20) //Here we are giving the limit of 20 that only 20 songs will be fetched from DB to the server
    .populate("artist","username email")

    res.status(200).json({
        message:"Music fetched successfully!",
        musics:musics
    })
}

async function getAllAlbums(req,res){

    const albums=await albumModel.find().select("title artist").populate("artist","username email")

    res.status(200).json({
        message:"Album fetched successfully!",
        albums:albums
    })
}

async function getAllAlbumById(req,res){

    const albumId = req.params.albumId;

    const albums=await albumModel.findById(albumId).populate("artist","username email").populate("musics")

    return res.status(200).json({
        message:"Album fetched successfully!",
        albums:albums
    })
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums,getAllAlbumById};
