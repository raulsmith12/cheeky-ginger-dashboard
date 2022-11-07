import { useState, useEffect } from 'react';
import axios from 'axios';
import Sizes from './Sizes';
import { useRouter } from 'next/router';

const Print = props => {
    const router = useRouter();
    const [prints, setPrints] = useState([]);
    const [showFormGroup, setShowFormGroup] = useState();
    const [tempSize, setTempSize] = useState();
    const [tempSku, setTempSku] = useState();
    const [tempPrice, setTempPrice] = useState();
    const [tempId, setTempId] = useState();
    const [tempPrint, setTempPrint] = useState();

    useEffect(() => {
        async function fetchData() {
        
            const productStuff = await axios(
                `https://galacticblue.net/cheekyginger/backend/public/api/products/${props.productId}`
            );

            setPrints(productStuff.data.data.prints);
        }

        fetchData();
    }, []);

    const addNewPrint = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://galacticblue.net/cheekyginger/backend/public/api/products/prints',
            headers: { 'content-type': 'application/json' },
            data: {
                'product_id': props.productId,
                'print_type': tempPrint
            }
        })
        .then(result => {
            swal("Success!", "Print type information has been added updated!", "success");
            setPrints(prints => [...prints, tempPrint]);
            setTimeout(() => {
                setTempPrint();
            }, 3500);
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    const addNewSize = (e, id) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://galacticblue.net/cheekyginger/backend/public/api/products/sizes',
            headers: { 'content-type': 'application/json' },
            data: {
                'product_print_id': id,
                'print_size': tempSize,
                'price': tempPrice,
                'sku': tempSku,
                'paypal_id': tempId
            }
        })
        .then(result => {
            swal("Success!", "Print Size information has been added!", "success");
            setTimeout(() => {
                router.push("products");
            }, 3500);
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <div className="row">
            {prints.map(i => {
                return (
                    <div className="col-12 d-grid gap-2" key={i.id}>
                        <button type="button" className="btn btn-primary my-2" onClick={() => setShowFormGroup(i.id)}>
                            <h4>{i.print_type}</h4>
                        </button>
                        <div className={"row " + (showFormGroup === i.id ? "show" : "hidden")}>
                            <div className="col-12">
                                <div className="container">
                                    <div className="row">
                                        {i.sizes.map(s => {
                                            return (
                                                <div className="col-2 mb-3 py-2 mx-1 border border-primary" key={s.id}>
                                                    <Sizes sizeId={s.id} />
                                                </div>
                                            )
                                        })}
                                        <div className="col-2 mb-3 py-2 mx-1 border border-primary">
                                            <form onSubmit={e => addNewSize(e, i.id)}>
                                                <div className="row mb-3">
                                                    <div className="col-12">
                                                        <label htmlFor="size" className="form-label">Size</label>
                                                        <input type="text" className="form-control" id="size" name="size" required value={(tempSize !== null ? tempSize : '')} onChange={e => setTempSize(e.target.value)} />
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="price" className="form-label">Price</label>
                                                        <div className="input-group">
                                                            <span className="input-group-text">$</span>
                                                            <input type="text" className="form-control" id="price" name="price" required value={(tempPrice !== null ? tempPrice : '00.00')} onChange={e => setTempPrice(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="sku" className="form-label">SKU</label>
                                                        <input type="text" className="form-control" id="sku" name="sku" required value={(tempSku !== null ? tempSku : '')} onChange={e => setTempSku(e.target.value)} />
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="paypalId" className="form-label">PayPal ID</label>
                                                        <input type="text" className="form-control" id="paypalId" name="paypalId" value={(tempId !== null ? tempId : '')} onChange={e => setTempId(e.target.value)} />
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-success">Add New Size</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <form onSubmit={e => addNewPrint(e)}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Add New Print?" onChange={e => setTempPrint(e.target.value)} value={(tempPrint !== null ? tempPrint : '')} />
                    <button className={"btn " + (!tempPrint ? "btn-outline-success disabled" : "btn-success")} type="submit">Add New Print</button>
                </div>
            </form>
        </div>
    )
}

export default Print;