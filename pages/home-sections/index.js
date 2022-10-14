import HomeSection from '../../components/HomeSection'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    async function fetchData() {
      
      const pageSections = await axios(
        'https://galacticblue.net/cheekyginger/backend/public/api/home-sections'
      );

      setSections(pageSections.data.data);

      console.log(pageSections.data.data);
    }

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1>Home Sections</h1>
          <h5>This is the three sections that appear on the home page</h5>
        </div>
      </div>
      <div className="row">
        {sections.map(i => {
          return (
            <div className="col-4">
              <HomeSection id={i.id} title={i.title} desc={i.description} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
