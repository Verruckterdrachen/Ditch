// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

class Burger {
	constructor(selector, options) {
		let defaultOptions = {
		}
		this.options = Object.assign(defaultOptions, options);
		this.selector = selector;
		this.burger = document.querySelector('.burger');
		if (this.burger) {
			this.focusElements = [
				'a[href]',
				'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
				'button:not([disabled]):not([aria-hidden])',
				'select:not([disabled]):not([aria-hidden])',
				'textarea:not([disabled]):not([aria-hidden])',
				'area[href]',
				'iframe',
				'object',
				'embed',
				'[contenteditable]',
				'[tabindex]:not([tabindex^="-"])'
			];
			this.header = document.querySelector('.header');
			this.menu = this.header.querySelector('.header__content');
		}
		this.keys = { escape: 27, tab: 9 }
		this.init();
		this.events();
	}
	init() {
		this.burger.setAttribute('aria-expanded', false);
		this.burger.setAttribute('aria-label', 'Открыть меню');
	}
	events() {
		this.burger.addEventListener('click', (e) => {
			let expanded = 'true' === this.burger.getAttribute('aria-expanded');
			this.burgerToggle(expanded);
		});
		document.addEventListener('keydown', (e) => {
			if (this.burger.classList.contains('burger--active')) {
				if (e.which === this.keys.escape) {
					this.burgerToggle(true);
					this.burger.focus();
				}
				if (e.shiftKey && e.which === this.keys.tab || e.which === this.keys.tab) {
					this.menuFocusElements = this.menu.querySelectorAll(this.focusElements);
					this.menuFocusArray = Array.prototype.slice.call(this.menuFocusElements);
					this.menuFocusArray.push(this.burger);
					let index = this.menuFocusArray.indexOf(e.target);
					let direction = e.shiftKey && e.which === this.keys.tab ? -1 : 1;
					let length = this.menuFocusArray.length;
					let newIndex = (index + length + direction) % length;

					this.menuFocusArray[newIndex].focus();
					e.preventDefault();
				}
			}
		});
	}
	burgerToggle(expanded) {
		this.burger.setAttribute('aria-expanded', !expanded),
			expanded ? this.burger.setAttribute('aria-label', 'Открыть меню') : this.burger.setAttribute('aria-label', 'Закрыть меню'),
			this.burger.classList.toggle('burger--active'),
			this.header.classList.toggle('header--bg'),
			this.menu.classList.toggle('menu--open'),
			document.documentElement.classList.toggle('lock');
	}
}
const burger = new Burger();

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
	window.pageYOffset > 10 ? header.classList.add('header--scroll') :
		header.classList.remove('header--scroll');
})
