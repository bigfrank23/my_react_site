import React, { useState, useEffect} from 'react'
import NavMenu from './components/NavMenu';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Services from './pages/Services';
import ScrollToTop from './components/ScrollToTop';

// import './App.css'
import Footer from './components/Footer';
import Blog from './pages/blog/Blog';
import SinglePost from './pages/blog/SinglePost';
import Products from './pages/productPage/Products';
import Announcement from './components/Announcement';
import Product from './pages/productPage/product/Product';
import Cart from './pages/productPage/cart/Cart';
import AddressForm from './pages/productPage/checkoutForm/AddressForm';
import CreatePost from './pages/blog/CreatePost';
import EditPost from './pages/blog/EditPost';
import ProfilePhoto from './pages/blog/ProfilePhoto';
import {commerce} from './lib/commerce'
import Checkout from './pages/productPage/checkoutForm/checkout/Checkout';
import Thanks from './pages/productPage/checkoutForm/Thanks';

const App = () => {
  const [products, setProducts] = useState([]);
 const [cart, setCart] = useState({})
 const [order, setOrder] = useState({});
 const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const res = await commerce?.products?.list();
    setProducts(res.data);
  };

 const fetchCart = async() => {
  setCart(await commerce?.cart?.retrieve());
 }
 useEffect(()=> {
  fetchProducts();
  fetchCart()
 }, [])

 const handleAddToCart = async(productId, quantity) => {
  const res = await commerce.cart.add(productId, quantity)

  setCart(res.cart)
 }

 const handleUpdateCartQty = async(productId, quantity) => {
  const res = await commerce.cart.update(productId, {quantity})

  setCart(res.cart)
 }

 const handleRemoveFromCart = async(productId) => {
  const res = await commerce.cart.remove(productId)

  setCart(res.cart)
 }

 const handleEmptyCart = async() => {
  const res = await commerce.cart.empty()

  setCart(res.cart)
 }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()

    setCart(newCart)
  }

  const handleCaptureCheckout = async(checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)

      setOrder(incomingOrder)
      refreshCart()
    } catch (error) {
      setErrorMessage(error.data.error.message)
    }
  }

 console.log(cart);

  return (
    <>
      <Router>
        <Announcement />
        <NavMenu totalItems={cart.total_items} />
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            <Home
              products={products}
              handleAddToCart={handleAddToCart}
              totalItems={cart.total_items}
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/about" component={About} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/products">
            <Products products={products} handleAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/product/:id" component={Product} />
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
          <Route exact path="/thanks_for_the_purchase" component={Thanks} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/updateProfilePhoto" component={ProfilePhoto} />
          <Route exact path="/createPost" component={CreatePost} />
          <Route exact path="/fullDetail/:id" component={SinglePost} />
          <Route exact path="/updatePost/:id" component={EditPost} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App
