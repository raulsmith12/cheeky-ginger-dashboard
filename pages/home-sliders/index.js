import Link from 'next/link'
import HomeSlider from '../../components/HomeSlider'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    async function fetchData() {

      const homeSliders = await axios('https://galacticblue.net/cheekyginger/backend/public/api/home-sliders');

      setSliders(homeSliders.data.data);
    }

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1>Home Sliders</h1>
          <h5>These are the images that will show up in the image carousel</h5>
        </div>
      </div>
      {sliders.map(i => {
        return (
          <HomeSlider id={i.id} imgUrl={i.img_url} title={i.title} description={i.description} url={i.url} position={i.position} key={i.id} />
        )
      })}
    </div>
  )
}
