import { NextResponse } from "next/server"

const clientId = process.env.IGDB_CLIENT_ID
const Bearer = process.env.IGDB_BEARER

type GameData = {
    id: number
    image_id: string
    name: string
}

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    
    const gameid = searchParams.get('gameid')

    let game: GameData
    try {

    } catch (err) {
        console.error(err)
        
    }
    
    return NextResponse.json("HI")
}