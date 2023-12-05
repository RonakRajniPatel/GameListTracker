import { NextResponse } from "next/server"

const clientId = process.env.IGDB_CLIENT_ID
const Bearer = process.env.IGDB_BEARER

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    
    const search = searchParams.get('search')

    let data
    await fetch("https://api.igdb.com/v4/games", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': `${clientId!}`,
            'Authorization': `Bearer ${Bearer!}`,
        },
        body: `fields name; search \"${search}\"; limit 5;`
    })
        .then(response => response.json())
        .then(response => data = response)
        .catch(err => console.error(err));
    return NextResponse.json(data)
}