import DatePicker from "react-datepicker";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";

const DatePickerNasa = (props) => {
  const CustomInput = ({ value, onClick }) => (
    <div className="date-picker" onClick={onClick}>
      <div className="date-picker__label">Земная дата</div>
      <div
        className="date-picker__icon"
        style={{ backgroundImage: "url(./datepicker.svg)" }}
      />
      <div className="date-picker__input">
        {value}
      </div>
    </div>
  );
  return (
    <DatePicker
      {...props}
      dateFormat="yyyy-MM-dd"
      customInput={<CustomInput />}
    />
  );
};

export default DatePickerNasa;
