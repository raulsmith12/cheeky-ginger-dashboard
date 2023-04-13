import ProductCard from '../../components/ProductCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      
      const productCards = await axios(
        'https://backend.cheekygingerstudios.com/public/api/products'
      );

      setProducts(productCards.data.data);
    }

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1>Products</h1>
        </div>
      </div>
      <div className="row">
        {products.map(i => {
          return (
            <div className="col-3" key={i.id}>
              <ProductCard title={i.title} img={i.pictures.length > 0 ? i.pictures[0].url : null} id={i.id} />
            </div>
          )
        })}
        <div className="col-3">
          <div className="card mb-2 bg-success text-white">
              <div className="card-body">
                <Link href="products/add/"><a className="text-white card-title text-center" style={{textDecoration: 'none'}}>Add New Product</a></Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
