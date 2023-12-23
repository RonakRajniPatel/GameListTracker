import React from "react"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import DisplayReviews from "@/components/DisplayReviews"


export default async function Page() {

	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: {session}} = await supabase.auth.getSession()

    return (
        <>
            <DisplayReviews user_id={`${session?.user.id}`}/>
        </>
    )
}

