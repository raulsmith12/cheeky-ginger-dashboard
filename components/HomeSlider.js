import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const HomeSlider = props => {
    const [imgUrl, setImgUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [position, setPosition] = useState();
    const [uploadImage, setUploadImage] = useState('');

    useEffect(() => {
        setImgUrl(props.imgUrl);
        setTitle(props.title);
        setDescription(props.description);
        setUrl(props.url);
        setPosition(props.position);
    }, [])

    const handleFormSubmit = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: `https://backend.cheekygingerstudios.com/public/api/home-sliders/${props.id}`,
            headers: { 'content-type': 'application/json' },
            data: {
                'img_url': imgUrl,
                'title': title,
                'description': description,
                'url': url,
                'position': position
            },
            params: {
                '_method': 'PUT'
            }
        })
        .then(result => {
            swal("Success!", "Home Slider content successfully updated!", "success")
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
            url: 'https://backend.cheekygingerstudios.com/public/api/files',
            headers: { 'content-type': 'application/json' },
            data: {
                'file_name': uploadImage
            }
        })
        .then(result => {
            swal("Success!", "Your image has been uploaded successfully! Please be sure to review all Home Slider information and click on Submit to change your slider image!", "success"),
            setImgUrl(result.data)
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <div className="row border border-primary px-2 py-2 my-2">
            <div className="col-6">
                <form onSubmit={e => handleFormSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="titleText" className="form-label">Title</label>
                        <input type="text" className="form-control" id="titleText" name="titleText" required value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descriptionText" className="form-label">Description</label>
                        <textarea className="form-control" id="descriptionText" name="descriptionText" required value={description} onChange={e => setDescription(e.target.value)} rows="2" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="urlText" className="form-label">URL (where will people go when you click on this link?)</label>
                        <input type="text" className="form-control" id="urlText" name="urlText" required value={url} onChange={e => setUrl(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="positionText" className="form-label">Slider Position</label>
                        <input type="number" className="form-control" id="positionText" name="positionText" required value={position} onChange={e => setPosition(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="col-6">
                <img src={imgUrl} width="100%" /><br /><br />
                <form onSubmit={fileUpload}>
                    <input type="file" onChange={imageUpload} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    )
}

export default HomeSlider;