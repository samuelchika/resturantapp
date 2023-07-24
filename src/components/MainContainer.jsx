import React, { useState, useEffect } from 'react'
import HomeContainer from './HomeContainer';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import RowContainer from './RowContainer';
import { useStateValue } from './context/StateProvider';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';

const MainElement = () => {
  // we want to load our foodItem once the mainContainer loads into the rowContainer 
  const [{ foodItems, cartShow }, dispatch ] = useStateValue()
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartShow])


  // we are using the useRef() to make reference to RowContainer component below
  // we have to set a scroll function on the buttons.
  // when we click on the buttons, we will move the containers left or right
  
  return (
      <div className="w-full h-auto flex flex-col items-center justify-center">
        <HomeContainer />

        <section className="w-full my-6">
          <div className="w-full flex items-center justify-between">
            <p className="text-2xl before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-orange-500 transition-all ease-in-out deration-100 font-semibold capitalize text-headingColor relative">Our Fresh & Healthy Fruits</p>
            <div className="hidden md:flex gap-3 items-center">
              <motion.div whileTap={{ scale: 0.75 }} className="w-8 h-8 rounded-lg bg-orange-300 cusor-pointer hover:bg-orange-500 transition-all ease-in-out hover:shadow-lg flex items-center justify-center">
                <MdChevronLeft onClick={ () => setScrollValue(scrollValue-200) } className='text-lg text-white' />
              </motion.div>
              <motion.div whileTap={{ scale: 0.75 }} className="w-8 h-8 rounded-lg bg-orange-300 cusor-pointer hover:bg-orange-500 transition-all ease-in-out hover:shadow-lg flex items-center justify-center">
              <MdChevronRight onClick={ () => {
                console.log(scrollValue)
                setScrollValue(scrollValue+200)
                } } className='text-lg text-white' />
              </motion.div>
            </div>
          </div>
          { // if flag is true, it server for fruit menue, if it is false, it act fr main menu function 
          }
          <RowContainer  scrollValue={ scrollValue }  flag={ true } data={foodItems?.filter(n => n.category === 'fruits')} />
        </section>
        <MenuContainer />
        { /* If the cartShow is true, then we can show the CartContainer
          * Not the cartShow is in the context level, it cut across all component
        
        */}
        {cartShow && (
          <CartContainer />
        )}
      </div>
  )
}

export default MainElement;