import { useState, useEffect } from 'react';
import axios from 'axios';

const Sizes = props => {
    const [size, setSize] = useState();
    const [price, setPrice] = useState();
    const [sku, setSku] = useState();
    const [paypalId, setPaypalId] = useState();

    useEffect(() => {
        async function fetchData() {
        
            const productStuff = await axios(
                `https://galacticblue.net/cheekyginger/backend/public/api/products/sizes/${props.sizeId}`
            );

            setSize(productStuff.data.data.print_size);
            setPrice(productStuff.data.data.price);
            setSku(productStuff.data.data.sku);
            setPaypalId(productStuff.data.data.paypal_id);
        }

        fetchData();
    }, []);

    const saveChanges = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: `https://galacticblue.net/cheekyginger/backend/public/api/products/sizes/${props.sizeId}`,
            headers: { 'content-type': 'application/json' },
            data: {
                'print_size': size,
                'price': price,
                'sku': sku,
                'paypal_id': paypalId
            },
            params: {
                '_method': 'PUT'
            }
        })
        .then(result => {
            swal("Success!", "Print Size information has been successfully updated!", "success")
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <form onSubmit={e => saveChanges(e)}>
            <div className="container">
                <div className="row mb-3">
                    <div className="col-12">
                        <label htmlFor="size" className="form-label">Size</label>
                        <input type="text" className="form-control" id="size" name="size" required value={size} onChange={e => setSize(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <label htmlFor="price" className="form-label">Price</label>
                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input type="text" className="form-control" id="price" name="price" required value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="sku" className="form-label">SKU</label>
                        <input type="text" className="form-control" id="sku" name="sku" required value={sku} onChange={e => setSku(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <label htmlFor="paypalId" className="form-label">PayPal ID</label>
                        <input type="text" className="form-control" id="paypalId" name="paypalId" required value={(paypalId !== null ? paypalId : '')} onChange={e => setPaypalId(e.target.value)} />
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-success">Save Changes</button>
        </form>
    )
}

export default Sizes;