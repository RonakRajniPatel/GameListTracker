import { NextResponse } from "next/server";

const clientId = process.env.IGDB_CLIENT_ID;
const Bearer = process.env.IGDB_BEARER;

export async function GET() {
    let data = null
    await fetch("https://api.igdb.com/v4/games", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': `${clientId!}`,
            'Authorization': `Bearer ${Bearer!}`,
        },
        body: "fields name;"
    })
        .then(response => response.json())
        .then(response => data = response)
        .catch(err => console.error(err));

    return NextResponse.json(data)
}