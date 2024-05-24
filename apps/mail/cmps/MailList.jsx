const { Link } = ReactRouterDOM

import { MailPreview } from '../apps/mail/cmps/MailPreview.jsx'

export function MailList({ mails, onRemove, isLoading }) {
	return (
		<section style={{ opacity: isLoading ? 0.5 : 1 }} className='mail-list'>
			<ul>
				{mails.map(mail => (
					<li key={mail.id}>
						<MailPreview mail={mail} />
						<button onClick={() => onRemove(mail.id)}>x</button>
						<Link to={`/mail/${mail.id}`}>
							<button>Details</button>
						</Link>
						<Link to={`/mail/edit/${mail.id}`}>
							<button>Edit</button>
						</Link>
					</li>
				))}
			</ul>
		</section>
	)
}
