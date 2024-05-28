export function MailPreview({ mail }) {
	return (
		<article className='mail-preview'>
			<h3>{mail.sender}</h3>
			<p className='mail-subject'>{mail.subject}</p>
			<p className='mail-body'>{mail.body}</p>
		</article>
	)
}
