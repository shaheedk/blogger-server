import ImageKit from "imagekit";

// or

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.,
    privateKey : "your_private_api_key",
    urlEndpoint : "https://ik.imagekit.io/your_imagekit_id/"
});