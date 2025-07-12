const fs = require("fs");
const path = require("path");

const getAllVideos = async (req, res) => {
    try {
        const videoDirectory = path.join(__dirname, "..", "videos");
        const files = fs.readdirSync(videoDirectory);

        const mp4Files = files.filter(
            (file) => path.extname(file).toLowerCase() === ".mp4"
        );

        const videoList = mp4Files.map((file) => ({
            id: path.parse(file).name,
            name: file,
        }));

        res.status(200).json({
            status: "success",
            data: videoList,
        });
    } catch (err) {
        console.error("Error fetching video list:", err);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch video list",
        });
    }
};


const getVideoStream = async (req, res) => {
    try {
        let id = req.query.id; 
     
        const range = req.headers.range;
        if (!range) {
            res.status(400).send("Missing range header");
        }

        const videoPath = "videos/" + id + ".mp4"; 
        const videoSize = fs.statSync("videos/" + id + ".mp4").size; 

      
        const CHUNK_SIZE = 5 ** 6; 
        let start = Number(range.replace(/\D/g, ""));
        let end = Math.min(start + CHUNK_SIZE, videoSize - 1);

      
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);

      
        const videoStream = fs.createReadStream(videoPath, { start, end });

        videoStream.pipe(res);
    } catch (err) {
        console.log(err);
    }
};

const getThumbnail = async (req, res) => {
    try {
        const { videoId } = req.query;
        if (!videoId) {
            return res.status(400).json({ error: 'Video ID is required' });
        }
        const thumbnailPath = path.join(__dirname, '..', 'thumbnails', `${videoId}.jpg`);       
        if (!fs.existsSync(thumbnailPath)) {
           await generateThumbnailUtil(videoId)
        }

        
        res.sendFile(thumbnailPath);


    } catch (err) {

    }
}



module.exports = {
    getAllVideos,
    getVideoStream,
    getThumbnail,
};
