import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../../lib/Models/User";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { UserOtpVerification } from "../../../../../lib/Models/UserOtpVerification";
import { redirect } from "next/navigation";
import { connectDb } from "../../../../../lib/utils";
import { cookies } from "next/headers";
import { createSession } from "../../../../../lib/session";

const generateCode = () => Math.floor(1000 + Math.random() * 9000);

export const POST = async (request: NextRequest) => {
  const code = generateCode();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await connectDb();
    const { matric_no, password } = await request.json();

    const matric = matric_no.toUpperCase();

    const user = await User.find({ matric_no: matric });
    if (user.length <= 0) {
      return NextResponse.json({ message: "Username does not exist" }, {status: 400});
    } else {
      const comparePass = await bcrypt.compare(password, user[0].password);
      if (comparePass) {
        const mailOptions: any = {
          from: {
            name: "Fpo Security Services",
            address: process.env.EMAIL,
          },
          to: user[0].email,
          subject: "Your One Time Password code 🔒",
          html: `<p> Dear User, <br /> <br /> One time password (OTP) code: <b>${code}</b>. Use this to login to your school portal. For your security, 
          please don't share this code with anyone else. If you did not make this request, ignore this message. <br /> <br /> Sincerely, <br /> Federal Polytechnic, Offa. Kwara State </p>`,
        };
        const hashedOtp = await bcrypt.hash(code.toString(), 10);

        try {
          const verifyUser = await UserOtpVerification.findById(user[0]._id);
          if (verifyUser) {
            await UserOtpVerification.findByIdAndUpdate(
              user[0]._id,
              { code: hashedOtp },
              { new: true }
            );
          } else {
            const userOtp = new UserOtpVerification({
              _id: user[0]._id,
              code: hashedOtp,
            });

            await userOtp.save();
          }
          const userId = user[0]._id.toString();

          await transporter.sendMail(mailOptions);
          return NextResponse.json({ message: "Email sent successfully", data: {user_id: user[0]._id} }, {status: 200})
        } catch (err: any) {
          console.log(err.message);
          return NextResponse.json({ message: err.message }, {status: 400});
        }

      } else {
        return NextResponse.json({ message: "Incorrect password" }, {status: 400});
      }
    }
  } catch (err: any) {
    NextResponse.json({ message: err.message });
  }
};
