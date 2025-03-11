
// import React, { useState } from 'react';
// import './adddeli.css';

// const AddDeli = ({ url, onAddAgent }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [photo, setPhoto] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("phone", phone);
//     formData.append("photo", photo);

//     // Call the parent function to handle adding the agent
//     await onAddAgent(formData);


//     // Clear form after submission
//     setName("");
//     setEmail("");
//     setPhone("");
//     setPhoto(null);
//   };

//   return (
//     <div className="form-container">
//       <h2>Add Delivery Agent</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Agent Name</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

//         <label>Email</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

//         <label>Phone Number</label>
//         <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />

//         <label>Upload Photo</label>
//         <input type="file" onChange={(e) => setPhoto(e.target.files[0])} required />

//         <button type="submit">Add Agent</button>
//       </form>
//     </div>
//   );
// };

// export default AddDeli;


import React, { useState } from 'react';
import './adddeli.css'; // Assuming you have your CSS here
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const AddDeli = ({ url }) => {
  const [photo, setPhoto] = useState(null);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("photo", photo);

    try {
      const response = await axios.post(`${url}/api/DeliveryAgent/add`, formData);
      if (response.data.success) {
        // Reset form data and photo preview
        setData({
          name: "",
          email: "",
          phone: ""
        });
        setPhoto(null);
        toast.success(response.data.message); // Success notification
      } else {
        toast.error(response.data.message); // Error notification
      }
    } catch (error) {
      toast.error("Failed to add agent. Please try again.");
    }
  }

  return (
    <div className="add-deli">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Photo</p>
          <label htmlFor="photo">
            <img src={photo ? URL.createObjectURL(photo) : assets.upload_area} alt="" />
          </label>
          <input
            type="file"
            id="photo"
            hidden
            required
            onChange={handlePhotoChange}
          />
        </div>

        <div className="add-agent-name flex-col">
          <p>Agent Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Enter agent name"
            required
          />
        </div>

        <div className="add-agent-email flex-col">
          <p>Email</p>
          <input
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="add-agent-phone flex-col">
          <p>Phone Number</p>
          <input
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            name="phone"
            placeholder="Enter phone number"
            required
          />
        </div>

        <button type="submit" className="add-btn">ADD AGENT</button>
      </form>
    </div>
  );
};

export default AddDeli;
