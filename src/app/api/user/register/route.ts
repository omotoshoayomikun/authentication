import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../lib/utils";
import { User } from "../../../../../lib/Models/User";
import bcrypt from "bcrypt";
import { UAParser } from "ua-parser-js"
import geoip from 'geoip-lite';
// export async function GET() {
//   return Response.json({ message: "success" });
// }


export async function POST(request: NextRequest) {


  try {
    await connectDb();
    const { password, email, matric_no, firstname, lastname, middlename, phone } = await request.json();

    const body = {
      email: email,
      matric_no: matric_no.toUpperCase(),
      firstname: firstname.toUpperCase(),
      lastname: lastname.toUpperCase(),
      middlename: middlename.toUpperCase(),
      phone: phone,
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password.toUpperCase(), saltRounds);
    const newUser = new User({
      ...body,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json({ message: "New user saved successfully" }, { status: 200});

  } catch (err:any) {
    console.log(err);
    return NextResponse.json({ message: err.message },  { status: 500 });
  }
}
