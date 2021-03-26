import React, { useState } from 'react'
import axios from 'axios'
import fileUpload from 'express-fileupload';
const FileUpload = () => {
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState('Choose File')
    const [uploadedFile, setUploadedFile] = useState({})
    const onChange = (e) => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }
    const onSubmit = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file) // first file is important name because at end point we are getting it by the name req.body.file, second file is the state which have the file data which we have selected

        try {
            const res = await axios.post("/upload", formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
            console.log(res.data)
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath })


        } catch (err) {
            console.log(err.response)
            if (err.response.status === 500) {
                console.log("There was a problem with the server")
            } else {
                console.log(err.response.data)
            }
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="custom-file">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
            </form>
            {uploadedFile ? (
                <div className="col-md-6 mt-5">
                    <h3 className="text-center">{uploadedFile.fileName}</h3>
                    <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
                </div>
            ) : null}
        </>
    )
}

export default FileUpload
