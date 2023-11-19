import { createContext, useState, useContext } from "react";
import CartModel from "./components/CartModel";

const itemContext = createContext();

function useValue(){
    const value = useContext(itemContext);
    return value;
}

// Custom provider
function CustomItemContext({children}){// it is a component which act as a provider
    const [total, setTotal] = useState(0);
    const [item, setItem] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [cart, setCart] = useState([]);

    // logic to manipulaste the state
    const handleAdd = (product) => {
        const index = cart.findIndex((item) => item.id === product.id);

        if(index === -1){
            setCart([...cart, {...product,qty:1}]);
            setTotal(total+product.price);
        }else{
            cart[index].qty++;
            setCart(cart);
            setTotal(total+cart[index].price);
        }
        setItem(item+1);
      };
      
    const handleRemove = (price) => {
        const index = cart.findIndex((item) => item.id === price);
        if(index !== -1){
            cart[index].qty--;
            setItem(item-1);
            setTotal(total-cart[index].price);
            if(cart[index].qty === 0){
                cart.splice(index,1);
            }
        }
        setCart(cart);
        // if(total<=0){return};
        // setTotal(total-price);
        // setItem(item-1);
        //another way 
        //setTotal((prevState)=>prevState-price);// beacuse setTotal works as setState here
    };
    const clear = () => {
        setTotal(total-total);
        setItem(item-item);
        setCart([]);
        //setTotal(0)
    }
    const toggle = () => {
        setShowCart(!showCart); //if it's false then it been true, if it's true then i becomes false
    }

    return(
        <itemContext.Provider value = {{total,item,handleAdd,handleRemove,clear,toggle,cart}}>
            {showCart && <CartModel/>}
            {children}
        </itemContext.Provider>
    )
}

export {itemContext,useValue};
export default CustomItemContext;