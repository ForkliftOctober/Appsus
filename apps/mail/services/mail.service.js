import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
	query,
	get,
	remove,
	save,
	getEmptyMail,
	getDefaultFilter,
	getSenderStats,
	getFilterFromSearchParams,
	moveToTrash,
	markRead,
}

// For Debug (easy access from console):
// window.cs = mailService

function query(filterBy = {}, status = 'inbox') {
	return storageService.query(MAIL_KEY).then(mails => {
		mails = mails.filter(mail => mail.status === status)
		if (filterBy.txt) {
			const regExp = new RegExp(filterBy.txt, 'i')
			mails = mails.filter(mail => regExp.test(mail.sender))
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

function moveToTrash(mailId) {
	return get(mailId).then(mail => {
		mail.status = 'trash'
		return save(mail)
	})
}

function markRead(mailId, isRead) {
	return get(mailId).then(mail => {
		mail.isRead = isRead
		return save(mail)
	})
}

function save(mail) {
	if (mail.id) {
		return storageService.put(MAIL_KEY, mail)
	} else {
		return storageService.post(MAIL_KEY, mail)
	}
}

function getEmptyMail(sender = '') {
	return { sender, status: 'inbox' }
}

function getDefaultFilter(filterBy = { txt: '' }) {
	return { txt: filterBy.txt }
}

function getFilterFromSearchParams(searchParams) {
	return {
		txt: searchParams.get('txt') || '',
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
	const mail = getEmptyMail(sender)
	mail.id = utilService.makeId()
	mail.subject = utilService.makeLorem(utilService.getRandomIntInclusive(5, 20))
	mail.body = utilService.makeLorem(utilService.getRandomIntInclusive(5, 100))
	mail.isRead = false
	mail.sentAt = utilService.getRandomIntInclusive(155113393059, 155118393059)
	mail.removedAt = null
	mail.sender = sender
	mail.from = _createEmailName()
	mail.to = 'user@appsus.com'
	console.log('mail: ', mail)
	return mail
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

function _getMailCountBySenderMap(mails) {
	const mailCountBySenderMap = mails.reduce((map, mail) => {
		if (!map[mail.sender]) map[mail.sender] = 0
		map[mail.sender]++
		return map
	}, {})
	return mailCountBySenderMap
}

function _createEmailName() {
	const mails = ['giba@avehu.mh', 'zuswo@vafzumi.gb', 'piwusmo@epu.ba', 'nes@guvtu.qa']
	const randomIndex = utilService.getRandomIntInclusive(0, mails.length - 1)
	const mailService = mails[randomIndex]
	console.log('mailService: ', mailService)
	return mailService
}
