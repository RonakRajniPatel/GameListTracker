import { NextResponse } from "next/server"

const clientId = process.env.IGDB_CLIENT_ID
const Bearer = process.env.IGDB_BEARER

type GameData = {
    id: number
    image_id: string
    name: string
    rating: number
    first_release: Date
    summary: string
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    
    const gameid = searchParams.get('gameid')

    let game: GameData
    try {
        const response1 = await fetch("https://api.igdb.com/v4/covers", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${clientId!}`,
                'Authorization': `Bearer ${Bearer!}`,
            },
            body: `fields image_id; where game=${gameid};`
        })
        const data1 = await response1.json()

        const response2 = await fetch("https://api.igdb.com/v4/games", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${clientId!}`,
                'Authorization': `Bearer ${Bearer!}`,
            },
            body: `fields name, total_rating, first_release_date, summary; where id=${gameid};`
        })
        const data2 = await response2.json()
        const date = new Date(data2[0].first_release_date * 1000)
        game = {
            id: data1[0].id ? data1[0].id : "",
            image_id: data1[0].image_id ? data1[0].image_id : "",
            name: data2[0].name ? data2[0].name : "",
            rating: data2[0].total_rating ? data2[0].total_rating : 0,
            first_release: date ? date : new Date('0000-00-00'),
            summary: data2[0].summary ? data2[0].summary : "",
        }


    } catch (err) {
        console.error(err)
        game = {
            id: 0,
            image_id: "",
            name: "",
            rating: 0,
            first_release: new Date('2000-01-01'),
            summary: ""
        }
    }
    
    return NextResponse.json(game)
}