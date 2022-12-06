import React, { useState } from "react";

const Tabs = ({ product }) => {
  const {
    product_image,
    product_name,
    product_price,
    product_type,
    product_size,
    product_description,
  } = product;

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="tabs mt-8">
      <button
        className={
          toggleState === 1 ? "tab tab-bordered tab-active" : "tab tab-bordered"
        }
        onClick={() => toggleTab(1)}
      >
        Product Descriptions
      </button>
      <button
        className={
          toggleState === 2 ? "tab tab-bordered tab-active" : "tab tab-bordered"
        }
        onClick={() => toggleTab(2)}
      >
        Reviews
      </button>
      <button
        className={
          toggleState === 3 ? "tab tab-bordered tab-active" : "tab tab-bordered"
        }
        onClick={() => toggleTab(3)}
      >
        Delivery & Returns
      </button>

      <div className="content-tabs mt-4">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <p>{product_description}</p>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <div className="card border">
            <div className="card-body p-2">
              <h2 className="card-title text-sm">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <p>
            If your order arrives faulty or damaged in any way (very rare),
            please just send us an email with a picture of the issue to
            emeraldprintz@aol.com and we will get back to you as soon as
            possible. Similarly, if we have sent you the wrong item by mistake –
            (it happens sometimes, we’re only human), just drop us an email we
            will arrange to have the correct item sent out. If we require the
            original item returning to us, we will arrange for a pre-paid
            returns envelope to be sent out to you. Unfortunately we cannot
            provide refunds or exchanges on orders unless they are damaged or
            faulty.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
