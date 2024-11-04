import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/utils";
import twilio from "twilio";
import { User } from "../../../../../../lib/Models/User";
import bcrypt from "bcrypt";
import { UserOtpVerification } from "../../../../../../lib/Models/UserOtpVerification";

const generateCode = () => Math.floor(1000 + Math.random() * 9000);

export const GET = async (
  request: NextRequest,
  { params }: { params: any }
) => {
  const { id } = params;
  const accountSid = process.env.accountSid;
  const authToken = process.env.authToken;
  const code = generateCode();
  let phone_number = "";

  const client = twilio(accountSid, authToken);

  const createMessage = async (phone_number : string) => {
    const message = await client.messages.create({
      body: `Fpo Security 🔒: Your OTP is ${code} . If you did not make this request, ignore this message.`,
      from: "+15172251227",
      to: `${phone_number}`,
    })
    return message;
  };

  try {
    await connectDb();
    const user = await User.find({ _id: id });
    const phone = user[0].phone;
    if (user.length <= 0) {
      return NextResponse.json({ message: "An Error occure.Please use another means of verification" }, { status: 400 });
    } else {
        const hashedOtp = await bcrypt.hash(code.toString(), 10);

        try {
            const verifyUser = await UserOtpVerification.findById(user[0]._id);
            if (verifyUser) {
                await UserOtpVerification.findByIdAndUpdate(user[0]._id, { code: hashedOtp }, { new: true });
            } else {
                const userOtp = new UserOtpVerification({_id: user[0]._id,code: hashedOtp,});
                await userOtp.save();
            }
        } catch (err) {
            return NextResponse.json({ message: "An Error occure.Please use another means of verification!!!" }, { status: 400 });
        }
    }

    phone.length == 11 ? phone_number = `+234${phone.slice(1, )}` : phone_number = `+234${phone}`

   await createMessage(phone_number)
   return NextResponse.json({ message: "Phone Number sent successfully!!!" }, { status: 200 });
    // .then((message) => {
    //   console.log(message)
    //     // if(message.status == "queued") {
    //     // } else {
    //     //     return NextResponse.json({ message: "Message Queued!!!" }, { status: 400 });
    //     // }
    // }) 
    // .catch((err) => {
    //   console.log(err)
    //   return NextResponse.json({ message: "An Error occure. Please try again!!!" }, { status: 400 });
    // }) 
   
  } catch (err) {
    return NextResponse.json({ message: "An Error occure.Check your internet!!!" }, { status: 400 });
  }
};
