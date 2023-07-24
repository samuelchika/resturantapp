import React from "react";
import Delivery from '../img/delivery.png';
import HeroBg from '../img/heroBg.png';

import { heropData } from "../utils/data";

const HomeContainer = () => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id="home">
            <div className="py-2 flex-1 flex flex-col items-start md:items-start justify-center gap-6">
                <div className='flex items-center gap-2 justify-center bg-orange-100 rounded-full px-2 py-1'>
                <p className='text-base text-orange-500 font-semibold'>
                    Bike Deliery
                </p>
                <div className="w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl">
                    <img src={ Delivery } 
                    className="w-full h-full object-contain"
                    alt="delivery" />
                </div>
                </div>
                <p className='text-[2.5rem] lg:text-[4rem] font-bold tracking-wide text-headingColor'>
                    The Fastest Delivery in <span className="text-orange-600 text-[3rem] lg:text-4.5rem]">Your City</span>
                </p>
                <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati odio sapiente iste, placeat officia voluptas maxime aut neque, expedita et atque cupiditate. Odio sequi voluptate, nemo obcaecati officia amet ducimus!
                </p>
                <button type='button' className="bg-gradient-to-br from-orange-300 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100">Order Now</button>
            </div>
            <div className="py-2 flex-1">
                <div className="w-full flex items-center justify-center relative">
                    <img src={ HeroBg } className="h-420 w-full lg:w-auto lg:h-650 ml-auto" alt="herobg" />
                    <div className="absolute w-full h-full flex items-center justify-center top-0 left-0  py-4 gap-3 flex-wrap lg:grid lg:grid-cols-2">
                        { heropData.map(product => (
                            <div key={ product.id } className=" lg:w-190 min-w-[190px] p-2 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center">
                                <img src={ product.imgSrc } className="w-20 -mt-10 lg:w-40 lg:-mt-20" alt="I1" />
                                <p className="text-base font-semibold text-textColor lg:mt-5">{ product.name }</p>
                                <p className="text-base font-semibold text-center text-lighttextGray lg:my-2">{ product.decp }</p>
                                <p className="text-sm font-semibold text-headingColor">£<span className="text-xs text-red-600">{ product.price }</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeContainer;