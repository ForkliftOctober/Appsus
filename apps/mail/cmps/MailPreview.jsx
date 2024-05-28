import {} from './.jsx'

export function MailPreview({ mail }) {
	return (
		<article onClick={() => onRemove(mail.id)} className='mail-preview'>
			<h3 className='mail-unread'>{mail.sender}</h3>
			<p className='mail-subject'>{mail.subject}</p>
			<p className='mail-body'>{mail.body}</p>
		</article>
	)
}
