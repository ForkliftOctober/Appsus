import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
	query,
	get,
	remove,
	save,
	getEmptyMail,
	getDefaultFilter,
	getSpeedStats,
	getSenderStats,
	getFilterFromSearchParams,
}
// For Debug (easy access from console):
// window.cs = mailService

function query(filterBy = {}) {
	return storageService.query(MAIL_KEY).then(mails => {
		if (filterBy.txt) {
			const regExp = new RegExp(filterBy.txt, 'i')
			mails = mails.filter(mail => regExp.test(mail.sender))
		}

		if (filterBy.minSpeed) {
			mails = mails.filter(mail => mail.maxSpeed >= filterBy.minSpeed)
		}

		return mails
	})
}

function get(mailId) {
	return storageService.get(MAIL_KEY, mailId).then(mail => {
		mail = _setNextPrevMailId(mail)
		return mail
	})
}

function remove(mailId) {
	return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
	if (mail.id) {
		return storageService.put(MAIL_KEY, mail)
	} else {
		return storageService.post(MAIL_KEY, mail)
	}
}

function getEmptyMail(sender = '', maxSpeed = '') {
	return { sender, maxSpeed }
}

function getDefaultFilter(filterBy = { txt: '', minSpeed: 0 }) {
	return { txt: filterBy.txt, minSpeed: filterBy.minSpeed }
}

function getFilterFromSearchParams(searchParams) {
	return {
		txt: searchParams.get('txt') || '',
		minSpeed: +searchParams.get('minSpeed') || '',
	}
}

function _setNextPrevMailId(mail) {
	return storageService.query(MAIL_KEY).then(mails => {
		const mailIdx = mails.findIndex(currMail => currMail.id === mail.id)
		const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
		const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
		mail.nextMailId = nextMail.id
		mail.prevMailId = prevMail.id
		return mail
	})
}

function _createMails() {
	let mails = utilService.loadFromStorage(MAIL_KEY)
	if (!mails || !mails.length) {
		mails = []
		const senders = ['Lulu', 'Allen', 'Donald', 'Julian']
		for (let i = 0; i < 6; i++) {
			const sender = senders[i % senders.length]
			mails.push(_createMail(sender))
		}
		utilService.saveToStorage(MAIL_KEY, mails)
	}
}

function _createMail(sender) {
	const mail = getEmptyMail(sender, maxSpeed)
	mail.id = utilService.makeId()
	mail.subject = utilService.makeLorem(getRandomIntInclusive(5, 20))
	mail.body = utilService.makeLorem(getRandomIntInclusive(5, 100))
	mail.isRead = false
	mail.sentAt = utilService.getRandomIntInclusive(155113393059, 155118393059)
	mail.removedAt = null
	mail.sender = sender
	mail.from = 'momo@momo.com'
	mail.to = 'user@appsus.com'
	console.log('mail: ', mail)
	return mail
}

function getSpeedStats() {
	return storageService.query(MAIL_KEY).then(mails => {
		const mailCountBySpeedMap = _getMailCountBySpeedMap(mails)
		const data = Object.keys(mailCountBySpeedMap).map(speedName => ({ title: speedName, value: mailCountBySpeedMap[speedName] }))
		return data
	})
}

function getSenderStats() {
	return storageService.query(MAIL_KEY).then(mails => {
		const mailCountBySenderMap = _getMailCountBySenderMap(mails)
		const data = Object.keys(mailCountBySenderMap).map(sender => ({
			title: sender,
			value: Math.round((mailCountBySenderMap[sender] / mails.length) * 100),
		}))
		return data
	})
}

function _getMailCountBySpeedMap(mails) {
	const mailCountBySpeedMap = mails.reduce(
		(map, mail) => {
			if (mail.maxSpeed < 120) map.slow++
			else if (mail.maxSpeed < 200) map.normal++
			else map.fast++
			return map
		},
		{ slow: 0, normal: 0, fast: 0 }
	)
	return mailCountBySpeedMap
}

function _getMailCountBySenderMap(mails) {
	const mailCountBySenderMap = mails.reduce((map, mail) => {
		if (!map[mail.sender]) map[mail.sender] = 0
		map[mail.sender]++
		return map
	}, {})
	return mailCountBySenderMap
}
