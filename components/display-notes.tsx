import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function DisplayNote() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: notes } = await supabase.from('notes').select()
	const { data: {session}} = await supabase.auth.getSession()

	return (
		<>
			{
				notes ? (

				<div>
					{ notes.map((note, index) => (
						<div key={note.title} className='space-x-10'>
							{note.title} - <button>Delete</button>
						</div>
					))}
				</div>

				) : (
					<div>No notes available</div>
				)
			}            
		</>
	)
}