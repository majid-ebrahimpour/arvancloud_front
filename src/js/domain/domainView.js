import AppView from '../appView.js';
import { qs, $on, $delegate } from '../helpers.js';
import DomainTemplate from './domainTemplate.js';

const _itemId = element => parseInt(element.parentNode.dataset.id || element.parentNode.parentNode.dataset.id, 10);

export default class DomainView extends AppView {

	/**
	 * @param {DomainTemplate} template A DomainTemplate instance
	 */
	constructor(template) {
		super(template);
	}
	
	async checkLoadContent() {
		await this.loadContent('src/js/domain/domain.html');
		this.$domainList = qs('.domain-list');
		this.$domainListBody = qs('.domain-list-body', this.$domainList);
		this.$domainForm = qs('.domain-form');
		this.$domainFormSubmit = qs('.domain-form-submit', this.$domainForm);
	}

	activeListLoading() {
		this.$domainListBody.innerHTML = '<div>Loading...</div>';
	}

	/**
	 * @param {Array} items
	 */
	setDomainItems(items) {
		if(items.length === 0) {
			this.$domainListBody.innerHTML = `<div>NO ITEMS!!!</div>`;
			return;
		}
		this.$domainListBody.innerHTML = this.template.itemListTemplate(items);
	}

	/**
	 * @param {Function} handler Function called on synthetic event.
	 */
	bindAddItem(handler) {
		$on(this.$domainFormSubmit, 'click', () => {
			let title = this.$domainFormSubmit.innerHTML;
			this.$domainFormSubmit.innerHTML = 'Loading...';
			this.$domainFormSubmit.disabled = true;
			let $title = qs('input[name="title"]', this.$domainForm);
			let $url = qs('input[name="url"]', this.$domainForm);
			let formData = {
				title: $title.value.trim(),
				url: $url.value.trim()
			};
			(async () => {
				await handler(formData);
				this.$domainFormSubmit.innerHTML = title;
				this.$domainFormSubmit.disabled = false;
			})();
		});
	}

	/**
	 * @param {Function} handler Function called on synthetic event.
	 */
	bindVerifyDomain(handler) {
		$delegate(this.$domainListBody, '.verify', 'click', ({target}) => {
			let title = target.innerHTML;
			target.innerHTML = 'Loading...';
			target.disabled = true;
			(async () => {
				const result = await handler(_itemId(target));
				if(result && result.done) {
					target.innerHTML = 'Verifyed';
				} else {
					target.innerHTML = title;
					target.disabled = false;
					alert(result.message ? result.message : 'Error');
				}
			})();
		});
	}
	
}
