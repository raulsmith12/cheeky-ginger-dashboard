import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ProductTags = props => {
    const router = useRouter();
    const [tagField, setTagField] = useState();
    const [activeField, setActiveField] = useState()
    const [tags, setTags] = useState([]);

    useEffect(() => {
        async function fetchData() {
        
            const productStuff = await axios(
                `https://galacticblue.net/cheekyginger/backend/public/api/products/${props.productId}`
            );
            setTags(productStuff.data.data.tags);
        }

        fetchData();
    }, []);

    const updateTag = (e) => {
        axios({
            method: 'post',
            url: `https://galacticblue.net/cheekyginger/backend/public/api/products/tags/${e}`,
            headers: { 'content-type': 'application/json' },
            data: {
                'tag': tagField
            },
            params: {
                '_method': 'PUT'
            }
        })
        .then(result => {
            swal("Success!", "Tag successfully updated!", "success")
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    const deleteTag = (e) => {
        swal({
            title: `Are you sure you want to delete this?`,
            text: 'Once deleted, this file cannot be recovered!',
            icon: 'warning',
            dangerMode: true
        })
        .then((willDelete) => {
            if (willDelete) {
                axios({
                    method: 'delete',
                    url: `https://galacticblue.net/cheekyginger/backend/public/api/products/tags/${e}`
                })
                .then(result => {
                    swal("Success!", "Your tag has been deleted!", "success"),
                    setTimeout(() => {
                        router.push("products/" + props.productId)
                    }, 3500);
                })
                .catch(error => swal("Uh oh! Something went wrong. Please try again."))
            }
        })
    }

    const addTag = () => {
        axios({
            method: 'post',
            url: 'https://galacticblue.net/cheekyginger/backend/public/api/products/tags/',
            headers: { 'content-type': 'application/json' },
            data: {
                'tag': tagField
            }
        })
        .then(result => {
            swal("Success!", "Tag successfully added!", "success"),
            setTimeout(() => {
                router.push("products/" + props.productId)
            }, 3500);
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <div className="row">
            {tags.map(i => {
                return (
                    <div className="col-4">
                        <div className="input-group" id={'field-' + i.id}>
                            <input type="text" className="form-control" placeholder={i.tag} onFocus={() => setActiveField('field-' + i.id)} onChange={e => setTagField(e.target.value)} />
                            <button className={"btn " + (!tagField || activeField !== ('field-' + i.id) ? 'btn-outline-success disabled' : 'btn-success')} onClick={() => updateTag(i.id)}>Save</button>
                            <button className={"btn " + (!tagField || activeField !== ('field-' + i.id) ? 'btn-outline-danger disabled' : 'btn-danger')} onClick={() => deleteTag(i.id)}>Remove</button>
                        </div>
                    </div>
                )
            })}
            <div className="col-4">
                <div className="input-group" id="field-new">
                    <input type="text" className="form-control" placeholder="Insert New Tag Here" onFocus={() => setActiveField('field-new')} onChange={e => setTagField(e.target.value)} />
                    <button type="button" className={"btn " + (!tagField || activeField !== ('field-new') ? 'btn-outline-success disabled' : 'btn-success')} onClick={() => addTag()}>Save</button>
                    <button className={"btn " + (!tagField || activeField !== ('field-new') ? 'btn-outline-danger disabled' : 'btn-danger')} onClick={() => setTagField()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ProductTags;