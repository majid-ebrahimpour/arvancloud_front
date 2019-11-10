export default class GuardService {
	
	/**
	 * @param {Response} response
	 */
	checkResponse(response) {
		if(response.status === 401) {
			document.location.hash = '#signin'
		}
	}

	canActive() {
		return localStorage.getItem('token') ? true : false;
	}
	
}
