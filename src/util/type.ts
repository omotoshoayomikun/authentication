import { IconType } from "react-icons";

export interface ISidebarList {
  title: string;
  url: string;
}

export interface IButtonProp {
  title: string;
  styles?: object;
  disabled?: boolean,
  type?: "button" | "reset" | "submit" | undefined;
  handleClick?: (e?: any) => void;
}

export interface IInput {
  id?: number;
  label?: string;
  name?: string,
  value?: string;
  rel_styles?: any;
  icons?: string;
  placeholder?: string;
  maxLenght?: number;
  ref?:React.LegacyRef<HTMLInputElement>,
  handleOnchange?: any;
}

export type IOutlineCard = {
  text: string;
  icon: any;
  loading?: any;
  handOutlineCard?: (e: React.MouseEvent<HTMLDivElement>) => void;
};


export type ValueType = {
  email: string;
  matric_no: string;
  firstname: string;
  lastname: string;
  middlename: string;
  phone: string;
  password: string;
};