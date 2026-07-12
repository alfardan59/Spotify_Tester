const { ImageKit } =require("@imagekit/nodejs")

const ImageKitClient = new ImageKit({
    privatekey: process.env.IMAGEKIT_PRIVATE_KEY
})