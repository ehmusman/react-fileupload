const express = require('express');
const fileUpload = require('express-fileupload');

const app = express()

app.use(fileUpload())

// upload endpoint
app.post('/upload', (req, res) => {
    console.log('Before')
    console.log(req.files)
    if (req.files === null) return res.status(400).send("No File Uploaded")
    console.log('Before')

    const file = req.files.file

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        console.log('mid')
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
    })
    console.log('Final')

    res.json({
        fileName: file.name,
        filePath: `/uploads/${file.name}`
    })

})

app.listen(5000, () => console.log("Server Started...."))
