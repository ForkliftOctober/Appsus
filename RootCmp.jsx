const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'
import { NoteIndex } from './apps/note/views/NoteIndex.jsx'
import { MailIndex } from './apps/mail/views/MailIndex.jsx'
import { MailEdit } from './apps/mail/cmps/MailEdit.jsx'
import { MailInbox } from './apps/mail/cmps/MailInbox.jsx'
import { MailSent } from './apps/mail/cmps/MailSent.jsx'
import { MailTrash } from './apps/mail/cmps/MailTrash.jsx'

export function App() {
	return (
		<Router>
			<section className='app'>
				<AppHeader />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/mail' element={<MailIndex />} />
					<Route path='/mail/inbox' element={<MailInbox />} />
					<Route path='/mail/sent' element={<MailSent />} />
					<Route path='/mail/trash' element={<MailTrash />} />
					<Route path='/mail/edit' element={<MailEdit />} />
					<Route path='/note' element={<NoteIndex />} />
				</Routes>
			</section>
		</Router>
	)
}
