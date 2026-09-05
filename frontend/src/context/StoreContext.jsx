import { createContext, use, useEffect, useState } from "react"
//import { food_list } from "../assets/assets"
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
   
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [food_list, setFoodlist] = useState([]);
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev,[itemId]:1}))
        } else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", {itemId},{headers: {token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if (token) {
            await axios.post(url + "/api/cart/remove", {itemId},{headers: {token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find(product => {
                    return product._id === item;
                });
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodlist(response.data.data);
    }

    const fetchUserInfo = async (tokenParam = token) => {
        console.log("call fetch user Info:", token);
        try {
            if (!tokenParam) return;
            const res = await axios.get(url + "/api/user/info", {
                headers: { token: tokenParam }
            });
            if (res.data.success) {
                setUserInfo(res.data.user);
            }

            console.log("fetchUserInfo token:", token);

        } catch (error) {
            console.error("Failed to fetch user info:", error);
        }
}   ;


    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, {headers: {token}});
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await fetchUserInfo(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, [])
    
    
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        userInfo,
        setUserInfo,
        fetchUserInfo
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider