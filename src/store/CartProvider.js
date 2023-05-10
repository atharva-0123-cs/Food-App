import { useReducer } from "react";
import CartContext from "./Cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatetedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const exsitingCartItem = state.items[existingCartItemIndex];

    // let updatedItem;
    let updatedItems;

    if(exsitingCartItem){
        const updatedItem = {
            ...exsitingCartItem, 
            amount: exsitingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
    }
    else{
        updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatetedTotalAmount,
    };
  }
  if(action.type === "REMOVE"){
    
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
      );
      
      const exsitingCartItem = state.items[existingCartItemIndex];
      const updatetedTotalAmount = state.totalAmount - exsitingCartItem.price;

      let updatedItems;

      if(exsitingCartItem.amount === 1){
          updatedItems = state.items.filter(item => item.id !== action.id);
      }
      else{
          const  updatedItem = {...exsitingCartItem, amount :exsitingCartItem.amount - 1};
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatetedTotalAmount,
      };
  }
    if(action.type === 'CLEAR'){
      return defaultCartState;
    }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type : 'CLEAR'});
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToHandler,
    removeItem: removeItemFromHandler,
    clearCart : clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
