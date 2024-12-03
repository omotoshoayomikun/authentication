"use server";

import axiosClient from "../config/client";
import { createSession } from "./session";



export const GetApi = async (url:any) => {
    try {
        const response = await axiosClient.get(`/${url}`);
        const data = await response.data;
        if (response.status === 200) {
          return { success: true, message: data.message, data: data.data };
        } else {
          return { success: false, message: data.message };
        }
      } catch (err:any) {
        console.log(err)
        return { success: false, message: err.response?.data?.message || err.message };
      }
}

export const loginApi = async (url:String, body:any) => {
    try {
      const response = await axiosClient.post(`/${url}`, body, {headers: {'Content-Type': 'application/json'}});
  
      const data = await response.data;
      if (response.status === 200) {
        await createSession(data.data?.user_id, "stage1")
        return { success: true, message: data.message, data: data.data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err:any) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

export const VerityPostApi = async (url:String, body:any) => {
    try {
      const response = await axiosClient.post(`/${url}`, body, {headers: {'Content-Type': 'application/json'}});
  
      const data = await response.data;
      if (response.status === 200) {
        await createSession(data.data?.user_id, "stage2")
        return { success: true, message: data.message, data: data.data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err:any) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

export const PostApi = async (url:String, body:any) => {
    try {
      const response = await axiosClient.post(`/${url}`, body, {headers: {'Content-Type': 'application/json'}});
  
      const data = await response.data;
      if (response.status === 200) {
        return { success: true, message: data.message, data: data.data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err:any) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };