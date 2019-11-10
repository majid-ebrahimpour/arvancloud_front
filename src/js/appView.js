import { qs } from './helpers.js';

export default class AppView {

	constructor(template) {
		this.template = template;
		this.$arvancloudApp = qs('.arvancloud-app');
		this.$appHeader = qs('.app-header', this.$arvancloudApp);
		this.$container = qs('.container', this.$arvancloudApp);
	}

	/**
	 * @param {String} url - address for the HTML to fetch
	 * @return {String} the resulting HTML string fragment
	 */
	async fetchHtmlAsText(url) {
		const response = await fetch(url);
		return await response.text();
	}

	/**
	 * @param {String} fileAddress 
	 */
	async loadContent(fileAddress) {
		this.$container.innerHTML = await this.fetchHtmlAsText(fileAddress);
	}

	showAppHeader() {
		this.$appHeader.classList.remove('hide');
	}

	hiddenAppHeader() {
		this.$appHeader.classList.add('hide');
	}

}
