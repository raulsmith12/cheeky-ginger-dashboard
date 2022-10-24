import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProductInfo from '../../components/ProductInfo';
import ProductPictures from '../../components/ProductPictures';

const Product = () => {
    const router = useRouter();
    const { id } = router.query;
    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    const [pictures, setPictures] = useState([]);
    const [tags, setTags] = useState([]);
    const [prints, setPrints] = useState([]);

    useEffect(() => {
        async function fetchData() {
        
            const productStuff = await axios(
                `https://galacticblue.net/cheekyginger/backend/public/api/products/${id}`
            );

            setTitle(productStuff.data.data.title);
            // setCategory(productStuff.data.data.category);
            // setDescription(productStuff.data.data.description);
            // setPictures(productStuff.data.data.pictures);
            // setPrints(productStuff.data.data.prints);
            // setTags(productStuff.data.data.tags);

            // console.log(productStuff.data.data);
        }

        fetchData();
    }, []);

    return (
        <div className="container-fluid">
            <h2 className="display-2">{title}</h2>
            <ProductInfo productId={id} />
            <h4>Pictures</h4>
            <ProductPictures productId={id} />
        </div>
    )
}

export default Product;