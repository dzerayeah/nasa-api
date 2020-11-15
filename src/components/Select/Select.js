import Select, { components } from "react-select";
import React from "react";
const { ValueContainer, Placeholder } = components;

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <img src={"./dropdown.svg"} alt="dropdown" />
      </components.DropdownIndicator>
    )
  );
};

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

export default ({ ...props }) => (
  <Select
    {...props}
    components={{ DropdownIndicator, ValueContainer: CustomValueContainer }}
    styles={{
      container: (base) => ({
        ...base,
        fontSize: "22px",
        lineHeight: "26px",
        color: "#585555",
        height: "45px",
        marginBottom: "24px",
      }),
      placeholder: (base) => ({
        ...base,
        opacity: 1,
        color: "#9F9F9F",
        fontSize: "10px",
        lineHeight: "12px",
        position: "absolute",
        top: "11px",
      }),
      control: (base) => ({
        ...base,
        boxShadow: "none",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "none",
        height: "45px",
        border: "none",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "none",
        },
      }),
      indicatorSeparator: (base) => ({
        ...base,
        display: "none",
      }),
      indicatorsContainer: (base) => ({
        ...base,
        paddingRight: "5px",
      }),
      singleValue: (base) => ({
        ...base,
        fontSize: "22px",
        lineHeight: "26px",
        color: "#585555",
        marginTop: "3px",
      }),
      valueContainer: (base) => ({
        ...base,
        padding: "5px 15px",
      }),
      input: (base) => ({
        ...base,
        marginTop: "8px",
      }),
      dropdownIndicator: (base, state) => ({
        ...base,
        transition: "all .2s ease",
        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      }),
    }}
  />
);
