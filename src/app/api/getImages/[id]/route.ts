import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit"

const imagekit = new ImageKit({
    publicKey: "public_4zuY1p/9Hz7WilPSw8x4sjD6siw=",
    privateKey: "private_WtiQttT4WaNpJRfV8gqyDarh+k0=",
    urlEndpoint: "https://ik.imagekit.io/mrgvoagdd"
});

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    let result = await imagekit.listFiles({
        path: id
    })
    //   const searchParams = request.nextUrl.searchParams;
    //   const id = searchParams.get("id");
    return NextResponse.json(result);
}
