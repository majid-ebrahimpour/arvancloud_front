import HttpsService from '../httpService.js';
import SignupView from './signupView.js';
import StoreService from '../storeService.js';

export default class SignupController {
	/**
	 * @param  {SignupView} signupView A SignupView instance
	 * @param  {HttpsService} httpService A HttpsService instance
	 * @param  {StoreService} storeService A StoreService instance
	 */
	constructor(signupView, httpService, storeService) {
		this.signupView = signupView;
		this.httpsService = httpService;
		this.storeService = storeService;
		signupView.bindSubmitForm(this.submitForm.bind(this));
	}

	init() {
		this.storeService.setUser(null);
		localStorage.removeItem('token');
		this.signupView.hiddenAppHeader();
	}

	/**
	 * @param {Array} formData 
	 */
	async submitForm(formData) {
		try {
			const data = await this.httpsService.post('auth/signUp', formData);
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
