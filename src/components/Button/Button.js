import React from "react";
import "./Button.scss";

const Button = () => {
  return (
    <div className="button-wrapper">
      <input className="button-wrapper__input" type="submit" value="Искать" />
    </div>
  );
};

export default Button;
