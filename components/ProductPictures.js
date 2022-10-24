import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductPictures = props => {
    const [pictures, setPictures] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        async function fetchData() {
        
            const productStuff = await axios(
                `https://galacticblue.net/cheekyginger/backend/public/api/products/${props.productId}`
            );

            setPictures(productStuff.data.data.pictures);
        }

        fetchData();
    }, []);

    const addImageToProduct = (file) => {
        axios({
            method: 'post',
            url: 'https://galacticblue.net/cheekyginger/backend/public/api/products/pictures',
            headers: { 'content-type': 'application/json' },
            data: {
                'product_id': props.productId,
                'url': file
            }
        })
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
            addImageToProduct(result.data)
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <div className="row">
            {pictures.map(i => {
                return (
                    <div className="col-2 border border-primary py-2" key={i.id}>
                        <img src={i.url} width="100%" /><br /><br />
                        <button type="button" className="btn btn-danger btn-lg">Remove Picture</button>
                    </div>
                )
            })}
            <div className="col-2">
                <button type="button" className="btn btn-success btn-lg" onClick={e => setShowForm(true)}>Add Picture</button>
                {showForm && (
                    <form onSubmit={fileUpload}>
                        <input type="file" onChange={imageUpload} />
                        <button type="submit">Upload</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ProductPictures;