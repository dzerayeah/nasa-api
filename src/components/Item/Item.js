import React from "react";
import "./Item.scss";
// import ModalImage from "react-modal-image";

const Item = (src) => {
  return (
    <div className="item" id={src.id}>
      <img className="item__img" src={src.img_src} alt={src.id} />
    </div>
    // <div className="item">
    //     <ModalImage
    //     small={src.img_src}
    //     large={src.img_src}
    //     alt={src.id}
    //     className="item__img"
    // />
    // </div>
  );
};

export default Item;
