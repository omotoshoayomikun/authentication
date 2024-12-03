import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/utils";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { UserOtpVerification } from "../../../../../../lib/Models/UserOtpVerification";
import { User } from "../../../../../../lib/Models/User";

export const GET = async (
  request: NextRequest,
  { params }: { params: any }
) => {
  const { id } = params;
  const generateCode = () => Math.floor(1000 + Math.random() * 9000);

  try {
    await connectDb();
    const code = generateCode();

    const user = await User.findById(id);
    if(!user) return NextResponse.json({ message: "Invalid User!!!" }, {status: 400});

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

    const mailOptions: any = {
      from: {
        name: "Fpo Security Services",
        address: process.env.EMAIL,
      },
      to: user.email,
      subject: "Your One Time Password code 🔒",
      html: `<p> Dear User, <br /> <br /> One time password (OTP) code: <b>${code}</b>. Use this to login to your school portal. For your security, 
            please don't share this code with anyone else. If you did not make this request, ignore this message. <br /> <br /> Sincerely, <br /> Federal Polytechnic, Offa. Kwara State </p>`,
    };

    const optCheck = await UserOtpVerification.findById(id);
    const hashedOtp = await bcrypt.hash(code.toString(), 10);
    if (optCheck) {
      await UserOtpVerification.findByIdAndUpdate(
        id,
        { code: hashedOtp },
        { new: true }
      );
    } else {
      const createOtp = new UserOtpVerification({
        _id: id,
        code: hashedOtp,
      });

      await createOtp.save();
    }

  await transporter.sendMail(mailOptions);
  return NextResponse.json({ message: "Email sent successfully" }, {status: 200});

  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ message: err.message });
  }
};
