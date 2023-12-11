import type { InferGetServerSidePropsType, GetServerSideProps } from "next"


const clientId = process.env.IGDB_CLIENT_ID
const Bearer = process.env.IGDB_BEARER

type Props = {
    gameid: string
}

type GameData = {
    coverUrl: string
}


export async function getServerSideProps({ gameid }: Props) {
    const res = await fetch("https://api.igdb.com/v4/covers", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': `${clientId!}`,
            'Authorization': `Bearer ${Bearer!}`,
        },
        body: `fields image_id; where game=${gameid};`
    })
    const data : GameData = await res.json()
    return { props: { data } }
}

export default async function ShowGame({ gameid }: Props) {

    return (
        <> 
            <div>
                <div className="hero relative left-2 top-0 h-16 w-3/4">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                        <div>
                            <h1 className="text-5xl font-bold py-3">The Legend Of Zelda: Tears of the Kingdom</h1>
                            <p className="px-4 py-.2">Release Date: 2023</p>
                            <p className="px-4 py-.2">Platforms: Switch</p>
                            <div>
                                <p className="px-4 py-.2">Rating: 95/100</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}