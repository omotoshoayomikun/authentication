import React from "react";
import styles from "./Form.module.css";
import { IInput } from "@/util/type";

const Input = React.forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const {
    label,
    rel_styles,
    handleOnchange = () => {},
    name,
    icons,
    id,
    ...values
  } = props;

  return (
    <div>
      <label className="text-[13px] font-[600]" htmlFor="">
        {label}
      </label>
      <div className={`${styles.form_group} mt-1`}>
        <input
          ref={ref}
          {...values}
          className={`${styles.input}`}
          style={rel_styles}
          onChange={(e) => handleOnchange(e, name)}
        />
        <i className={styles.input_icon}></i>
      </div>
    </div>
  );
});

// Add display name for easier debugging
Input.displayName = "Input";

export default Input;

export const Select = (props: any) => {
  const {
    label,
    rel_styles,
    handleOnchange = () => {},
    name,
    icons,
    options,
    ...values
  } = props;
  return (
    <div>
      <label className="text-[13px] font-[600]" htmlFor="">
        {label}
      </label>
      <div className="">
      <select
        {...values}
        className="py-[5px] border-[1px] border-[--border-grey-color] w-full mt-1 rounded-[4px] h-[40px]"
        onChange={(e) => handleOnchange(e, name)}
      >
        <option value="">Select {label}</option>
        {
          options.map((option:any, index:number) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        }
      </select>
      </div>
    </div>
  );
};
