const { useState, useEffect } = React

export function MailFilter({ filterBy, onFilter }) {
	const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

	useEffect(() => {
		onFilter(filterByToEdit)
	}, [filterByToEdit])

	function handleChange({ target }) {
		const { name, type } = target
		let value = type === 'number' ? +target.value : target.value
		setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
	}

	const { txt, minSpeed } = filterByToEdit
	return (
		<section className='mail-filter'>
			<h3>Filter</h3>
			<input onChange={handleChange} value={txt} name='txt' type='text' placeholder='mail' />
			<input onChange={handleChange} value={minSpeed} name='minSpeed' type='number' placeholder='speed' />
		</section>
	)
}
