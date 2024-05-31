const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useParams, useNavigate, useLocation } = ReactRouter

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { MailInbox } from '../cmps/MailInbox.jsx'

export function MailIndex() {
	const [mails, setMails] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
	const navigate = useNavigate()
	const location = useLocation()
	const status = location.pathname.split('/')[2] || 'inbox'

	useEffect(() => {
		setSearchParams(filterBy)
		mailService.query(filterBy, status).then(mails => setMails(mails))
	}, [filterBy, setSearchParams, status])

	function removeMail(mailId) {
		mailService
			.moveToTrash(mailId)
			.then(() => {
				setMails(prevMails => prevMails.filter(mail => mailId !== mail.id))
				showSuccessMsg('Mail has been successfully moved to trash!')
			})
			.catch(() => {
				showErrorMsg(`Couldn't move mail to trash`)
			})
	}

	function onSetFilterBy(newFilter) {
		setFilterBy({ ...newFilter })
	}

	const isMails = mails.length > 0

	return (
		<div className='mail-page'>
			<section className='mail-menu'>
				<Link to='/mail/edit'>
					<button className='compose-btn'>Compose</button>
				</Link>
				<ul>
					<li>
						<Link to='/mail/inbox'>Inbox</Link>
					</li>
					<li>
						<Link to='/mail/sent'>Sent</Link>
					</li>
					<li>
						<Link to='/mail/trash'>Trash</Link>
					</li>
				</ul>
			</section>
			<section className='mail-index'>
				{/* <h1>Mails</h1> */}

				<MailFilter filterBy={filterBy} onFilter={onSetFilterBy} />
				{isMails ? <MailList isLoading={isLoading} mails={mails} onRemove={removeMail} /> : <div>No mails to show...</div>}
			</section>
		</div>
	)
}

// TODO: add numbers of unread mails
