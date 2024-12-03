import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../lib/utils";
import { User } from "../../../../../lib/Models/User";
import bcrypt from "bcrypt";
import { UAParser } from "ua-parser-js"
import geoip from 'geoip-lite';
// export async function GET() {
//   return Response.json({ message: "success" });
// }


const generateMatric_noCode = () => Math.floor(1000 + Math.random() * 9000);

export async function POST(request: NextRequest) {


  try {
    await connectDb();
    const { password, email, firstname, lastname, middlename, phone, department, year, program, type } = await request.json();

    const matric_no = `${department}/${program}/${type}${year}/${generateMatric_noCode()}`

    const body = {
      email: email,
      matric_no: matric_no.toUpperCase(),
      firstname: firstname.toUpperCase(),
      lastname: lastname.toUpperCase(),
      middlename: middlename.toUpperCase(),
      phone: phone,
    }

    const getMatric_no = await User.findOne({matric_no: matric_no})
    if(getMatric_no) return NextResponse.json({ message: "Matric No already exist!!!" },  { status: 401 })

    const getPhone = await User.findOne({phone: phone})
    if(getPhone) return NextResponse.json({ message: "Phone Number already exist!!!" },  { status: 402 })

    const getEmail = await User.findOne({email: email})
    if(getEmail) return NextResponse.json({ message: "Email already exist!!!" },  { status: 403 })

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password.toUpperCase(), saltRounds);
    const newUser = new User({
      ...body,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json({ message: "New user saved successfully", data: {matric_no: matric_no} }, { status: 200});

  } catch (err:any) {
    console.log(err);
    return NextResponse.json({ message: err.message },  { status: 500 });
  }
}
