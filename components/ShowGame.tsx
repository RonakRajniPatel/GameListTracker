type Props = {
    gameid: string
}

type gameHydration = {
    coverId: string
}

export default async function ShowGame({ gameid }: Props) {
    let game : gameHydration = { coverId: "co5vmg" }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/game/[${gameid}]`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        game.coverId = data
    })
    .catch(error => {
        console.error(error)
    })

    
    const imageUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big/" + game.coverId + ".jpg"
    
    return (
        <> 
            <div>
                <div className="hero relative left-2 top-0 h-16 w-3/4">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src={imageUrl} className="max-w-sm rounded-lg shadow-2xl" />
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