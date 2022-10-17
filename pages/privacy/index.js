import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

export default function Home() {
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchData() {

      const pageContent = await axios(
        'https://galacticblue.net/cheekyginger/backend/public/api/privacy-pages'
      );

      setContent(pageContent.data.data[0].text);
    }

    fetchData();

  }, []);

  const handleFormSubmit = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'https://galacticblue.net/cheekyginger/backend/public/api/privacy-pages/1',
      headers: { 'content-type': 'application/json' },
      data: { 'description': content },
      params: {
        '_method': 'PUT'
      }
    })
    .then(result => {
      swal("Success!", "Privacy page content successfully updated!", "success")
    })
    .catch(error => swal("Uh oh! Something went wrong. Please try again."))
  }

  return (
    <div>
      <h1>Privacy Page Content</h1>
      <form className="border border-primary px-2 py-2" onSubmit={e => handleFormSubmit(e)}>
        <div className="mb-3">
          <label htmlFor='contentText' className="form-label">Page Content</label>
          <textarea className="form-control" id="contentText" name="contentText" required value={content} onChange={e => setContent(e.target.value)} rows="5" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
