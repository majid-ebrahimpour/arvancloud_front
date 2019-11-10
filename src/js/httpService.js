import { environment } from './environment.js';
export default class HttpService {
	
	constructor(guardService, storeService) {
		this.guardService = guardService;
		this.storeService = storeService;
	}

	async get(url) {
		let api = environment.BASE_API + url;
		const response = await fetch(api, {
			method: 'GET',
			headers: this.getHeaders(),
			mode: 'cors' // no-cors, *cors, same-origin
		});
		this.guardService.checkResponse(response);
		return await response.json();
	}

	async post(url, body) {
		let api = environment.BASE_API + url;
		const response = await fetch(api, {
			method: 'POST',
			headers: this.getHeaders(),
			mode: 'cors', // no-cors, *cors, same-origin
			body: JSON.stringify({data: body})
		});		
		return await response.json();
	}

	getHeaders() {
		return {
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': 'Token ' + this.getToken()
		}
	}

	getToken() {
		return localStorage.getItem('token');
	}
	
}
