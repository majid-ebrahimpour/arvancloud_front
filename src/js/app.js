import { $on } from './helpers.js';
import AppController from './appController.js';
import GuardService from './guardService.js';
import HttpService from './httpService.js';
import StoreService from './storeService.js';

const guardService = new GuardService();
const storeService = new StoreService();
const httpService = new HttpService(guardService, storeService);

/**
* @type {AppController}
*/
const appController = new AppController(httpService, storeService);
const init = () => appController.init(document.location.hash);

$on(window, 'load', init);
$on(window, 'hashchange', init);