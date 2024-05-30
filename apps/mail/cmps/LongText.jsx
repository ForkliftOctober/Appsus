const { useState } = React

export function LongTxt({ txt, length = 100 }) {
	const shortTxt = txt.substring(0, length)
	const [text, setText] = useState(shortTxt)

	function getFullTxt() {
		setText(text.length === txt.length ? shortTxt : txt)
	}

	function getMsg() {
		if (txt <= length) return
	}

	return (
		<span>
			<span className='bold-txt'></span>
			{text}
			<span className='read-more' onClick={getFullTxt}>
				{getMsg()}
			</span>
		</span>
	)
}
