"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useContextElement } from "@/context/Context";
import DropdownSelect from "../common/DropdownSelect";

export default function Checkout() {
  const {
    cartProducts,

    totalPrice,
  } = useContextElement();

  return (
    <>
      {/* Check-out-content */}
      <section className="section-check-out tf-spacing-2">
        <div className="tf-container">
          <div className="row justify-content-between rg-60">
            <div className="col-lg-6">
              <div className="heading mb-20">
                <h5>Billing Details:</h5>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="wg-form-information mb-40"
              >
                <fieldset className="cols mb-20">
                  <input type="text" placeholder="First Name *" />
                  <input type="text" placeholder="Last Name *" />
                </fieldset>
                <fieldset className="cols mb-20">
                  <input type="text" placeholder="Email Address*" />
                  <input type="text" placeholder="Phone Number*" />
                </fieldset>

                <DropdownSelect
                  addtionalParentClass="mb-20"
                  options={[
                    "Choose Country/Region",
                    "Viet Nam",
                    "Indonesia",
                    "Japan",
                    "Laos",
                  ]}
                />
                <fieldset className="cols mb-20">
                  <input type="text" placeholder="Town/City*" />
                  <input type="text" placeholder="Street,..." />
                </fieldset>
                <fieldset className="cols mb-20">
                  <DropdownSelect
                    addtionalParentClass="border"
                    options={[
                      "Choose State",
                      "Choose State 1",
                      "Choose State 2",
                      "Choose State 3",
                    ]}
                  />
                  <input type="text" placeholder="Postal Code*" />
                </fieldset>
                <textarea
                  name="mess"
                  id="mess"
                  placeholder="Write note..."
                  defaultValue={""}
                />
              </form>
              <div className="heading mb-20">
                <h5 className="">Choose payment Option:</h5>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="form-payment"
              >
                <div className="payment-box" id="payment-box">
                  <div className="payment-item payment-choose-card active">
                    <label
                      htmlFor="credit-card-method"
                      className="payment-header"
                      data-bs-toggle="collapse"
                      data-bs-target="#credit-card-payment"
                      aria-controls="credit-card-payment"
                    >
                      <input
                        type="radio"
                        name="payment-method"
                        className="tf-check-rounded"
                        id="credit-card-method"
                        defaultChecked
                      />
                      <span className="text-btn">Credit Card</span>
                    </label>
                    <div
                      id="credit-card-payment"
                      className="collapse show"
                      data-bs-parent="#payment-box"
                    >
                      <div className="payment-body">
                        <p className="text">
                          Make your payment directly into our bank account. Your
                          order will not be shipped until the funds have cleared
                          in our account.
                        </p>
                        <div className="input-payment-box wg-form-information">
                          <fieldset className="mb-18">
                            <input type="text" placeholder="Name On Card*" />
                          </fieldset>
                          <div className="card-numbers">
                            <fieldset className="mb-18">
                              <input type="text" placeholder="Card Numbers*" />
                            </fieldset>
                            <div className="img-icon-payment">
                              <a href="#">
                                <Image
                                  src="/image/payment/visa.png"
                                  alt=""
                                  className="lazyload"
                                  width={50}
                                  height={16}
                                />
                              </a>
                              <a href="#">
                                <Image
                                  src="/image/payment/mastercard.png"
                                  alt=""
                                  className="lazyload"
                                  width={21}
                                  height={16}
                                />
                              </a>
                              <a href="#">
                                <Image
                                  src="/image/payment/jbc.png"
                                  alt=""
                                  className="lazyload"
                                  width={23}
                                  height={16}
                                />
                              </a>
                              <a href="#">
                                <Image
                                  src="/image/payment/amer-ex.png"
                                  alt=""
                                  className="lazyload"
                                  width={24}
                                  height={16}
                                />
                              </a>
                            </div>
                          </div>
                          <fieldset className="cols mb-18">
                            <input type="date" />
                            <input type="text" placeholder="CVV*" />
                          </fieldset>
                        </div>
                        <fieldset className="check-box g-8">
                          <input
                            type="checkbox"
                            name="save"
                            id="save"
                            defaultChecked
                          />
                          <label htmlFor="save">Save Card Details</label>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                  <div className="payment-item">
                    <label
                      htmlFor="delivery-method"
                      className="payment-header"
                      data-bs-toggle="collapse"
                      data-bs-target="#delivery-payment"
                    >
                      <input
                        type="radio"
                        name="payment-method"
                        className="tf-check-rounded"
                        id="delivery-method"
                      />
                      <span className="text-btn">Cash On delivery</span>
                    </label>
                    <div
                      id="delivery-payment"
                      className="collapse"
                      data-bs-parent="#payment-box"
                    />
                  </div>
                  <div className="payment-item">
                    <label
                      htmlFor="apple-method"
                      className="payment-header"
                      data-bs-toggle="collapse"
                      data-bs-target="#apple-payment"
                    >
                      <input
                        type="radio"
                        name="payment-method"
                        className="tf-check-rounded"
                        id="apple-method"
                      />
                      <i className="icon-applePay" />
                      <span className="text-btn"> Apple Pay</span>
                    </label>
                    <div
                      id="apple-payment"
                      className="collapse"
                      data-bs-parent="#payment-box"
                    />
                  </div>
                  <div className="payment-item">
                    <label
                      htmlFor="paypal-method"
                      className="payment-header"
                      data-bs-toggle="collapse"
                      data-bs-target="#paypal-payment"
                    >
                      <input
                        type="radio"
                        name="payment-method"
                        className="tf-check-rounded"
                        id="paypal-method"
                      />
                      <Image
                        src="/image/payment/paypal.png"
                        alt=""
                        className="lazyload"
                        width={60}
                        height={16}
                      />
                    </label>
                    <div
                      id="paypal-payment"
                      className="collapse"
                      data-bs-parent="#payment-box"
                    />
                  </div>
                </div>
                <div className="check-out-btn">
                  <button
                    type="submit"
                    className="tf-btn style-2 bg-on-suface-container w-full"
                  >
                    <span>Place Order</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-5">
              <div className="wg-your-order">
                <div className="heading mb-30">
                  <h5>Your Order</h5>
                </div>
                {cartProducts.length ? (
                  <ul className="wg-your-order-list mb-30">
                    {cartProducts.map((product, i) => (
                      <li key={i}>
                        <div className="product-item style-2 hover-img">
                          <div className="image">
                            <Link href={`/product-details/${product.id}`}>
                              <Image
                                src={product.imgSrc}
                                alt=""
                                className="lazyload"
                                width={300}
                                height={300}
                              />
                            </Link>
                          </div>
                          <div className="name-product">
                            <Link
                              href={`/product-details/${product.id}`}
                              className="text-btn"
                            >
                              {product.title}
                            </Link>
                          </div>
                        </div>
                        <div className="price text-btn">
                          {product.quantity} X ${product.price.toFixed(2)}
                        </div>
                      </li>
                    ))}
                  </ul>
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
                <div className="wg-discount mb-30">
                  <div className="ip-discount-code mb-12">
                    <input type="text" placeholder="Add voucher discount" />
                    <button className="tf-btn bg-on-suface-container">
                      <span className="label text-btn-uppercase">
                        Apply coupon
                      </span>
                    </button>
                  </div>
                  <p className="color-on-suface-container">
                    Discount code is only used for orders with a total value of
                    products over $500.00
                  </p>
                </div>
                <div className="box-buy">
                  <div className="shiping">
                    <div className="text-btn flex justify-content-between align-items-center mb-15">
                      <span>Shipping</span>
                      <span className="total">Free</span>
                    </div>
                    <div className="text-btn flex justify-content-between align-items-center">
                      <span>Discounts</span>
                      <span className="total">-$80.00</span>
                    </div>
                  </div>
                  <div className="total flex justify-content-between align-items-center">
                    <h5 className="total-title fw-6">Total</h5>
                    <h5 className="total-price fw-6">
                      ${totalPrice.toFixed(2)}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /.check-out-content */}
      <div className="line-check-out" />
    </>
  );
}
