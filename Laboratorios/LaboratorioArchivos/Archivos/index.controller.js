const multer = require('multer'); // Using Promise API
const log = console.log;


module.exports.upload_file = async (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ code: 500, msg: "Error uploading file" });
        }

        console.log("Upload Successful:", req.files); // Log uploaded files
        res.status(200).json({ code: 200, msg: "Ok" });
    });
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("File Destination:", './private/'); // Log the destination path
        callback(null, './private/');
    },
    filename: function (req, file, callback) {
        console.log("Uploaded File:", req.body); // Log received form data
        return callback(null, file.originalname);
    }
});

module.exports.get_private_file = async (req, res) => {
    // Saneamos el nombre para evitar path traversal (ver nota de seguridad abajo)
    const fileName = path.basename(req.params.file);
    const filePath = path.join(__dirname, './private', fileName);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("sendFile error:", err.message);
            res.status(404).json({ code: 404, msg: "Archivo no encontrado" });
        }
    });
}

const upload = multer({ storage: storage }).array('file', 3); // 3 archivos maximo



module.exports.upload = upload;