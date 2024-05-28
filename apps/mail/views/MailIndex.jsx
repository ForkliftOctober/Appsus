const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'

export function MailIndex() {
	const [mails, setMails] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const [searchParams, setSearchParams] = useSearchParams()
	const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

	useEffect(() => {
		setSearchParams(filterBy)
		mailService.query(filterBy).then(mails => setMails(mails))
	}, [filterBy, setSearchParams])

	function removeMail(mailId) {
		setIsLoading(true)
		mailService
			.remove(mailId)
			.then(() => {
				utilService.animateCSS('fadeAway').then(() => {
					setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
				})
				showSuccessMsg(`Mail (${mailId}) removed successfully!`)
			})
			.catch(err => {
				console.log('err:', err)
				showErrorMsg('There was a problem')
			})
			.finally(() => setIsLoading(false))
	}

	function onSetFilterBy(newFilter) {
		setFilterBy({ ...newFilter })
	}

	const isMails = mails.length > 0

	return (
		<section className='mail-index'>
			<h1>Mails</h1>
			<Link to='/mail/edit'>
				<button>Add a Mail</button>
			</Link>
			<MailFilter filterBy={filterBy} onFilter={onSetFilterBy} />
			{isMails ? <MailList isLoading={isLoading} mails={mails} onRemove={removeMail} /> : <div>No mails to show...</div>}
		</section>
	)
}
