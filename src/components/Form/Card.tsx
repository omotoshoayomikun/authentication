import React from "react";
import styles from "./Form.module.css";
import { IOutlineCard } from "@/util/type";
import { FaPhoneAlt } from "react-icons/fa";
import { BsArrowRightCircle } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

export const Card = ({ title }: { title: string }) => {
  return (
    <div className={styles.small_card}>
      {title}
      <div className={styles.small_card_icon}>
        <BsArrowRightCircle />
      </div>
    </div>
  );
};

export const OutlineCard = (props: IOutlineCard) => {
  return (
    <>
      <div className={`${styles.outlinecard}`} onClick={props.handOutlineCard}>
        <h4 className="">{props.text}</h4>
        {
          props.loading ? <CgSpinner size={25} className="animate-spin" /> : <div className="">{props.icon}</div>
        }
        
      </div>
    </>
  );
};
