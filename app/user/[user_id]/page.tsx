import React from "react"
import { createClient } from '@/utils/supabase/server'
import { cookies, headers } from 'next/headers'
import DisplayReviews from "@/components/DisplayReviews"

async function getUserID() {
    const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: {session}} = await supabase.auth.getSession()

    const Headers = headers()
    const path = Headers.get('referer')
    const userid : any = path?.split("/").pop();
    return userid
}
export default async function Page() {

    return (
        <>  
            <DisplayReviews user_id={await getUserID()}/>
        </>
    )
}
