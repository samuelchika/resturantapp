import React, { useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';

const CartItem = ({ item }) => {

    const [qty, setQty] = useState(item.qty);
    const [items, setItems] =  useState([]);
  const [{ cartItems }, dispatch ] = useStateValue();

  const cartDispatch = () => {
      dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems:  items,      
      });
      localStorage.setItem("cartItems", JSON.stringify(items));
  }

    useEffect(() => {
        setItems(cartItems);
    }, [qty])

    const updateQty = (action, id) => {
        console.log(action, id)
        if( action === "add") {
            setQty(qty + 1);
            cartItems.map((item) => {
                if (item.id === id) {
                    item.qty += 1;
                }
            });
            cartDispatch();
        } else {
            if(qty === 1) {
                setItems(cartItems.filter(item => item.id !== id));
                cartDispatch();
            } else {
                setQty(qty - 1);
                cartItems.map((item) => {
                    if (item.id === id) {
                        item.qty -= 1;
                    }
                });
                cartDispatch();
            }
        }

    }
  return (
    <div  className='w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2'>
    <img src={item?.imageURL} className='w-20 h-20 max-w-[60px] rounded-full object-contain' alt="/" />

    {/* Name section */}
    <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">
            {item?.title}
        </p>
        <p className="text-sm block text-gray-300 font-semibold">
            ${parseFloat(item?.price) * qty}
        </p>
    </div>
        {/* button section */}
        <div className="group flex items-center gap-2 ml-auto cursor-pointer">
            <motion.div whileTap={{ scale: 0.75 }}>
                <BiMinus className="text-gray-50" onClick={() => updateQty("remove", item?.id)} />
            </motion.div>
            <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center p-2">
                {item?.qty}
            </p>
            <motion.div whileTap={{ scale: 0.75 }}>
            <BiPlus className="text-gray-50" onClick={() => updateQty("add", item?.id)} />
            </motion.div>
        </div>
</div> 
  )
}

export default CartItem