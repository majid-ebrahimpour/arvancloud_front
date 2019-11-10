import AppView from '../appView.js';
import { qs, $on } from '../helpers.js';
import SigninTemplate from './signinTemplate.js';

export default class SigninView extends AppView {

	/**
	 * @param {SigninTemplate} template A SigninTemplate instance
	 */
	constructor(template) {
		super(template);
	}

	async checkLoadContent() {
		await this.loadContent('src/js/signin/signin.html');
		this.$signinForm = qs('.signin-form');
		this.$signinFormSubmit = qs('.signin-form-submit', this.$signinForm);
	}

	/**
	 * @param {Function} handler Function called on synthetic event.
	 */
	bindSubmitForm(handler) {
		$on(this.$signinFormSubmit, 'click', () => {
			let title = this.$signinFormSubmit.innerHTML;
			this.$signinFormSubmit.innerHTML = 'Loading...';
			this.$signinFormSubmit.disabled = true;
			let $email = qs('input[name="email"]', this.$signinForm);
			let $password = qs('input[name="password"]', this.$signinForm);
			let formData = {
				email: $email.value.trim(),
				password: $password.value.trim()
			};
			(async () => {
				await handler(formData);
				this.$signinFormSubmit.innerHTML = title;
				this.$signinFormSubmit.disabled = false;
			})();
		});
	}


}
