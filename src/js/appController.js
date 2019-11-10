import DomainTemplate from "./domain/domainTemplate.js";
import DomainView from "./domain/domainView.js";
import DomainController from "./domain/domainController.js";
import SigninTemplate from "./signin/signinTemplate.js";
import SigninView from "./signin/signinView.js";
import SigninController from "./signin/signinController.js";
import SignupTemplate from "./signup/signupTemplate.js";
import SignupView from "./signup/signupView.js";
import SignupController from "./signup/signupController.js";

export default class AppController {

	constructor(httpService, storeService) {
		this.httpService = httpService;
		this.storeService = storeService;
	}

	/**
	 * Set and render the active route.
	 *
	 * @param {string} raw '' | '#/' | '#/signin' | '#/domain'
	 */
	init(raw) {
		const route = raw.replace(/^#\//, '').trim();
		switch (route) {
			case '':
			case '#domain':
				this.initController({
					template: DomainTemplate,
					view: DomainView,
					controller: DomainController
				});
				break;
			case '#signup':
				this.initController({
					template: SignupTemplate,
					view: SignupView,
					controller: SignupController
				});
				break;
			case '#signin':
				this.initController({
					template: SigninTemplate,
					view: SigninView,
					controller: SigninController
				});
				break;
			default:
			  console.log('not found =>', route);
		}
	}

	initController(arg) {
		const template = new arg.template();
		const view = new arg.view(template);
		view.checkLoadContent().then(() => {
			const controller = new arg.controller(
				view, 
				this.httpService, 
				this.storeService
			);
			controller.init();
		});
	}

}
