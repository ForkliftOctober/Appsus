import { mailService } from '../services/mail.service.js'
import { LongTxt } from '../cmps/LongText.jsx'

// TODO: add read mail
// TODO: add buttons
// TODO: show buttons on hover
export function MailPreview({ mail, onRemove, isLoading }) {
	return (
		<article style={{ opacity: isLoading ? 0.5 : 1 }} onClick={() => onRemove(mail.id)} className='mail-preview mail-unread'>
			<h3 className='mail-sender mail-unread'>{mail.sender}</h3>
			<p className='mail-subject mail-unread'>{mail.subject}</p>
			<p className='mail-body'> - {mail.body && <LongTxt txt={mail.body} />}</p>

			{/* <LongTxt txt={mail.body} /> */}
			{/* <button className='mail-list-btn' onClick={() => onRemove(mail.id)}>
                X
            </button>
            <button className='mail-list-btn' onClick={() => onRead(mail.id)}>
                R
            </button> */}
		</article>
	)
}
