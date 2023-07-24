import React, { useState } from 'react'
import Logo from '../img/logo.png'
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md';
import Avatar from '../img/avatar.png'

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// firebase stuffs
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import the firebase app you want to signin to
import { app } from '../firebase.config';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';

const Header = () => {
    const firebaseAuth = getAuth(app); // the app we are trying to signin to 
    const provider = new GoogleAuthProvider(); // the provider we have initialized in the app we are trying to signin to
    // if we have yahoo or other type of signin, we can initialize them here
    const [{ user, cartShow, cartItems }, dispatch ] = useStateValue(); 
    //. define a state to monitor the menu to rerender when we have signed in
    const [isMenu, setIsMenu] = useState(false)

    const login = async () => {

        if(!user) {
            // with the signInWithPopup, we provide the app we want to auth and the provider.
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            })
            //console.log(providerData[0])
            localStorage.setItem('user', JSON.stringify(providerData[0])); 
            
        } else {
            setIsMenu(!isMenu)
        }
       
    }

    const logout = () => {
        setIsMenu(false); // stops showing the dropdown.
        localStorage.clear() // this clears the localstorage 
        dispatch({
            type: actionType.SET_USER,
            user: null
        })
    }

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow
        })
    }
   
    return (
        <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary'>
            {/* Desktop and Tablet */}
            <div className='hidden md:flex w-full h-full items-center justify-between'>
                <Link to={'/'} >
                    <motion.div whileTap={{ scale: 0.9 }} className='flex items-center gap-2 cursor-pointer'>
                    <img src={ Logo } className='w-8 object-cover' alt='logo' />
                    <p className='text-headingColor text-xl font-bold'> City</p>
                    </motion.div>
                </Link>
                <motion.div 
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0}}
                exit={{ opacity: 0, x: 200 }}
                className="flex items-center gap-8">
                    <ul className='flex items-center gap-8'>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
                    </ul>
                    <motion.div whileTap={{ scale: 0.8 }} className="relative flex items-center justify-center cursor-pointer"
                    onClick={ showCart }
                    >
                        <MdShoppingBasket  className='text-textColor text-2xl ml-8 cursor-pointer'/>
                        { cartItems && cartItems.length > 0 && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">{ cartItems.length }</p>
                        </div>
                        )}
                        
                    </motion.div>
                    <div className="relative">
                        <motion.img  
                        whileTap={{ scale: 0.6 }}
                        src={  !user ? Avatar : user.photoURL.toString() } className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full" alt="avatar" 
                        onClick={ login }
                        />
                        {
                                isMenu && (
                                    <motion.div 
                                    initial={{ opacity: 0, scale: 0.6}}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0.6, scale: 0.6 }}
                                    className="w-40 bg-primary shadow-xl rounded-lg flex flex-col absolute top-12 right-2">
                            
                                        { user && user.email === "samuelemyrs@gmail.com" && (
                                            <Link to={"/createItem"}>
                                                <motion.p whileTap={{ scale: 0.8 }} className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                                                 onClick={ () => setIsMenu(false)}
                                                >New Item <MdAdd /></motion.p>
                                            </Link>
                                            
                                        )}
                                        
                                        <motion.p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base" onClick={ logout }>Logout <MdLogout/></motion.p>
                                    </motion.div>
                                )
                            }
                        
                    </div> 
                    
                </motion.div>
                
            </div>

            {/* Mobile */}
            <div className='flex items-center justify-between md:hidden w-full h-full '>
            <motion.div whileTap={{ scale: 0.8 }} className="relative flex items-center justify-center cursor-pointer" onClick={ showCart }>
                        <MdShoppingBasket  className='text-textColor text-2xl ml-8 cursor-pointer'/>
                        { cartItems && cartItems.length > 0 && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                                <p className="text-xs text-white font-semibold">{ cartItems.length }</p>
                            </div>
                        )}
                        
                    </motion.div>
                <Link to={'/'}  >
                    <motion.div whileTap={{ scale: 0.9 }} className='flex items-center gap-2 cursor-pointer'>
                    <img src={ Logo } className='w-8 object-cover' alt='logo' />
                    <p className='text-headingColor text-xl font-bold'> City</p>
                    </motion.div>
                </Link>

                <div className="relative">
                        <motion.img  
                        whileTap={{ scale: 0.6 }}
                        src={  user != null ? user.photoURL : Avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full mr-3" alt="avatar" 
                        onClick={ login }
                        />
                        {
                                isMenu && (
                                    <motion.div 
                                    initial={{ opacity: 0, scale: 0.6}}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0.6, scale: 0.6 }}
                                    className="w-40 bg-primary shadow-xl rounded-lg flex flex-col absolute top-12 right-2">
                            
                                        { user && user.email === "samuelemyrs@gmail.com" && (
                                            <Link to={"/createItem"}>
                                                <motion.p whileTap={{ scale: 0.8 }} className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base" onClick={ () => setIsMenu(false)}>New Item <MdAdd /></motion.p>
                                            </Link>
                                            
                                        )}

                                    <ul className='flex flex-col items-start'>
                                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 w-full' onClick={ () => setIsMenu(false)}>
                                        <Link to={'/'}>Home</Link>
                                        </li>
                                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 w-full' onClick={ () => setIsMenu(false)}>Menu</li>
                                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 w-full' onClick={ () => setIsMenu(false)}>About Us</li>
                                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 w-full' onClick={ () => setIsMenu(false)}>Service</li>
                                    </ul>
                                        
                                        <motion.p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base" onClick={ logout }>Logout <MdLogout/></motion.p>
                                    </motion.div>
                                )
                            }
                        
                    </div> 
            </div>
        </header>
    )
}

export default Header;