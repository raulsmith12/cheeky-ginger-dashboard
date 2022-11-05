import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductInfo = props => {
    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    
    useEffect(() => {
        async function fetchData() {
        
            const productStuff = await axios(
                `https://galacticblue.net/cheekyginger/backend/public/api/products/${props.productId}`
            );

            setTitle(productStuff.data.data.title);
            setCategory(productStuff.data.data.category);
            setDescription(productStuff.data.data.description);
        }

        fetchData();
    }, []);

    const handleProductEdit = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: `https://galacticblue.net/cheekyginger/backend/public/api/products/${props.productId}`,
            headers: { 'content-type': 'application/json' },
            data: {
                'title': title,
                'category': category,
                'description': description
            },
            params: {
                '_method': 'PUT'
            }
        })
        .then(result => {
            swal("Success!", "Product info successfully updated!", "success")
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <form onSubmit={e => handleProductEdit(e)}>
            <div className="row">
                <div className="col-6 mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" required defaultValue={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" className="form-control" id="category" name="category" required defaultValue={category} onChange={e => setCategory(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" required defaultValue={description} onChange={e => setDescription(e.target.value)} rows="3" />
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </div>
        </form>
    )
}

export default ProductInfo;