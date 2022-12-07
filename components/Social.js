import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const Social = props => {
    const [imgUrl, setImgUrl] = useState('');
    const [url, setUrl] = useState('');
    const [uploadImage, setUploadImage] = useState('');

    useEffect(() => {
        setImgUrl(props.img);
        setUrl(props.link);
    }, [])

    const handleFormSubmit = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: `https://galacticblue.net/cheekyginger/backend/public/api/socials/${props.id}`,
            headers: { 'content-type': 'application/json' },
            data: {
                'img_url': imgUrl,
                'url': url
            },
            params: {
                '_method': 'PUT'
            }
        })
        .then(result => {
            swal("Success!", "Social link content successfully updated!", "success")
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    const imageUpload = e => {
        let file = e.target.files[0];
        createImage(file);
    }

    const createImage = (file) => {
        let reader  = new FileReader();
        reader.onload = (e) => {
            setUploadImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    const fileUpload = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://galacticblue.net/cheekyginger/backend/public/api/files',
            headers: { 'content-type': 'application/json' },
            data: {
                'file_name': uploadImage
            }
        })
        .then(result => {
            swal("Success!", "Your image has been uploaded successfully! Please be sure to review all Social information and click on Submit to change your slider image!", "success"),
            setImgUrl(result.data)
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col border border-primary px-2 py-2 my-2">
                    <div className="mb-3">
                        <img src={imgUrl} width="100%" /><br /><br />
                        <form onSubmit={fileUpload}>
                            <input type="file" onChange={imageUpload} />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                    <form onSubmit={e => handleFormSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="urlText" className="form-label">URL</label>
                            <input type="text" className="form-control" id="urlText" name="urlText" required value={url} onChange={e => setUrl(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Social;