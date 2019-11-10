import HttpsService from '../httpService.js';
import SigninView from './signinView.js';
import StoreService from '../storeService.js';

export default class SigninController {
	/**
	 * @param  {SigninView} signinView A SigninView instance
	 * @param  {HttpsService} httpService A HttpsService instance
	 * @param  {StoreService} storeService A StoreService instance
	 */
	constructor(signinView, httpService, storeService) {
		this.signinView = signinView;
		this.httpsService = httpService;
		this.storeService = storeService;
		signinView.bindSubmitForm(this.submitForm.bind(this));
	}

	init() {
		this.storeService.setUser(null);
		localStorage.removeItem('token');
		this.signinView.hiddenAppHeader();
	}

	/**
	 * @param {Array} formData 
	 */
	async submitForm(formData) {
		try {
			const data = await this.httpsService.post('auth/signIn', formData);
			if(data.done && data.data.done) {
				let user = data.data.user;
				this.storeService.setUser(user);
				localStorage.setItem('token', user.token);
				document.location.hash = '#domain';
			}
		} catch (error) {
			console.error(error);
		}
	}

}
