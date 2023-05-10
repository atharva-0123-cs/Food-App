import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {

  const [cartIsShown, setCaetIsShown] = useState(false);

  const showCartHandler = () =>{
    setCaetIsShown(true);
  }
  const hideCartHandler = () =>{
    setCaetIsShown(false);
  }

  return (
    <CartProvider>
     {cartIsShown &&  <Cart onHideCart={hideCartHandler}/>}
    <Header onShowCart={showCartHandler}/>
    <main>
      <Meals/>
    </main>
    </CartProvider>
  );
}

export default App;
