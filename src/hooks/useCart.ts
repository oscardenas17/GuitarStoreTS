import { useEffect, useState,useMemo } from "react";
import { db } from "../data/db";
import type  { Guitar , CartItem, GuitarID } from "../types";

export const useCart = () => {

  const initialState = ():CartItem[] => {


    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [data] = useState(db);
  const [cart, setCart] = useState(initialState);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);



  function addToCart(item : Guitar) {
    // Buscar si el artículo ya existe en el carrito
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists !== -1) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      // Si el artículo ya existe en el carrito
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++; // Incrementar la cantidad del artículo existente
      setCart(updatedCart);
    } else {
		const newItem :  CartItem = {...item, quantity:1}
      // Si el artículo no existe en el carrito
      //item.quantity = 1;
      setCart([...cart, newItem]); // Agregar el artículo al carrito
    }
  }

  function removeFromCart(id :GuitarID) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id:Guitar['id']) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaceQuantity(id:Guitar['id']) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }




    //State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    const cartTotal = useMemo(
      () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
      [cart]
    );



  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaceQuantity,
    clearCart,
    isEmpty,
    cartTotal
  };
};
