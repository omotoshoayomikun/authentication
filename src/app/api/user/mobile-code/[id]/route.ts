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

  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;

  if (!accountSid || !authToken) {
    return NextResponse.json(
      { message: "Server misconfiguration: Twilio credentials are missing." },
      { status: 500 }
    );
  }

  const client = twilio(accountSid, authToken);
  const code = generateCode();

  try {
    await connectDb();

    // Fetch the user by ID
    const user = await User.findOne({ _id: id });

    if (!user) {
      return NextResponse.json(
        { message: "User not found. Please use another verification method." },
        { status: 404 }
      );
    }

    const phone = user.phone;
    if (!phone) {
      return NextResponse.json(
        { message: "User phone number is missing." },
        { status: 400 }
      );
    }

    // Format Nigerian phone numbers
    const phone_number =
      phone.length === 11 && phone.startsWith("0")
        ? `+234${phone.slice(1)}`
        : phone.startsWith("+")
        ? phone
        : `+234${phone}`;

    // Hash the OTP
    const hashedOtp = await bcrypt.hash(code.toString(), 10);

    // Check if OTP entry exists for the user
    const existingOtp = await UserOtpVerification.findById(user._id);
    if (existingOtp) {
      await UserOtpVerification.findByIdAndUpdate(
        user._id,
        { code: hashedOtp },
        { new: true }
      );
    } else {
      const userOtp = new UserOtpVerification({
        _id: user._id,
        code: hashedOtp,
      });
      await userOtp.save();
    }

    // Send the OTP via Twilio
    await client.messages.create({
      // body: `Fpo Security 🔒: Your OTP is ${code}. If you did not make this request, please ignore this message.`,
      // from: "+15172251227", // Replace with your Twilio phone number
      // to: phone_number,

      from: 'whatsapp:+14155238886',
      contentSid: 'HX229f5a04fd0510ce1b071852155d3e75',
        contentVariables: `{"1":"${code}"}`,
      to: `whatsapp:${phone_number}`
    });

    return NextResponse.json(
      { message: "OTP sent successfully to the phone number." },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error:", err.message || err);
    return NextResponse.json(
      { message: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
};
