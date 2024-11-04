import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.SECRET);
const cookie = {
  name: "session",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session: any) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (err) {
    return null;
  }
}

export const createSession = async (userId: any, role: any) => {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, role });

  cookies().set(cookie.name, session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expires,
  });
  // redirect(`pass-code/${userId}`)
};

export const verifyLoginSession = async () => {
  const cookie = cookies().get(cookies.name)?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  if (session?.userId && session?.role == "session_alt") {
    
    // return { userId: session?.userId };
    // return true
    NextResponse.next();
  } else {
    redirect("/login");
  }
};

// export const deleteSession = async () => {
//     cookies().delete(cookie.name);
//     redirect("/login")
// };
