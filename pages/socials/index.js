import Social from '../../components/Social';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    async function fetchData() {
      
      const socialLinks = await axios(
        'https://galacticblue.net/cheekyginger/backend/public/api/socials'
      );

      setSocials(socialLinks.data.data);

      console.log(socialLinks.data.data);
    }

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1>Social Links</h1>
          <h5>The links along the bottom that go to the various social media sites and email addresses</h5>
        </div>
      </div>
      <div className="row">
        {socials.map(i => {
          return (
            <div className="col-4">
              <Social id={i.id} img={i.img_url} link={i.url} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
