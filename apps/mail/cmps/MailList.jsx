const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'
import { utilService } from '../../../services/util.service.js'

export function MailList({ mails, onRemove, isLoading }) {
	return (
		<section style={{ opacity: isLoading ? 0.5 : 1 }} className='mail-list'>
			<ul>
				{mails.map(mail => (
					<li key={mail.id} className='mail-list-item'>
						<MailPreview mail={mail} />
						<button className='mail-list-btn btn' onClick={() => onRemove(mail.id)}>
							X
						</button>
						<button className='mail-list-btn btn' onClick={() => onRead(mail.id)}>
							R
						</button>
						{/* <Link to={`/mail/${mail.id}`}>
							<button>Details</button>
						</Link>
						<Link to={`/mail/edit/${mail.id}`}>
							<button>Edit</button>
						</Link> */}
					</li>
				))}
			</ul>
		</section>
	)
}
