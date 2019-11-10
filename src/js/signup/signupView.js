import AppView from '../appView.js';
import { qs, $on } from '../helpers.js';
import SignupTemplate from './signupTemplate.js';

export default class SignupView extends AppView {

	/**
	 * @param {SignupTemplate} template A SignupTemplate instance
	 */
	constructor(template) {
		super(template);
	}

	async checkLoadContent() {
		await this.loadContent('src/js/signup/signup.html');
		this.$signupForm = qs('.signup-form');
		this.$signupFormSubmit = qs('.signup-form-submit', this.$signupForm);
	}

	/**
	 * @param {Function} handler Function called on synthetic event.
	 */
	bindSubmitForm(handler) {
		$on(this.$signupFormSubmit, 'click', () => {
			let title = this.$signupFormSubmit.innerHTML;
			this.$signupFormSubmit.innerHTML = 'Loading...';
			this.$signupFormSubmit.disabled = true;
			let $name = qs('input[name="name"]', this.$signupForm);
			let $email = qs('input[name="email"]', this.$signupForm);
			let $password = qs('input[name="password"]', this.$signupForm);
			let formData = {
				name: $name.value.trim(),
				email: $email.value.trim(),
				password: $password.value.trim()
			};
			(async () => {
				await handler(formData);
				this.$signupFormSubmit.innerHTML = title;
				this.$signupFormSubmit.disabled = false;
			})();
		});
	}

}
