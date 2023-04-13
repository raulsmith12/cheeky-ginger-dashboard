import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import swal from 'sweetalert';

export default function Home() {
  const [content, setContent] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    async function fetchData() {

      const pageContent = await axios(
        'https://backend.cheekygingerstudios.com/public/api/privacy-pages'
      );

      setContent(pageContent.data.data[0].text);
    }

    fetchData();

  }, []);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
    setTimeout(() => {
      axios({
        method: 'post',
        url: 'https://backend.cheekygingerstudios.com/public/api/privacy-pages/1',
        headers: { 'content-type': 'application/json' },
        data: { 'text': editorRef.current.getContent() },
        params: {
          '_method': 'PUT'
        }
      })
      .then(result => {
        swal("Success!", "Privacy page content successfully updated!", "success")
      })
      .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }, 2500)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1>Privacy Page Content</h1>
          <form className="border border-primary px-2 py-2" onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={content}
                init={{
                  height: 900,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
