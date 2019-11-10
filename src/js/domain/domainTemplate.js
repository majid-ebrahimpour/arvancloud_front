import Template from '../template.js';
import { escapeForHTML } from '../helpers.js';

export default class DomainTemplate extends Template {

	/**
	 * 
	 * @param {Object} item 
	 * @param {BigInteger} index 
	 */
	itemTemplate(item, index) {
		return `<div data-id="${item.id}" class="row">
			<div class="col">
				<span>
					${index}
				</span>
			</div>
			<div class="col">
				<span>
					${escapeForHTML(item.title)}
				</span>
			</div>
			<div class="col">
				<a href="${item.url}">${item.url}</a>
			</div>
			<div class="col">
				<button class="verify" ${(item.status_id == 1) ? 'disabled' : ''}>
					${(item.status_id == 1) ? 'Verifyed' : 'Verify'}
				</button>
			</div>
		</div>`;
	} 

	/**
	 * Format the contents of a domain list.
	 *
	 * @param {Array} items
	 * @returns {String} Contents for a domain list
	 * 
	 */
	itemListTemplate(items) {
		return items.reduce((a, item, index) => a + this.itemTemplate(item, index + 1), '');
	}
}
