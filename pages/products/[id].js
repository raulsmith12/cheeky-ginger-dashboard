import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProductInfo from '../../components/ProductInfo';
import ProductPictures from '../../components/ProductPictures';
import ProductTags from '../../components/ProductTags';
import Print from '../../components/Print';

const Product = () => {
    const router = useRouter();
    const { id } = router.query;
    const [title, setTitle] = useState();

    useEffect(() => {
        async function fetchData() {
        
            const productStuff = await axios(
                `https://galacticblue.net/cheekyginger/backend/public/api/products/${id}`
            );

            setTitle(productStuff.data.data.title);
        }

        fetchData();
    }, []);

    return (
        <div className="container-fluid">
            <h2 className="display-2">{title}</h2>
            <ProductInfo productId={id} />
            <hr />
            <h4>Pictures</h4>
            <ProductPictures productId={id} />
            <hr />
            <h4>Tags</h4>
            <ProductTags productId={id} />
            <hr />
            <h4>Print Styles, Sizes, and Prices</h4>
            <Print productId={id} />
        </div>
    )
}

export default Product;