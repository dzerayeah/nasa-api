import React from "react";
import "./Item.scss";

const Item = (src) => {
  return (
    <div className="item" id={src.id}>
      <img className="item__img" src={src.img_src} alt="test" />
    </div>
  );
};

export default Item;
