import React, { useState, useEffect } from 'react';
import { IoFastFood} from 'react-icons/io5';
import { categories } from '../utils/data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import {useStateValue } from './context/StateProvider';

const MenuContainer = () => {
    const [filter, setFilter] = useState("chicken");
    const [{foodItems}, dispatch] = useStateValue()
    useEffect(() => {}, [filter]);
    //console.log(foodItems)
  return (
    <section className="w-full my-6" id='menu'>
        <div className="w-full flex flex-col items-center justify-center">
            <p className="text-2xl before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-08 before:bg-orange-500 transition-all ease-in-out deration-100 font-semibold capitalize text-headingColor relative mr-auto ">Our Hot Dishes</p>
            <div  className='w-full flex items-center jusity-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
            { categories && categories.map(category => (               
                <motion.div 
                whileTap={{ scale: 0.75}}
                key={category.id} className={` group bg-white w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-3 items-center justify-center duration-150  ${filter === category.urlParamName ? 'bg-red-500' : 'bg-card'} hover:bg-red-500`} onClick={() => setFilter(category.urlParamName)} >
                    <div className={`w-10 h-10 rounded-full  ${filter === category.urlParamName ? "bg-card" : "bg-red-500"}  group-hover:bg-card flex items-center justify-center`}>
                        <IoFastFood 
                            className={`${filter === category.urlParamName ? "text-textColor" : "text-card"}  group-hover:text-textColor text-lg`}
                        />
                    </div>
                    <p className={` text-sm ${filter === category.urlParamName ? "text-white" : "text-textColor"}   group-hover:text-white`}>{category.name}</p>
                    
                </motion.div>

            ))}
            </div>
            <div className="w-full">
                <RowContainer 
                flag={false}
                data={foodItems?.filter(n => n.category === filter)} />
            </div>
        </div>
    </section>
  )
}

export default MenuContainer