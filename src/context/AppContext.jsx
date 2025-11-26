import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider =({children})=>{

    const currency = import.meta.VITE_CURRENCY;

    const navigate =useNavigate();
    const [user,setUser] =useState(null)
    const [isSeller,setIsSeller] =useState(false)
    const [showUserLogin,setShowUserLogin] =useState(false)
    const [products,setProducts] =useState([])

    const [cartItems,setCartItems] =useState({})


//fetch all products
    const fetchProducts =async ()=>{
        setProducts(dummyProducts)
    }

//add product to cart

    const addToCart =()=>{
        let cartData =StructuredClone(cartItems);

        if(cartData[itemId] ){
            cartData[itemId]+= 1;

        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")

    }


    //update card item quantity
    const updatCartItem = (itemId,quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId]= quantity;
        setCartItems(cartData)
        toast.success('Cart Updated')
            

    }



    useEffect(()=>{
        fetchProducts()
    },[])

    
    const value ={navigate,user,setUser,setIsSeller,isSeller,showUserLogin,
        setShowUserLogin,products,currency,addToCart,updatCartItem}
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}

export const useAppContext =()=>{
    return useContext(AppContext)
}
