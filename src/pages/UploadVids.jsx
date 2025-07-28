import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UploadVids() {
  const [token, setToken] = useState('');
  const [values, setValues] = useState({
    className: '',
    grade: '',
  });
  const [videoFile, setVideoFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'vid') {
      setVideoFile(files[0]); // ✅ Store the actual file object
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getToken = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleUpload = async () => {
    if (!values.className || !values.grade || !videoFile) {
      alert('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('className', values.className);
    formData.append('grade', values.grade);
    formData.append('vid', videoFile); 

    try {
      const res = await axios.post('https://api.codingscholar.com/teacherVideoUpload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Upload successful!');
      console.log(res.data);
      alert(res.data)
    } catch (error) {
      console.error('Upload failed', error);
      alert('Upload failed');
    }
  };

  return (
    <div className="TeacherDetails">
      <div className="teacherDetailsContainer">
        <h3>Upload video</h3>
        <div className="uploadInputWrapper">
          <input
            name="className"
            onChange={handleChange}
            type="text"
            placeholder="Class name..."
          /><br />
          <input
            name="grade"
            onChange={handleChange}
            type="text"
            placeholder="Grade..."
          /><br />
          <label>
            Choose video:
            <input
              name="vid"
              onChange={handleChange}
              className="vidinput"
              type="file"
              accept="video/*"
            />
          </label>
        </div>
        <div className="uploadBtnWrapper">
          <button onClick={handleUpload}>Upload video</button>
        </div>
      </div>
    </div>
  );
}
