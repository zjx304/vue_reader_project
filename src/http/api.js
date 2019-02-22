import http from './http'

const apiUrl = '/api';
const chapterUrl = '/chapterapi';

export default {
	getFeaturedData() {
		return http(apiUrl + '/recommendPage/nodes/5910018c8094b1e228e5868f')
			.then(data => data.data);
	},

	getBooks(id) {
		return http(apiUrl + '/recommendPage/books/' + id)
			.then(data => data.data);
	},

	getSwiperPictures() {
		return http(apiUrl + '/recommendPage/node/spread/575f74f27a4a60dc78a435a3', {
				pl: 'ios'
			})
			.then(data => data.data);
	},

	getCategory() {
		return http(apiUrl + '/cats/lv2/statistics');
	},

	getMinorList() {
		return http(apiUrl + '/cats/lv2');
	},

	getCatBooks(gender, type = 'hot', major = '', minor = '', start = 0, limit = 20) {
		return http(apiUrl + '/book/by-categories', {
				gender: gender,
				type: type,
				major: major,
				minor: minor,
				start: start,
				limit: limit
			})
			.then(data => data.books);
	},

  
	getRanks() {
		return http(apiUrl + '/ranking/gender');
	},

	getRankBooks(id) {
		return http(apiUrl + '/ranking/' + id);
	},

	getBookList(id, st = 1, size = 10) {
		return http(apiUrl + '/recommendPage/node/books/all/' + id, {
			ajax: 'ajax',
			st: st,
			size: size
		}, 'post');
	},

	getBook(id) {
		return http(apiUrl + '/book/' + id);
	},

	getReview(id, limit = 5) {
		return http(apiUrl + '/post/review/best-by-book', {
			book: id,
			limit: limit
		}).then(data => data.reviews);
	},

	getRecommend(id) {
		return http(apiUrl + '/book/' + id + '/recommend')
			.then(data => data.books);
	},

	getChapters(id) {
		return http(apiUrl + '/btoc', {
			view: 'summary',
			book: id
		}).then(data => {
			return http(apiUrl + '/btoc/' + data[0]._id, {
				view: 'chapters',
				channel: 'mweb'
			}).then(data => {
				return data.chapters
			});
		})
	},

	getChapterContent(id) {
		return http(chapterUrl + '/chapter/' + id, {
			cv: '1495097622174'
		}).then(data => data.chapter);
	},

	getShelfBookUpdate(ids) {
		return http(apiUrl + '/book', {
			view: 'updated',
			id: ids.toString()
		})
	},

	getSearchHotKeywords() {
		return http(apiUrl + '/book/search-hotwords')
			.then(data => data.searchHotWords);
	},

	searchByKeyword(keyword) {
		return http(apiUrl + '/book/fuzzy-search', {
			query: keyword
		}).then(data => data.books);
	}
}

//
