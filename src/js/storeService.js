export default class StoreService {
	
	constructor() {
		this.store = {
			domain: []
		};
		this.user = null;
	}

	setUser(user) {
		this.user = user;
	}

	getUser() {
		return this.user;
	}

}
