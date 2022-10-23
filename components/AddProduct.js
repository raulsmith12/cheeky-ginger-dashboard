import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddProduct = props => {
    const router = useRouter();
    const [title, setTitle] = useState(props.title);
    const [category, setCategory] = useState(props.category);
    const [description, setDescription] = useState(props.description);
    const [route, setRoute] = useState();

    const handleProductAdd = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://galacticblue.net/cheekyginger/backend/public/api/products/',
            headers: { 'content-type': 'application/json' },
            data: {
                'title': title,
                'category': category,
                'description': description
            }
        })
        .then(result => {
            setRoute(result.data.data.id);
            swal("Success!", "Product info successfully updated!", "success");
            setTimeout(() => {
                router.push("products/" + route)
            }, 3500);
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <form onSubmit={e => handleProductAdd(e)}>
            <div className="row">
                <div className="col-6 mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" required value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" className="form-control" id="category" name="category" required value={category} onChange={e => setCategory(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" required value={description} onChange={e => setDescription(e.target.value)} rows="3" />
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </div>
        </form>
    )
}

export default AddProduct;