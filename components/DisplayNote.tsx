import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import DeleteNote from './DeleteNote'

export default async function DisplayNote() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: notes } = await supabase.from('notes').select()
	const { data: {session}} = await supabase.auth.getSession()

	return (
		<>
			{
				<>
					<ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
						{notes?.map((note, index) => (
							<li key={note.id} className="pb-3 sm:pb-4">
								<div className="flex items-center space-x-4 rtl:space-x-reverse">
										<div className="flex-1 min-w-0">
											<DeleteNote note={note} />
											<p className="text-sm text-gray-500 truncate dark:text-gray-400">
													{session?.user.email}
											</p>
										</div>
										<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
											{note.title}
										</div>
								</div>
							</li>
						))}
					</ul>
				</>
			}            
		</>
	)
}