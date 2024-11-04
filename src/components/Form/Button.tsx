"use client";
import React from "react";
import styles from "./Form.module.css";
import { IButtonProp } from "@/util/type";
import { CgSpinner } from "react-icons/cg";

export const Button1 = (props: IButtonProp) => {
  return (
    <button
      className={styles.button1}
      style={props.styles}
      onClick={props.handleClick}
      disabled={props.disabled && true}
    >
      {props.disabled ? (
        <CgSpinner size={25} className="animate-spin" />
      ) : (
        props.title
      )}
    </button>
  );
};
