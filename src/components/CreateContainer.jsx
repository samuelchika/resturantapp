import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { saveItem } from '../utils/FirebaseFunctions';
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from '../utils/FirebaseFunctions';
import { actionType } from './context/reducer';


const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [fields, setFields] = useState(false); // use to display error
  const [msg, setMsg] = useState(null);
  const [alertStatus, setAlertStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(false);
  const [{}, dispatch ] = useStateValue(); // the useStateValue is gotten from the StateContext



  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    // storage reference
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    // upload the file
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    // to calculate the byte: you can use progress bar if you want
    // upload task provides 3 different callback functions: next, error and complete
    uploadTask.on('state_changed', (snapshot) => {
      // this means everytime the image is been upload
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // this can be use for progress bar

    }, (error) => {
      console.log(error);
      setFields(true);
      setMsg('Error while uploading: Try again 😢😒');
      setAlertStatus('danger');
      // we are now showing the alert, we have to set a timeout for it
      setTimeout(() => {
        setFields(false); // remove the error display
        setIsLoading(false); // use to remove the loader and show the upload page again
      }, 4000);


    }, () => {
      // at this stage, the upload is done. We can now get the download url from firebase and display it.
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset(downloadURL);
        setIsLoading(false);
        setFields(true);
        setMsg('Image uploaded successfully 😊');
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
        }, 4000)

      }) 
    })
    console.log(imageFile);
  }

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    // the deleteObject is used to remove image from firebase
    deleteObject(deleteRef).then(() => {
      setImageAsset(null); // this will remove the image url from the state
      setIsLoading(false); // this removes the loader
      setFields(true);
      setMsg("Image deleted successfully 🤨");
      setAlertStatus('success');
      setTimeout(() => {
        setFields(false);
      }, 4000)
    })
  }

  const saveDetails = () => {
    setIsLoading(true);
   try {
      if(!title || !calories || !imageAsset || !price || (!category && category !== "Select Category")) {
        setFields(true);
        setMsg('Required fields can\'t be empty😢😒');
        setAlertStatus('danger');
        // we are now showing the alert, we have to set a timeout for it
        setTimeout(() => {
          setFields(false); // remove the error display
          setIsLoading(false); // use to remove the loader and show the upload page again
        }, 4000);
      } else {
        // since everything is fine:
        // we create a Data Structure:
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price
        }

        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg('Data uploaded successfully 😊');
        
        setTimeout(() => {
          setFields(false);
          
        }, 4000)
        clearData();

      }
   } catch (error) {
      console.log(error);
      setFields(true);
      setMsg('Error while uploading: Try again 😢😒');
      setAlertStatus('danger');
      // we are now showing the alert, we have to set a timeout for it
      setTimeout(() => {
        setFields(false); // remove the error display
        setIsLoading(false); // use to remove the loader and show the upload page again
      }, 4000);
   }

  }

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("Select Category")
  }

  // we have to fetch our data to populate the application on start
  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      });
    });
  };


  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {
          fields && (
            <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-lg font-semibold text-center ${ alertStatus === 'danger' ? 'bg-red-400 text-red-800' : "bg-emerald-400 text-emerald-800"} `}>
              { msg }
            </motion.p>
          )
        }

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-grey-700" />
          <input type="text" 
          required name="" id="" value={ title } placeholder='Give me a title' className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-500 text-textColor'
          onChange={ e => setTitle(e.target.value) } />
        </div>
        <div className='w-full'>
          <select name="" id="" className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer' onChange={ (e) => setCategory(e.target.value) } >
            <option value="other" className='bg-white'>{ category }</option>
            { categories && categories.map( item => (
              <option key={ item.id } className="text-base border-0 outline-none capitalize bg-white text-headingColor" value={ item.urlParamName }>{ item.name }</option>
            ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-grey-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
              { isLoading ? <Loader /> : <>
                { !imageAsset ? <>
                <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer' >
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <MdCloudUpload className='text-gray-500 text-3xl hover:text-grey-700' />
                    <p className='text-gray-500 hover:text-gray-700'>
                      Click here to upload
                    </p>
                  </div>
                  <input type="file" name="uploadimage" accept="image/*" onChange={ uploadImage } 
                  className="w-0 h-0" />
                </label>
                </> : <>
                  <div className='relative h-full'>
                      <img src={ imageAsset } alt="uploadeded" className='w-full h-full object-cover' />
                      <button type='button' className='absolute buttom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out' 
                      onClick={ deleteImage }
                      >
                        <MdDelete className='text-white' />
                      </button>
                  </div>
                </>}
              </>}
        </div>

        <div className='w-full flex flex-col md:flex-row items-center gap-3'>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className='text-gray-700 text-2xl' />
            <input type="text" required placeholder='Calories' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400'
            value={ calories }
            onChange={ (e) => setCalories(e.target.value)}
            />
          </div>
          
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className='text-gray-700 text-2xl' />
            <input type="text" required placeholder='Price' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400'
            value={ price }
            onChange={ (e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={ saveDetails }>Save</button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer