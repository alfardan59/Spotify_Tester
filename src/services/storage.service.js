const { ImageKit } =require("@imagekit/nodejs")

const ImageKitClient = new ImageKit({
    privatekey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file){
    const result = await ImageKitClient.files.upload({
        file,
        fileName:"music"+Date.now(),
        folder: "project2/music"
    })
    return result
}

module.exports = { uploadFile };