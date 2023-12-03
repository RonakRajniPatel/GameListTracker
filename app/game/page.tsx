import SearchGame from "@/components/SearchGame"
import { NodeNextRequest } from "next/dist/server/base-http/node"
import React from "react"

export default function Page() {
    let query = null

    return (
        <>
            <div>
                {<SearchGame placeholder={"Search Games"}/>}
            </div>
        </>
    )
}

