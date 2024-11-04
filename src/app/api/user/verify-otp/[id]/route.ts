import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/utils";
import { UserOtpVerification } from "../../../../../../lib/Models/UserOtpVerification";
import bcrypt from "bcrypt"


 export const POST = async (request: NextRequest, {params}: {params: any}) => {

     
     try {
         await connectDb();
         const { id } = params
        const  { code } = await request.json();

        const user = await UserOtpVerification.findById(id);
        const hashedCode = user.code;
        if(user) {
            const compareCode = await bcrypt.compare(code, hashedCode);
            if(compareCode) {
                return NextResponse.json({ message: "OTP Verification Successful" }, {status: 200});
            } else {
                return NextResponse.json({ message: "Wrong OTP" }, {status: 400});
            }
        } else {
            console.log({message: "OTP expired, Please Resend!!!"})
            return NextResponse.json({ message: "OTP expired, Please Resend!!!" }, {status: 400});
        }
        

    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json({ message: "An Error occure, please check your internet" });
    }

}