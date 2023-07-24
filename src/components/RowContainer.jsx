import React, { useRef, useEffect, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion';
import NotFound from '../img/NotFound.svg';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';

const RowContainer = ( { scrollValue, flag, data }) => {

  const rowContainer = useRef();
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);
  // becasue we need the value to be updated anytime something changes in the cartItem,
  // we can use the useState
  const [items, setItems] =  useState([]);
  const [{ cartItems }, dispatch ] = useStateValue();

  const addToCart = () => {
      dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems:  items,      
      });
      localStorage.setItem("cartItems", JSON.stringify(items));
  }

  useEffect(() => {
    addToCart()
  }, [items])
    
  return (
    <div ref={ rowContainer }  className={ `w-full flex items-center my-12 gap-3 p-2 scroll-smooth  ${ flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'}`}>
        { data && data.length ? data.map(item => (
            <div key={ item.id } className="w-300 min-w-[300px] md:w-300 md:min-w-[300px] my-12 h-auto bg-cardOverlay rounded-lg backdrop-blur-lg hover:shadow-xl hover:p-3 flex flex-col items-center justify-between p-2">
            <div className="w-full flex items-center justify-between">
              <motion.div whileHover={{ scale: 1.2 }}  className="w-40 h-40 -mt-8">
                <img  src={ item.imageURL } alt="" className='w-full h-full object-contain' />
              </motion.div>
                
              <motion.div whileTap={{ scale: 0.75}} className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
              onClick={ () => setItems([...cartItems, item]) }
              >
                <MdShoppingBasket className='text-white' />
              </motion.div>
            </div>
            <div className='w-full flex flex-col items-end justify-end'>
                    <p className='text-textColor font-semibold text-base md:text-lg'>{ item.title }</p>
                    <p className='mt-1 text -sm text-gray-500'>{ item.calories} Calories</p>
                    <div className="flex items-center gap-8" >
                        <p className='text-lg text-headingColor font-semibold'>
                            <span className='text-sm text-red-500'>$</span> { item.price }
                        </p>
                    </div>
            </div>
        </div>
        )) : <div className='w-full flex items-center justify-center flex-col'>
            <img src={NotFound} alt="loading" className='h-340'/>
            <p className='text-xl text-headingColor font-semibold'>Item not Available</p>
          </div>}
    </div>
  )
}

export default RowContainer;