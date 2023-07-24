import React, { useEffect } from 'react'
import { Header } from './components';
import { Routes, Route } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import MainContainer from './components/MainContainer';
import CreateContainer from './components/CreateContainer';
import { useStateValue } from './components/context/StateProvider';
import { getAllFoodItems } from './utils/FirebaseFunctions';
import { actionType } from './components/context/reducer';
const App = () => {

  //  we want to use the StateProvider context to store our foodItem when the device loads
  // we also want the StateProvider context to rerender our application when a new item is added
  const [{}, dispatch ] = useStateValue(); // the useStateValue is gotten from the StateContext
  // normally we are to import the useContext here and pass in the StateContext into it.
  // but we passed it in, in the StateContext file.
  
  // we have to fetch our data to populate the application on start
  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      });
    });
  };
  // This will load only once the app start only, becasue of the empty array passed to it
  // our data will be fetched from the internet and add it to our context. 
  useEffect(() => {
   fetchData();
  }, []);

  return (

    <AnimatePresence exitBeforeEnter>
        <div className='w-screen h-auto flex flex-col bg-primary'>
        <Header />
        <main className="mt-14 md:mt-20 px-4 py-4 w-full h-full">
          <Routes>
            <Route path="/*" element={ <MainContainer /> } />
            <Route path="/createItem" element={ <CreateContainer /> } />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
    
  )
}

export default App;