import { NextResponse } from "next/server"

const clientId = process.env.IGDB_CLIENT_ID
const Bearer = process.env.IGDB_BEARER

type GameData = {
    id: number
    name: string
    cover: string
}

type CoverData = {
    id: number
    image_id: string
}
export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')

    let game: GameData[] = []
    let gameResponseData

    try {
        const gameResponse = await fetch("https://api.igdb.com/v4/games", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${clientId!}`,
                'Authorization': `Bearer ${Bearer!}`,
            },
            body: `fields name, cover; search "${query}"; limit 100; where category = 0; where version_title = null;`
        })
        const gameResponseData: GameData[] = await gameResponse.json()
        const idsCsv = gameResponseData.map(entry => entry.id).join(', ');


        const coverResponse = await fetch("https://api.igdb.com/v4/covers", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${clientId!}`,
                'Authorization': `Bearer ${Bearer!}`,
            },
            body: `'fields image_id; where game=(${idsCsv}); limit 100;`
        })
        const coverResponseData: CoverData[] = await coverResponse.json()

        Object.values(gameResponseData).forEach(entry => {
            const currentGame: GameData = {
                id: entry.id,
                name: entry.name,
                cover: entry.cover
            }
            game.push(currentGame)
        })
        let index = 0
        Object.values(coverResponseData).forEach(entry => {
            game[index].cover = entry.image_id
            index += 1
        })
        
        
        
    } catch (err) {
        console.error(err)

        game[0] = {
            id: 0,
            name: "",
            cover: ""
        }
        
    }
    
    return NextResponse.json(game)
}