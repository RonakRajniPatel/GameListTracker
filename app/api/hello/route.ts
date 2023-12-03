import { NextResponse } from "next/server"
export async function GET() {

    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => console.log(json));

    return NextResponse.json({res})
}