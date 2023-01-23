import { Button, Pagination } from '@mui/material';
import React from 'react'
// import img1 from "../../../src/headset.jpg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SectionTitle from '../../components/SectionTitle';
import { Link } from 'react-router-dom';
// import { commerce } from './../../lib/commerce';
// import { useEffect, useState } from 'react';

const Products = ({products, handleAddToCart}) => {
  // const items = [1, 2, 3, 4]
  //  const [products, setProducts] = useState([]);
  //  const [cart, setCart] = useState({});

  //  const fetchProducts = async () => {
  //    const res = await commerce.products.list();
  //    setProducts(res.data);
  //  };

  //  const handleAddToCart = async (productId, quantity) => {
  //    const item = await commerce.cart.add(productId, quantity);

  //    setCart(item.cart);
  //  };
  //  console.log(cart);

  //  useEffect(() => {
  //    fetchProducts();
  //  }, []);

  console.log(products)

  return (
    <section style={{ backgroundColor: "#dce2e5", paddingTop: "5rem" }}>
      <div className="mt-5" style={{ color: "coral" }}>
        <SectionTitle heading="All Product" subheading="stuffs in stock" />
      </div>
      <div className="container py-5">
        {products?.map((product) => (
          <div className="row justify-content-center mb-3">
            <div className="col-md-12 col-xl-10">
              <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div className="bg-image hover-zoom ripple rounded ripple-surface">
                        <img src={product.image.url} className="w-100" alt="" />
                        <a href="#!">
                          <div className="hover-overlay">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(253, 253, 253, 0.15)",
                              }}
                            ></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-6">
                      <h5>{product.name}</h5>
                      <div className="d-flex flex-row">
                        <div className="text-danger mb-1 me-2">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                        <span>310</span>
                      </div>
                      <div className="mt-1 mb-0 text-muted small">
                        <span>100% cotton</span>
                        <span className="text-primary"> • </span>
                        <span>Light weight</span>
                        <span className="text-primary"> • </span>
                        <span>
                          Best finish
                          <br />
                        </span>
                      </div>
                      <div className="mb-2 text-muted small">
                        <span>Unique design</span>
                        <span className="text-primary"> • </span>
                        <span>For men</span>
                        <span className="text-primary"> • </span>
                        <span>
                          Casual
                          <br />
                        </span>
                      </div>
                      <p
                        className="text-truncate mb-4 mb-md-0"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
                    </div>
                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                      <div className="d-flex flex-row align-items-center mb-1">
                        <h4 className="mb-1 me-1">
                          {product.price.formatted_with_symbol}
                        </h4>
                        {/* <span className="text-danger">
                          <s>$20.99</s>
                        </span> */}
                      </div>
                      <h6 className="text-success">1000NGN shipping fee</h6>
                      <div className="d-flex flex-column mt-4">
                        <Link to={`/product/${product?.id}`} style={{ textDecoration: "none" }}>
                          <Button
                            variant="contained"
                            // endIcon={<AddShoppingCartIcon />}
                            color="secondary"
                            sx={{ marginTop: 1, width: "100%" }}
                          >
                            Detail
                          </Button>
                        </Link>
                        <Button
                          variant="outlined"
                          endIcon={<AddShoppingCartIcon />}
                          color="secondary"
                          sx={{ marginTop: 1 }}
                          onClick={()=>handleAddToCart(product.id, 1)}
                        >
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination justify-content-center">
        <Pagination
          sx={{ background: "#fff", p: 1, borderRadius: "5px", m: 2 }}
          count={10}
          variant="outlined"
          shape="rounded"
          color="secondary"
        />
      </div>
    </section>
  );
}

export default Products