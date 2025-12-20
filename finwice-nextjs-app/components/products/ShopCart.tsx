"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import ProgressBarComponent from "../common/Progressbar";
import { useContextElement } from "@/context/Context";

export default function ShopCart() {
  const {
    cartProducts,
    setCartProducts,
    totalPrice,

    updateQuantity,
  } = useContextElement();

  const removeItem = (id: string | number) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  };
  const shippingMethods = [
    { id: "free", label: "Free Shipping", price: 0 },
    { id: "local", label: "Local", price: 35 },
    { id: "rate", label: "Flat Rate", price: 35 },
  ];

  const [selected, setSelected] = useState(shippingMethods[0]); // default: free shipping

  const handleChange = (
    method: React.SetStateAction<{ id: string; label: string; price: number }>
  ) => {
    setSelected(method);
  };
  return (
    <div className="section-shopping-cart tf-spacing-2">
      <div className="tf-container">
        <div className="row rg-60">
          <div className="col-xl-8">
            <div className="tf-cart-sold">
              <div className="notification-sold bg-surface mb-20">
                <Image
                  className="icon"
                  alt="img"
                  src="/image/logo/icon-fire.png"
                  width={48}
                  height={49}
                />
                <div className="count-text">
                  Your cart will expire in
                  <div
                    className="js-countdown time-count fw-7"
                    data-timer={600}
                    data-labels=":,:,:,"
                  />
                  minutes! Please checkout now before your items sell out!
                </div>
              </div>
              <div className="notification-progress mb-30">
                <div className="text mb-2">
                  Buy
                  <span className="text-btn color-on-suface-container">
                    $70.00{" "}
                  </span>
                  more to get{" "}
                  <span className="text-btn color-on-suface-container">
                    Freeship
                  </span>
                </div>
                <div className="progress-cart bg-color-on-suface-container">
                  <ProgressBarComponent max={50}>
                    <span className="round" />
                  </ProgressBarComponent>
                </div>
              </div>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="overflow-auto"
            >
              {cartProducts.length ? (
                <table className="tf-table-page-cart">
                  <thead>
                    <tr>
                      <th>Products</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((product, i) => (
                      <tr key={i} className="tf-cart-item file-delete">
                        <td className="tf-cart-item_product">
                          <Link
                            href={`/product-details/${product.id}`}
                            className="img-box"
                          >
                            <Image
                              alt="product"
                              src={product.imgSrc}
                              width={300}
                              height={300}
                            />
                          </Link>
                          <div className="cart-info">
                            <Link
                              href={`/product-details/${product.id}`}
                              className="cart-title text-btn"
                            >
                              {product.title}
                            </Link>
                          </div>
                        </td>
                        <td
                          data-cart-title="Price"
                          className="tf-cart-item_price text-center"
                        >
                          <div className="cart-price text-btn price-on-sale">
                            ${product.price.toFixed(2)}
                          </div>
                        </td>
                        <td
                          data-cart-title="Quantity"
                          className="tf-cart-item_quantity"
                        >
                          <div className="wg-quantity mx-md-auto">
                            <span
                              className="btn-quantity btn-decrease"
                              onClick={() =>
                                updateQuantity(product.id, product.quantity - 1)
                              }
                            >
                              -
                            </span>
                            <input
                              type="text"
                              className="quantity-product"
                              value={product.quantity}
                              max={99}
                              onChange={(e) => {
                                const value = Number(e.target.value) || 1;
                                if (value <= 99) {
                                  updateQuantity(
                                    product.id,
                                    Number(e.target.value) || 1
                                  );
                                }
                              }}
                            />
                            <span
                              onClick={() =>
                                updateQuantity(product.id, product.quantity + 1)
                              }
                              className="btn-quantity btn-increase"
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td
                          data-cart-title="Total"
                          className="tf-cart-item_total text-center"
                        >
                          <span className="text-btn">
                            {product.quantity} X{" "}
                          </span>
                          <div
                            className="cart-total text-btn total-price"
                            data-base-price={60}
                          >
                            ${product.price.toFixed(2)}
                          </div>
                        </td>
                        <td
                          onClick={() => removeItem(product.id)}
                          className="remove-cart"
                        >
                          <span className="remove icon icon-close1" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-4">
                  Your Cart is empty. Start adding favorite products to cart!{" "}
                  <Link
                    className="tf-btn hover-white style-1 bg-on-suface-container mt-3 mb-5"
                    href="/products"
                  >
                    Explore Products
                  </Link>
                </div>
              )}
            </form>
            <div className="bottom-form-table">
              <div className="ip-discount-code">
                <input type="text" placeholder="Add voucher discount" />
                <button className="tf-btn bg-on-suface-container">
                  <span className="label text-btn-uppercase">Apply coupon</span>
                </button>
              </div>
              <a href="#" className="tf-btn style-4 bg-on-suface-container">
                <span>Update Cart</span>
              </a>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="fl-sidebar-cart ml-30">
              <div className="box-order">
                <h5 className="title-box">Order Summary</h5>
                <div className="subtotal text-btn flex justify-content-between align-items-center">
                  <span>Subtotal</span>
                  <span className="total">$80.00</span>
                </div>
                <div className="discount text-btn flex justify-content-between align-items-center">
                  <span>Discounts</span>
                  <span className="total">-$80.00</span>
                </div>
                <div className="ship">
                  <span className="text-btn">Shipping</span>
                  <div className="flex-grow-1">
                    {shippingMethods.map((method) => (
                      <fieldset className="ship-item" key={method.id}>
                        <input
                          type="radio"
                          name="ship-check"
                          className="tf-check-rounded"
                          id={method.id}
                          value={method.id}
                          checked={selected.id === method.id}
                          onChange={() => handleChange(method)}
                        />
                        <label htmlFor={method.id}>
                          <span>{method.label}</span>
                          <span className="price">
                            ${method.price.toFixed(2)}
                          </span>
                        </label>
                      </fieldset>
                    ))}
                  </div>
                </div>
                <h5 className="total-order d-flex justify-content-between align-items-center">
                  <span>Total</span>
                  <span className="total">
                    {" "}
                    ${totalPrice ? (totalPrice + selected.price).toFixed(2) : 0}
                  </span>
                </h5>
                <div className="box-progress-checkout">
                  <Link
                    href={`/check-out`}
                    className="tf-btn style-1 bg-on-suface-container w-full text-center mb-12"
                  >
                    <span>Process To Checkout</span>
                  </Link>
                  <p className="text-btn text-center">Or continue shopping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
