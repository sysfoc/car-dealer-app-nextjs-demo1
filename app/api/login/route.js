// import dbConnect from "../../lib/mongodb";
// import User from "../../models/User";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   await dbConnect();

//   const { email, password } = await req.json();

//   try {
//     const user = await User.findOne({ email });

//     // if (!user) {
//     //   return NextResponse.json(
//     //     { error: "Invalid credentials" },
//     //     { status: 401 },
//     //   );
//     // }

//     // const isMatch = await user.comparePassword(password);
//     if (!user) {
//       console.error("User not found");
//       return NextResponse.json({ error: "User not found" }, { status: 401 });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       console.error("Password does not match");
//       return NextResponse.json({ error: "Invalid password" }, { status: 401 });
//     }

//     if (!isMatch) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 401 },
//       );
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     return NextResponse.json(
//       { token, user: { id: user._id, name: user.name, email: user.email } },
//       { status: 200 },
//     );
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../lib/mongodb";
import User from "../../models/User";

export async function POST(req) {
  await dbConnect();

  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
