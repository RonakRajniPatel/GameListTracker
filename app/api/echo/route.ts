import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    const instrument = searchParams.get('instrument')
    const hobby = searchParams.get('hobby')

    return NextResponse.json({name, instrument, hobby})
}