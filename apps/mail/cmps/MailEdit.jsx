const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { mailService } from '../services/mail.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'

export function MailEdit() {
	const [mail, setMail] = useState(mailService.getEmptyMail())

	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (!params.mailId) return
		mailService.get(params.mailId).then(mail => setMail(mail))
	}, [])

	function onSave(ev) {
		ev.preventDefault()
		mailService
			.save(mail)
			.then(() => navigate('/mail'))
			.catch(() => {
				showErrorMsg('Could not save')
				navigate('/mail')
			})
	}

	function handleChange({ target }) {
		const { type, name: prop } = target
		let { value } = target

		switch (type) {
			case 'range':
			case 'number':
				value = +value
				break

			case 'checkbox':
				value = target.checked
				break
		}
		setMail(prevMail => ({ ...prevMail, [prop]: value }))
	}

	// * DEMO
	// function addMailReview(review) {
	//     setMail(prevMail => ({
	//         ...prevMail,
	//         reviews: [...prevMail.reviews, review]
	//     }))
	// }

	return (
		<section className='mail-edit'>
			<h1>{params.mailId ? 'Edit mail' : 'Add mail'}</h1>

			<form onSubmit={onSave}>
				<label htmlFor='sender'>Sender</label>
				<input onChange={handleChange} value={mail.sender} id='sender' name='sender' type='text' placeholder='sender' />

				<button>Save</button>
			</form>
		</section>
	)
}
