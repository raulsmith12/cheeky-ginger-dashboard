import { useEffect, useState } from "react";
import axios from "axios";

const HomeSection = props => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setTitle(props.title);
        setDescription(props.desc);
    }, []);

    const handleFormSubmit = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: `https://galacticblue.net/cheekyginger/backend/public/api/home-sections/${props.id}`,
            headers: { 'content-type': 'application/json' },
            data: { 'title': title, 'description': description },
            params: {
            '_method': 'PUT'
            }
        })
        .then(result => {
            swal("Success!", "Home Section content successfully updated!", "success")
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }
    
    return (
        <>
            <h4>Section {props.id}</h4>
            <form className="border border-primary px-2 py-2" onSubmit={e => handleFormSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="titleText" className="form-label">Title</label>
                    <input type="text" className="form-control" id="titleText" name="titleText" required value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="descText" className="form-label">Description</label>
                    <textarea className="form-control" id="descText" name="descText" required value={description} onChange={e => setDescription(e.target.value)} rows="3" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default HomeSection;