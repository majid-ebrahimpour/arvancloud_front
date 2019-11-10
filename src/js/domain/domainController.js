import HttpsService from '../httpService.js';
import DomainView from './domainView.js';
import StoreService from '../storeService.js';

export default class DomainController {
	/**
	 * @param  {DomainView} domainView A DomainView instance
	 * @param  {HttpsService} httpService A HttpsService instance
	 * @param  {StoreService} storeService A StoreService instance
	 */
	constructor(domainView, httpService, storeService) {
		this.domainView = domainView;
		this.httpsService = httpService;
		this.storeService = storeService;
		domainView.bindAddItem(this.addItem.bind(this));
		domainView.bindVerifyDomain(this.verifyDomain.bind(this));
	}

	init() {
		this.domainView.activeListLoading();
		this.domainView.showAppHeader();
		try {
			(async () => {
				const data = await this.httpsService.get('domain');
				if(data.done) {
					this.storeService.store.domain = data.domain;
					this.domainView.setDomainItems(data.domain);
				}
			})();
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * Add an Item to the Store and display it in the list.
	 *
	 * @param {object} domain
	 */
	async addItem(domain) {
		if(domain.title && domain.url) {
			const data = await this.httpsService.post('domain', domain);
			if(data.done) {
				this.storeService.store.domain.push(data.domain);
				this.domainView.setDomainItems(this.storeService.store.domain);
			}
		} else {
			alert('Error');
		}
	}

	/**
	 * verify domain
	 * @param {BigInteger} domainId 
	 */
	async verifyDomain(domainId) {
		if(domainId) {
			const result = await this.httpsService.get('domain/verify/'+domainId);
			return result;
		} else {
			alert('Error');
		}
	}

}
