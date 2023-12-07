import SearchGame from "@/components/SearchGame"
import { NodeNextRequest } from "next/dist/server/base-http/node"
import React from "react"

export default function Page() {

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

