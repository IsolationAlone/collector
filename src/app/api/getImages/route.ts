import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

const cloud = cloudinary.v2.config({
  cloud_name: "dajdoftym",
  api_key: "638775691411683",
  api_secret: "zxUPGnr6XFYqM2pQgdyt3wP70Gk",
});

export async function GET() {
  const result = await cloudinary.v2.search
    .expression("folder:samples/animals")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  return NextResponse.json(result);
}

// export async function POST(req: Request) {
//   try {
//     const { name, coverImage } = await req.json();
//     const post = await prisma.category.create({
//       data: {
//         name,
//         coverImage,
//       },
//     });
//     return NextResponse.json(post, { status: 201 });
//   } catch (err) {
//     return NextResponse.json("Database Error", { status: 500 });
//   }
//   //   const result = await pool.query(`Select * from "persons";`);
// }
