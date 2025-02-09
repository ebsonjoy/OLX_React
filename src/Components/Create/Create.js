import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate()
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)
  const date = new Date()
  const handleSubmit = () =>{
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url);
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt :date.toDateString()
        })
        navigate('/')
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
            onChange={(e)=>setName(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="Name"
             value={name}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
            onChange={(e)=>setCategory(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input onChange={(e)=>setPrice(e.target.value)} className="input"m value={price} type="number" id="fname" name="Price" />
            <br />
          
          <br />
         {image && <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>}
          
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
