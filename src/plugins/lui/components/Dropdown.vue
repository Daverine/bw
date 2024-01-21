<script>
	import { utils } from '../utils'

	export default {
		props: ['name', 'placeholder', 'options'],
		data() {
			return {
				showDropdown: false,
				uniqueId: undefined,
				EscTrack: undefined,
				settings: {},
				e: {},
				s: {},
				menuProp: {
					visible: false,
					view: "vertical",
					lhs: false,
					rhs: false,
					upward: false,
					downward: false
				},
				tmp: {},
				allItemSelected: false,
				allItemFiltered: false
			}
		},
		methods: {
			dd_setSelect(item, xClose) {
				if (!item || !this.settings.selectable) return;
				
				let
					items = [...this.e.dm.querySelectorAll(this.s.it)],
					sInput = this.$refs.sInput
				;
				
				if (this.settings.multipleSelect) {
					if (item.matches('.selected')) return;

					let
						itemIndex = items.indexOf(item),
						sIValue = JSON.parse(this.e.ip.getAttribute('data-value')) || []
					;
					
					item.classList.add('selected');
					sIValue.push(item.getAttribute('data-value') || item.textContent);
					this.e.ip.setAttribute('data-value', JSON.stringify(sIValue));
					this.e.ip.value = JSON.stringify(sIValue);
					item.setAttribute('data-ddid', sIValue.length - 1);

					if (!this.tmp.mSelectContent) this.tmp.mSelectContent = [];
					this.tmp.mSelectContent.push({html: `${item.innerHTML} <i class="svgv1 action close trailing icon"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M480.435-421.652 277.522-219.304q-12.131 12.13-29.392 12.413-17.26.282-28.826-12.848-12.695-12.131-12.478-28.674.217-16.544 12.913-29.674L422.217-480 219.304-683.348q-12.695-12.13-12.695-28.674 0-16.543 12.695-29.674 11.566-12.13 28.826-11.848 17.261.283 29.392 12.414l202.913 202.347L682.478-741.13q12.131-12.131 29.392-12.414 17.26-.282 28.826 11.848 12.695 13.131 12.478 29.674-.217 16.544-11.913 28.674L538.783-480l202.478 201.913q11.696 12.696 11.913 29.457.217 16.76-12.478 28.891-11.566 13.13-28.826 12.848-17.261-.283-29.392-12.413L480.435-421.652Z"/></svg></i>`, index: sIValue.length - 1});

					if (this.settings.searchable && this.showDropdown) {
						this.e.sb.value = '';
						utils.triggerEvent(this.e.sb, 'input');
						this.e.sb.focus();
					}

					if (!items.filter((el) => !el.matches('.selected'))[0]) this.allItemSelected = true;

					if (!this.showDropdown || this.e.dd.matches('.indicating')) return;
					
					item.classList.remove('hovered');
					
					if (!this.settings.searchable) {
						let
							next = items.filter((el, i) => i > itemIndex && !el.matches('.selected'))[0],
							prev = items.filter((el, i) => i < itemIndex && !el.matches('.selected')).slice(-1)[0]
						;
						if (next) next.classList.add('hovered');
						else if (prev) prev.classList.add('hovered');
					}

					this.dd_CalcPosition();
				}
				else {
					item.classList.add('active');
					if (!this.showDropdown && items.filter((el) => el !== item && el.matches('.active'))[0]) console.warn("A selection-dropdown on this page has multiple preselected value which is not suppose to be except it is a multiple-selection-dropdown. Only the first preselected value will be preselected.");
	
					items.filter((el) => el !== item).forEach((el) => el.classList.remove('active'));
					sInput.value = item.getAttribute('data-value') || item.textContent;
					this.tmp.selectContent = item.innerHTML;
				}

				if (!xClose) {
					if (this.settings.searchable) this.e.sb.value = '';
					this.showDropdown = false;
				}
			},
			dd_setDeselect(sItem) {
				if (!this.settings.multipleSelect) return;
				
				let
					sItemIndex = sItem.getAttribute('data-ddid'),
					sInput = this.$refs.sInput,
					sIValue = JSON.parse(this.e.ip.getAttribute('data-value')),
					item = [...this.e.dm.querySelectorAll(`:scope [data-ddid="${sItemIndex}"]`)][0]
				;
				
				sIValue.splice(Number(sItemIndex), 1);
				this.e.ip.setAttribute('data-value', JSON.stringify(sIValue));
				sInput.value = JSON.stringify(sIValue);
				item.classList.remove('selected');
				item.setAttribute('data-ddid', '');
				this.tmp.mSelectContent = this.tmp.mSelectContent.filter((el) => el.index !== Number(sItemIndex));
	
				if (this.allItemSelected) this.allItemSelected = false;

				if (this.showDropdown) {
					if (this.settings.searchable) {
						this.e.sb.value = '';
						utils.triggerEvent(this.e.sb, 'input');
					}
				
					this.dd_CalcPosition();
				}
			},
			dd_toggleDropdown(e) {
				if (typeof(e) === "object") {
					if ([...this.e.dd.querySelectorAll(':scope > .content > .chip')].filter((el) => el.contains(e.target))[0]) return;

					if (this.settings.hover) {
						let timeDelay = this.settings.delay || 300;

						if (e.type === 'mouseenter') {
							document.addEventListener('mousemove', this.dd_toggleDropdown);
							clearTimeout(this.tmp.hdt);
							this.tmp.sdt = setTimeout(() => {
								if (this.settings.searchable) this.dd_toggleDropdown('keyboard');
								else this.showDropdown = true;
							}, timeDelay/2);
						}
						else if (e.type === 'mousemove') {
							if (this.settings.asdm.filter((el) => el.contains(e.target))[0]) {
								this.settings.closing = false;
								clearTimeout(this.tmp.hdt);
								return;
							}
							if (this.settings.closing) return;
							
							this.settings.closing = true;
							clearTimeout(this.tmp.sdt);
							this.tmp.hdt = setTimeout(() => {
								this.settings.closing = false;
								this.showDropdown = false;
							}, timeDelay);
						}
						else if (e.type === 'touchstart') {
							// prevent opening and closing event from interfering with drop menu item actions.
							if (this.e.dm.contains(e.target)) return;
							
							if (this.showDropdown) {
								clearTimeout(this.tmp.sdt);
								this.showDropdown = false;
							}
							else {
								document.addEventListener('mousemove', this.dd_toggleDropdown);
								clearTimeout(this.tmp.hdt);
								if (this.settings.searchable) this.dd_toggleDropdown('keyboard');
								else this.showDropdown = true;
							}
						}
					}
					else {
						// prevent opening and closing event from interfering with drop menu item actions.
						if (this.e.dm.contains(e.target)) return;
						
						let timeDelay = this.settings.delay || 0;

						e.preventDefault();
						//get pointer cordinate to use for page-dropdown
						if (this.settings.page) this.settings.e = e;

						if (this.showDropdown) {
							if (this.settings.searchable && !this.$refs.ddIcon.contains(e.target)) {
								this.$refs.searchBox.focus();
								return;
							}
							
							setTimeout(() => this.showDropdown = false, timeDelay);
						}
						else {
							setTimeout(() => {
								if (this.settings.searchable) this.dd_toggleDropdown('keyboard');
								else this.showDropdown = true;
							}, timeDelay)
						}
					}
					return;
				}
				else if (e === 'keyboard') {
					this.tmp.keyboard = true;
					if (this.showDropdown) return;
				}
				
				if (this.showDropdown) this.showDropdown = false;
				else if (e !== 'close-all') this.showDropdown = true;

				if (e === 'close-all') this.dd_closeAll();
			},
			dd_openWithKeyboard(e) {
				if ((e.key == "Enter" || e.key == "ArrowDown") && (this.e.dd.matches(':focus') || this.e.dd.querySelectorAll(':scope :focus')[0]) && !this.showDropdown) {
					e.preventDefault();
					this.dd_toggleDropdown('keyboard');
				}
			},
			dd_openWithSearch() {
				if (this.e.sb.value) {
					this.e.ph.classList.add('filtered');
					if (!this.settings.multipleSelect) this.e.sc.classList.add('filtered');
				}
				else {
					this.e.ph.classList.remove('filtered');
					if (!this.settings.multipleSelect) this.e.sc.classList.remove('filtered');
				}

				if (this.settings.multipleSelect) {
					this.e.sz.textContent = this.e.sb.value;
					this.e.sb.style.width = this.e.sz.clientWidth + 'px';
				}
				if (!this.showDropdown) this.dd_toggleDropdown("keyboard");
			},
			dd_mSClickFunc(e) {
				let
					sItems = [...this.e.dd.querySelectorAll(':scope > .content > .chip')],
					sItem = sItems.filter((el) => el.contains(e.target))[0],
					sItemClose = [...this.e.dd.querySelectorAll(':scope > .content > .chip > .close')].filter((el) => el.contains(e.target))[0]
				;
				// deselecting multiple dropdown item when not opened when user clicks on the close button of a chip
				if (sItemClose && !this.showDropdown) this.dd_setDeselect(sItem);
				else if (sItem) {
					let sItemSib = sItems.filter((el) => el != sItem);
					
					// select a chip that is not selected if user clicks on them.
					if (!sItem.matches('.active')) sItem.classList.add('active');
					// deselect a chip that is selected if user click on them and there is no other chip selected
					else if (!sItemSib.filter((el) => el.matches('.active'))[0]) sItem.classList.remove('active');
					
					// if the control key is not pressed when user clicks on a chip, deselect the siblings of the chip 
					if (!e.ctrlKey) sItemSib.forEach((el) => el.classList.remove('active'));
				}
				// if one or more chip(s) is selected and user clicks out, deselect the selected chips
				else sItems.forEach((el) => el.classList.remove('active'));
			},
			dd_mSKBFunc(e) {
				let acSItems = [...this.e.dd.querySelectorAll(':scope > .content > .chip.active')];

				if (acSItems[0]) {
					let
						prevSib = acSItems[0].previousElementSibling,
						nextSib = acSItems.slice(-1)[0].nextElementSibling
					;
					
					// deselect items with keyboard when they are selected
					if (e.key === 'Backspace' || e.key === 'Delete') {
						if (e.key == 'Backspace' && prevSib) prevSib.classList.add('active');
						else if (e.key == 'Backspace' && nextSib) nextSib.classList.add('active');
						else if (e.key == 'Delete' && nextSib) nextSib.classList.add('active');
						else if (e.key == 'Delete' && prevSib) prevSib.classList.add('active');

						acSItems.forEach((el) => this.dd_setDeselect(el));
					}
					else if (e.key == 'ArrowRight' && nextSib) {
						if (!e.shiftKey) acSItems.forEach((el) => el.classList.remove('active'));
						nextSib.classList.add('active');
					}
					else if (e.key == 'ArrowLeft' && prevSib) {
						if (!e.shiftKey) acSItems.forEach((el) => el.classList.remove('active'));
						prevSib.classList.add('active');
					}
					else if (e.key == 'ArrowDown') {
						acSItems.forEach((el) => el.classList.remove('active'));
						this.dd_toggleDropdown('keyboard');
					}
					else if (e.key == ' ' || e.key == 'Enter' || e.key == 'Tab') acSItems.forEach((el) => el.classList.remove('active'));
				}
				/* delete the last chip in multiple dropdown if searchbox is focused-on and seachbox is empty and the backspace key is pressed */
				else if (this.settings.searchable && this.e.sb.matches(':focus') && !this.e.sb.value && e.key == 'Backspace' && [...this.e.dd.querySelectorAll(':scope > .content > .chip')][0]) this.dd_setDeselect([...this.e.dd.querySelectorAll(':scope > .content > .chip')].slice(-1)[0]);
			},
			dd_checkerFill(dm) {
				if (dm.querySelectorAll(':scope .dropdown.browse')[0]) {
					[...dm.querySelectorAll(':scope .dropdown.browse')].forEach((el) => {
						let newDm = document.getElementById(el.getAttribute('data-target')); 
						if (newDm) {
							this.settings.asdm.push(newDm);
							this.dd_checkerFill(newDm);
						}
					});
				}
			},
			dd_searchFunc() {
				let 
					items = [...this.e.dm.querySelectorAll(this.s.it_i)],
					filter = this.e.sb.value.toUpperCase()
				;

				items.forEach((el) => {
					if (el.textContent.toUpperCase().trim().indexOf(filter.trim()) !== 0) el.classList.add('filtered');
					else el.classList.remove('filtered');
				});

				items = [...this.e.dm.querySelectorAll(this.s.it_f)];

				if (!items[0]) {
					[...this.e.dm.querySelectorAll(this.s.it)].forEach((el) => el.classList.remove('hovered'));

					if (filter && !this.allItemFiltered) this.allItemFiltered = true;
					else if (!filter && this.allItemFiltered) this.allItemFiltered = false;
				}
				else {
					items[0].classList.add('hovered');
					[...this.e.dm.querySelectorAll(this.s.it)].filter((el) => el != items[0]).forEach((el) => el.classList.remove('hovered'));
					this.allItemFiltered = false;
				}
				
				this.dd_CalcPosition();
			},
			dd_clickOnDom(e) {
				let
					items = [...this.e.dm.querySelectorAll(this.s.it)],
					item = items.filter((el) => el.contains(e.target))[0],
					sItem = [...this.e.dd.querySelectorAll(':scope > .content > .chip')].filter((el) => el.contains(e.target))[0],
					sItemClose = [...this.e.dd.querySelectorAll(':scope > .content > .chip > .close')].filter((el) => el.contains(e.target))[0]
				;

				/* Close on "Click Out" */
				if (!this.e.dd.contains(e.target) && !this.e.dm.contains(e.target)) this.showDropdown = false;
				/* do something when an item is clicked */
				else if (item) {					
					if (item.matches('.dropdown')) return;

					if (this.settings.selectable) {
						/* deselecting items for multiple select dropdown that has the indicating class */
						if (item.matches('.selected')) this.dd_setDeselect([...this.e.dd.querySelectorAll(':scope > .content > .chip')].filter((el) => el.getAttribute('data-diid') === item.getAttribute('data-diid'))[0]);
						// select item if dropdown is selectable
						else this.dd_setSelect(item, (this.settings.multipleSelect ? true : false));
					}
					// close all dropdown including all sub dropdowns and parent dropdowns
					else if ((this.settings.closeOnItemClick && !item.matches('.dd-xclose')) || item.matches('.dd-close')) this.dd_toggleDropdown('close-all');
				}
				else if (sItemClose) this.dd_setDeselect(sItem);
	
			},
			dd_EscTabFunc(e) {
				// you should use an Escape tracker here to stop other plugins like modal from triggering close on escape press if the dropdown is opened down.
				if ((e.key == 'Escape' && utils.checkEscStatus(this.EscTrack)) || (e.key == 'Tab' && ![...this.e.dd.querySelectorAll(':scope :focus')][0] && ![...this.e.dm.querySelectorAll(':scope :focus')][0] && ![...this.e.dm.querySelectorAll(':scope .dropdown.active')][0])) {
					e.preventDefault();
					if (e.key === 'Escape') this.EscTrack = undefined;
					this.showDropdown = false;

					if (e.key == 'Tab') this.dd_closeAll();
					else if (this.e.dd.matches('.sub') && this.dd_getParentDropdown()) utils.triggerEvent(this.dd_getParentDropdown(), new CustomEvent('ddconsole', {detail: {command: 'set hovered item', el: this.e.dd}}));
				}
			},
			dd_KBFunc(e) {
				let items = [...this.e.dm.querySelectorAll(this.s.it_f)];
				/*
					The Enter key triggers the click action on an item
					Enter and right arrow key open a sub dropdown that is hovered.
				*/
				if (e.key == 'Enter' || e.key == 'ArrowRight') {
					let item = items.filter((el) => el.matches('.hovered'))[0];
					if (!item) return;
					if (item.matches('.dropdown:not(.active)')) {
						e.preventDefault();
						utils.triggerEvent(item, new CustomEvent('ddconsole', {detail: 'open with keyboard'}));
					}
					else if (e.key == 'Enter') {
						e.preventDefault();
						console.log('i got clicked.');
						item.click();
					}
				}
				// Arrow left key (Use to close a sub dropdown) support
				else if (e.key == 'ArrowLeft' && this.e.dd.matches('.sub') && ![...this.e.dm.querySelectorAll(':scope .dropdown.active')][0]) {
					e.preventDefault();
					this.showDropdown = false;
					if (this.e.dd.matches('.sub') && this.dd_getParentDropdown()) utils.triggerEvent(this.dd_getParentDropdown(), new CustomEvent('ddconsole', {detail: {command: 'set hovered item', el: this.e.dd}}));
				}
				// Up and down arrrow key navigation on dropdown menu item.
				else if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
					let
						hvItem = items.filter((el) => el.matches('.hovered'))[0],
						acItem = items.filter((el) => el.matches('.active'))[0]
					;

					if (![...this.e.dm.querySelectorAll(':scope .dropdown.active')][0]) {
						e.preventDefault();
						this.dd_offItemHoverEvent();

						// cii is current-item-index, nii is new-item-index ci is new-current-item
						let
							cii = (hvItem)
								? items.indexOf(hvItem)
								: (acItem)
									? items.indexOf(acItem)
									: -1,
							nii = (e.key == 'ArrowUp') 
								? (cii <= 0)
									? items.length - 1
									: cii - 1
								: (cii === items.length - 1 || cii < 0)
									? 0 
									: cii + 1,
							ci = items[nii]
						;

						/* Enable scroll of overflow parent to hovered-item to make the hovered item visible */
						if (ci) {
							let
								getIop = utils.getParents(ci, '', this.e.dm).filter((el) => (window.getComputedStyle(el).getPropertyValue('overflow-y') === 'auto' || window.getComputedStyle(el).getPropertyValue('overflow-y') === 'scroll'))[0],
								iOp = getIop ? getIop : this.e.dm,
								dSc = iOp.scrollTop,
								dH = iOp.clientHeight,
								eH = ci.offsetHeight,
								eTop = ci.getBoundingClientRect().top - iOp.getBoundingClientRect().top + dSc,
								oDif = dSc + dH - eTop,
								sAmt = e.key == 'ArrowUp'
									? ((nii === items.length - 1 && eH > oDif) || dSc > eTop)
										? eTop
										: eTop > (dSc + dH - eH)
											? eTop - dH + (eH*2)
											: undefined 
									: e.key == 'ArrowDown'
										? ((nii === 0 && dSc > eTop) || eH > oDif)
											? dSc + eH - oDif
											: dSc > eTop
												? eTop - eH
												: undefined
										: undefined
							;

							iOp.scrollTop = sAmt;
							items.forEach((el) => el.classList.remove('hovered'));
							ci.classList.add('hovered');
							if (this.settings.selectable && !this.settings.multipleSelect) this.dd_setSelect(ci, true);
						}
					}

					document.addEventListener('mousemove', this.dd_mouseMover);
				}
			},
			dd_ItemHover(e) {
				let item = e.currentTarget;
				item.classList.add('hovered');
				[...this.e.dm.querySelectorAll(this.s.it_i)].filter((el) => el !== item).forEach((el) => el.classList.remove('hovered'));
			},
			dd_ItemLeave(e) {
				e.currentTarget.classList.remove('hovered');
			},
			dd_onItemsHoverEvent() {
				[...this.e.dm.querySelectorAll(this.s.it_i)].forEach((el) => {
					el.addEventListener('mouseenter', this.dd_ItemHover);
					el.addEventListener('mouseleave', this.dd_ItemLeave);
				});
			},
			dd_offItemHoverEvent() {
				[...this.e.dm.querySelectorAll(this.s.it_i)].forEach((el) => {
					el.removeEventListener('mouseenter', this.dd_ItemHover);
					el.removeEventListener('mouseleave', this.dd_ItemLeave);
				});
			},
			dd_mouseMover(e) {
				let items = [...this.e.dm.querySelectorAll(this.s.it_i)];

				if (this.e.dd.contains(e.target) || this.e.dm.contains(e.target)) {
					let item = items.filter((el) => el.contains(e.target))[0];
					if (!item) return;
					item.classList.add('hovered');
					items.filter((el) => el !== item).forEach((el) => el.classList.remove('hovered'));
				}
				else if (this.settings.hover) { this.showDropdown = false; }
				else { items.forEach((el) => el.classList.remove('hovered')); }

				this.dd_onItemsHoverEvent();
				document.removeEventListener('mousemove', this.dd_mouseMover);
			},
			dd_CalcPosition() {
				if (this.settings.page) {
					let cord = {
						left: (this.settings.e.pageX - window.scrollX) || 0,
						top: (this.settings.e.pageY - window.scrollY) || 0
					};

					cord.right = document.documentElement.clientWidth - cord.left;
					cord.bottom = document.documentElement.clientHeight - cord.top;
					this.e.dm.style.right = 'auto';
					this.e.dm.style.bottom = 'auto';

					if (cord.right >= this.e.dm.offsetWidth) {
						this.e.dm.style.left = cord.left;
						this.e.dm.classList.add('rhs');
					}
					else if (cord.left >= this.e.dm.offsetWidth) {
						this.e.dm.style.left = cord.left - this.e.dm.offsetWidth;
						this.e.dm.classList.add('lhs');
					}
					else if (cord.right >= cord.left) {
						this.e.dm.classList.add('rhs');
						if (cord.right + cord.left >= this.e.dm.offsetWidth)  this.e.dm.style.left = document.documentElement.clientWidth - this.e.dm.offsetWidth;
						else {
							this.e.dm.style.left = 0;
							this.e.dm.style.maxWidth = document.documentElement.clientWidth;
						}
					}
					else {
						this.e.dm.classList.add('lhs');
						this.e.dm.style.left = 0;
						if (cord.right + cord.left < this.e.dm.offsetWidth) this.e.dm.style.maxWidth = document.documentElement.clientWidth;
					}

					if (cord.bottom >= this.e.dm.offsetHeight) {
						this.e.dm.style.top = cord.top;
						this.e.dm.classList.add('downward');
					}
					else if (cord.top >= this.e.dm.offsetHeight) {
						this.e.dm.style.top = cord.top - this.e.dm.offsetHeight;
						this.e.dm.classList.add('upward');
					}
					else if (cord.bottom >= cord.top) {
						this.e.dm.classList.add('downward');
						if (cord.bottom + cord.top >= this.e.dm.offsetHeight) this.e.dm.style.top = document.documentElement.clientHeight - this.e.dm.offsetHeight;
						else {
							this.e.dm.style.top = 0;
							this.e.dm.style.maxHeight = document.documentElement.clientHeight;
						}
					}
					else {
						this.e.dm.classList('upward');
						this.e.dm.style.top = 0;
						if (cord.bottom + cord.top < this.e.dm.offsetHeight) this.e.dm.style.maxWidth = document.documentElement.clientHeight;
					}
				}
				else {
					this.e.dm.classList.remove('upward', 'downward', 'rhs', 'lhs');

					let
						dProp = this.e.dd.getBoundingClientRect(),
						dmProp = {
							height: this.e.dm.offsetHeight + parseFloat(window.getComputedStyle(this.e.dm).getPropertyValue('margin-top')),
							width: this.e.dm.offsetWidth + parseFloat(window.getComputedStyle(this.e.dm).getPropertyValue('margin-left'))
						},
						vHeight = window.innerHeight,
						vWidth = innerWidth,
						spacing = {}, dmPosition = {}
					;

					if (this.settings.view === "vertical") {
						spacing.top = dProp.top;
						spacing.bottom = vHeight - dProp.top - dProp.height;
						spacing.left = dProp.left + dProp.width;
						spacing.right = vWidth - dProp.left;

						dmPosition.left = dProp.left + dProp.width - dmProp.width;
						dmPosition.right = dProp.left;
						dmPosition.top = dProp.top - dmProp.height;
						dmPosition.bottom = dProp.top + dProp.height;
					}
					else {
						spacing.top = dProp.top + dProp.height;
						spacing.bottom = vHeight - dProp.top;
						spacing.left = dProp.left;
						spacing.right = vWidth - dProp.left - dProp.width;

						dmPosition.left = dProp.left - dmProp.width;
						dmPosition.right = dProp.left + dProp.width;
						dmPosition.top = dProp.top + dProp.width - dmProp.height;
						dmPosition.bottom = dProp.top;
					}

					if (this.settings.directionPriority.x === 'right') {
						if (spacing.right >= dmProp.width || spacing.right >= spacing.left || dmProp.width > spacing.left) {
							if (!this.e.dd.classList.contains('select')) this.e.dm.style.left = `${dmPosition.right}px`;
							this.e.dm.classList.add('rhs');
						}
						else {
							if (!this.e.dd.classList.contains('select')) this.e.dm.style.left = `${dmPosition.left}px`;
							this.e.dm.classList.add('lhs');
						}
					}
					else {
						if (spacing.left >= dmProp.width) {
							if (!this.e.dd.classList.contains('select')) this.e.dm.style.left = `${dmPosition.left}px`;
							this.e.dm.classList.add('lhs');
						}
						else {
							if (!this.e.dd.classList.contains('select')) this.e.dm.style.left = `${dmPosition.right}px`;
							this.e.dm.classList.add('rhs');
						}
					}

					if (this.settings.directionPriority.y === 'bottom') {
						if (spacing.bottom >= dmProp.height || spacing.bottom >= spacing.top || dmProp.height > spacing.top) {
							if (!this.e.dd.classList.contains('select')) this.e.dm.style.top = `${dmPosition.bottom}px`;
							this.e.dm.classList.add('downward');
						}
						else {
							if (!this.e.dd.classList.contains('select')) this.e.dm.style.top = `${dmPosition.top}px`;
							this.e.dm.classList.add('upward');
						}
					}
					else {
						if (spacing.top >= dmProp.height) {
							if (!this.e.dd.classList.contains('select')) this.e.dm.style.top = `${dmPosition.top}px`;
							this.e.dm.classList.add('upward');
						}
						else {
							if (!this.e.dd.classList.contains('select')) this.e.dm.style.top = `${dmPosition.bottom}px`;
							this.e.dm.classList.add('downward');
						}
					}
				}
			},
			dd_closeAll() {
				let pDd = this.dd_getParentDropdown();
				if (pDd) utils.triggerEvent(pDd, new CustomEvent('ddconsole', {detail: 'close all ancestor dropdown'}));
			},
			dd_getParentDropdown() {
				let pDd = utils.getParents(this.e.dd, '.drop.menu')[0];
				if (pDd && pDd.matches('[data-browsed]')) pDd = document.querySelectorAll(`[data-target="${pDd.getAttribute('id')}"]`).filter((el) => el.matches('.dropdown'))[0];
				else pDd = utils.getParents(this.e.dd, '.dropdown')[0];
				return pDd;
			},
			dd_console(e) {
				if (e.detail === 'close') this.showDropdown = false;
				else if (e.detail === 'close all ancestor dropdown') this.dd_toggleDropdown('close-all');
				else if (e.detail === 'open') this.showDropdown = true;
				else if (e.detail === 'open with keyboard') this.dd_toggleDropdown('keyboard');
				else if (e.detail.command === 'set hovered item' && e.detail.el) {
					[...this.e.dm.querySelectorAll(this.s.it)].forEach((el) => el.classList.remove('hovered'));
					setTimeout(() => e.detail.el.classList.add('hovered'), 10);
				}
			}
		},
		created() {
			let
				attribs = this.$attrs,
				classes = attribs.class ? attribs.class.split(' ') : [],
				personalSettings = this.options || {}
			;
			function checkAttr (attr) { return Object.prototype.hasOwnProperty.call(attribs, attr) }

			this.settings = {
				...{
					pluginName: "dropdown",
					constrainWidth: false,
					fluidMinWidth: false,
					delay: 0,
					duration: 300,
					closeOnItemClick: true,
					directionPriority: {x: 'right', y: 'bottom'}
				},
				...personalSettings
			}
			this.settings.view = ((classes.includes('sub') && this.settings.view !== 'vertical') || this.settings.view === 'horizontal') ? 'horizontal' : 'vertical';
			this.settings.hover = ((checkAttr('data-hover') && attribs['data-hover'] !== false) || classes.includes('sub')) || false;
			this.settings.findTriggerer = checkAttr('data-find-triggerer') || false;
			this.settings.page = ((this.settings.page && !classes.includes('sub')) && !this.settings.hover) || false;
			this.settings.browse = (classes.includes('browse')) || false;
			this.settings.menuId = (this.settings.browse) ? attribs['data-target'] : undefined;
			this.settings.browseDm = (checkAttr('data-browse-dm')) ? attribs['data-browse-dm'] : false; // replacement for settings.browser and settings.menuid
			this.settings.selectable = (classes.includes('select') || classes.includes('selection')) || false;
			this.settings.multipleSelect = (this.settings.selectable && classes.includes('multiple')) || false;
			this.settings.searchable = (this.settings.selectable && classes.includes('search')) || false;
			this.settings.asdm = []; // an array to contain browseable sub dropdown menu
			// this.tmp.itemsSelector = `.item:not(.xhover):not(.disabled)${!(this.settings.multipleSelect && classes.includes('indicating')) ? ':not(.selected)':''}`;
		},
		mounted() {
			// cache all concurrent elements and selectors
			this.e.dd = this.$refs.dropdown;
			this.e.dm = (this.settings.browse) ? document.getElementById(this.settings.menuId) : this.e.dd.querySelector(':scope > .drop.menu');
			this.s.it = ':scope > .item:not(.xhover):not(.disabled), :scope > .items > .item:not(.xhover):not(.disabled)'; // select all element in dropMenu regardless of it statuses
			this.s.it_i = `:scope > .item:not(.xhover):not(.disabled)${!(this.e.dd.matches('.indicating.multiple')) ? ':not(.selected)': ''}, :scope > .items > .item:not(.xhover):not(.disabled)${!(this.e.dd.matches('.indicating.multiple')) ? ':not(.selected)': ''}`; // select all element in dropMenu regarding it statuses
			this.s.it_f = `:scope > .item:not(.xhover):not(.disabled):not(.filtered)${!(this.e.dd.matches('.indicating.multiple')) ? ':not(.selected)': ''}, :scope > .items > .item:not(.xhover):not(.disabled):not(.filtered)${!(this.e.dd.matches('.indicating.multiple')) ? ':not(.selected)': ''}`; // select all element in dropMenu regarding it statuses and also excluding filtered items

			// check if dropdownMenu exist
			if (!this.e.dm) {
				console.log("A dropdown menu is missing");
				return;
			}

			this.uniqueId = utils.getUniqueId();
			this.e.dm.setAttribute('data-view', this.settings.view);
			this.e.dm.setAttribute('data-dmid', this.uniqueId);
			if (this.settings.page) this.e.dm.classList.add('fixed');
			// open dropdown if the enter key or arrow down key is pressed while dropdown is focused-on
			document.addEventListener('keydown', this.dd_openWithKeyboard);
			
			if (this.settings.selectable) {
				// cache all concurrent elements for selectable dropdown
				this.e.sc = this.$refs.sContent;
				this.e.ph = this.$refs.sPlaceholder;
				this.e.ip = this.$refs.sInput;

				// Warn if select dropdown does not have a name prop
				if (!this.name) console.warn("It might be difficult to get the data of a selection-dropdown on this page because its name prop is invalid.");

				// configure search box and cache concurrent element for searchable dropdown
				if (this.settings.searchable) {
					this.e.sb = this.$refs.searchBox;
					
					if (this.e.dd.hasAttribute('tabindex')) {
						this.e.sb.setAttribute('tabindex', this.e.dd.getAttribute('tabindex'));
						this.e.dd.removeAttribute('tabindex');
					}

					/* open dropdown if user typed in the searchbox */
					this.e.sb.addEventListener('input', this.dd_openWithSearch);
				}

				if (this.settings.multipleSelect) {
					this.e.sz = this.$refs.mDSizer;

					document.addEventListener('click', this.dd_mSClickFunc);
					document.addEventListener('keydown', this.dd_mSKBFunc);
				}

				/* set select dropdown value for preselected value */
				let items = [...this.e.dm.querySelectorAll(this.s.it)];
				if (this.settings.multipleSelect && items.filter((el) => el.matches('.selected'))[0])  items.filter((el) => el.matches('.selected')).forEach((el) => this.dd_setSelect(el));
				else if (!this.settings.multipleSelect && items.filter((el) => el.matches('.active'))[0]) this.dd_setSelect(items.filter((el) => el.matches('.active'))[0]);
			}
			
			/* checkerFill is a function to find all sub dropdownMenu
					that is linked to it dropdown by id and
					add it to settings.asdm. */
			if (this.settings.browseDm) this.settings.asdm.push(this.e.dd, this.e.dm);
			else this.settings.asdm.push(this.e.dd);
			this.dd_checkerFill(this.e.dm);

			let target = this.settings.findTriggerer && this.e.dd.querySelectorAll(':scope > *:not(".drop.menu").dd-triggerer')[0] ? this.e.dd.querySelectorAll(':scope > *:not(".drop.menu").dd-triggerer')[0] : this.e.dd;

			if (this.settings.hover) {
				target.addEventListener('mouseenter', this.dd_toggleDropdown);
				target.addEventListener('touchstart', this.dd_toggleDropdown);
			}
			else target.addEventListener('click', this.dd_toggleDropdown);

			this.e.dd.addEventListener('ddconsole', this.dd_console);
		},
		watch: {
			showDropdown(value) {
				if (value) {
					if (this.e.dd.matches('.disabled, [disabled]')) return;
					if (!this.settings.selectable && !this.e.dd.classList.contains('sub')) document.body.append(this.e.dm);
					let items = [...this.e.dm.querySelectorAll(this.s.it_i)];

					this.EscTrack = utils.getEscTrack();

					if (this.settings.searchable) {						
						this.e.sb.focus();
						// what to do when searching in a dropdown box
						this.e.sb.addEventListener('input', this.dd_searchFunc);
						utils.triggerEvent(this.e.sb, 'input');
					}
					document.addEventListener('click', this.dd_clickOnDom);
					document.addEventListener('keyup', this.dd_EscTabFunc);
					document.addEventListener('keydown', this.dd_KBFunc);
					window.addEventListener('resize', this.dd_CalcPosition);
					window.addEventListener('scroll', this.dd_CalcPosition, true);
					this.dd_onItemsHoverEvent();
					this.dd_CalcPosition();
					this.e.dm.classList.add('visible');

					// highlight (add .hover class to) the active item or the first item in the menu list if dropdown is opened with with keyboard keys or it is a searchable dropdown. (default action)
					if (this.tmp.keyboard) {
						let acItem = items.filter((el) => el.matches('.active'))[0] || items[0];
						
						if (acItem) {
							acItem.classList.add('hovered')
							items.filter((el) => el != acItem).forEach((el) => el.classList.remove('hovered'));
						}
						
						document.addEventListener('mousemove', this.dd_mouseMover);
					}
					// auto scroll dropdown-menu to active item position.
					setTimeout(() => {
						let acItem = items.filter((el) => el.matches('.active'))[0];
						if (acItem) {
							let
								getIop = utils.getParents(acItem, '', this.e.dm).filter((el) => (window.getComputedStyle(el).getPropertyValue('overflow-y') === 'auto' || window.getComputedStyle(el).getPropertyValue('overflow-y') === 'scroll'))[0],
								iOp = getIop ? getIop : this.e.dm,
								dScroll = iOp.scrollTop,
								sAmt = acItem.getBoundingClientRect().top - iOp.getBoundingClientRect().top + dScroll
							;

							iOp.scrollTop = sAmt;
						}
					}, this.settings.duration + 50);
				}
				else {
					// close all it sub-dropdown first.
					[...this.e.dm.querySelectorAll(':scope .dropdown.active')].forEach((el) => utils.triggerEvent(el, new CustomEvent('ddconsole', {detail: 'close'})));

					document.removeEventListener('click', this.dd_clickOnDom);
					document.removeEventListener('keyup', this.dd_EscTabFunc);
					document.removeEventListener('keydown', this.dd_KBFunc);
					document.removeEventListener('mousemove', this.dd_mouseMover);
					window.removeEventListener('resize', this.dd_CalcPosition);
					this.dd_offItemHoverEvent();
					[...this.e.dm.querySelectorAll(this.s.it)].forEach((el) => el.classList.remove('hovered'));

					if (this.settings.searchable) {
						this.e.sb.removeEventListener('input', this.dd_searchFunc);
						this.e.sb.value = '';
						this.e.sc.classList.remove('filtered');
						this.e.ph.classList.remove('filtered');
					}
					
					if (this.settings.hover) document.removeEventListener('mousemove', this.dd_toggleDropdown);
					
					// safely get out of escape track
					if (typeof(this.EscTrack) === 'number') {
						if (utils.checkEscStatus(this.EscTrack)) this.EscTrack = undefined;
						else {
							let
								count = 0,
								counter = setInterval(() => {
									if (utils.checkEscStatus(this.EscTrack)) {
										this.EscTrack = undefined;
										clearInterval(counter);
									}
									else if (count >= 5) {
										console.log(`Escape Track on ${this.e.dd} is lost.`);
										this.EscTrack = undefined;
										clearInterval(counter);
									}
									count++
								}, 5)
							;
						}
					}
					
					this.e.dm.classList.remove('visible');
				}
			},
			allItemFiltered(value) {
				if (value) utils.triggerEvent(this.e.dm, new CustomEvent('dmconsole', {detail: 'on allItemFiltered'}));
				else utils.triggerEvent(this.e.dm, new CustomEvent('dmconsole', {detail: 'off allItemFiltered'}));
			},
			allItemSelected(value) {
				if (value) utils.triggerEvent(this.e.dm, new CustomEvent('dmconsole', {detail: 'on allItemSelected'}));
				else utils.triggerEvent(this.e.dm, new CustomEvent('dmconsole', {detail: 'off allItemSelected'}));
			}
		},	
		beforeUnmount() {
			this.e.dd.append(this.e.dm); // return drop menu to the drop down to get it removed also.
			document.removeEventListener('click', this.dd_clickOnDom);
			document.removeEventListener('keyup', this.dd_EscTabFunc);
			document.removeEventListener('keydown', this.dd_KBFunc);
			document.removeEventListener('mousemove', this.dd_mouseMover);
			window.removeEventListener('resize', this.dd_CalcPosition);
			this.dd_offItemHoverEvent();
			if (this.settings.searchable) this.e.sb.removeEventListener('input', this.dd_searchFunc);
			if (this.settings.hover) document.removeEventListener('mousemove', this.dd_toggleDropdown);

			document.removeEventListener('keydown', this.dd_openWithKeyboard);
			
			if (this.settings.multipleSelect) {
				document.removeEventListener('click', this.dd_mSClickFunc);
				document.removeEventListener('keydown', this.dd_mSKBFunc);
			}

			if (this.settings.searchable) this.$refs.searchBox.removeEventListener('input', this.dd_openWithSearch);
			
			let target = this.settings.findTriggerer && this.e.dd.querySelectorAll(':scope > *:not(".drop.menu") .dd-triggerer')[0] ? this.e.dd.querySelectorAll(':scope > *:not(".drop.menu") .dd-triggerer')[0] : this.e.dd;

			if (this.settings.hover) {
				target.removeEventListener('mouseenter', this.dd_toggleDropdown);
				target.removeEventListener('touchstart', this.dd_toggleDropdown);
			}
			else target.removeEventListener('click', this.dd_toggleDropdown);

			this.e.dd.removeEventListener('ddconsole', this.dd_console);
		}
	}
</script>

<template>
	<div ref="dropdown" class="dropdown" :class="{ active: showDropdown }" :tabindex="this.settings.selectable ? 0 : null">
		<template v-if="settings.selectable">
			<div v-if="settings.multipleSelect" ref="sContent" class="content">
				<div v-for="item in tmp.mSelectContent" :key="item.index" :data-ddid="item.index" v-html="item.html" class="chip"></div>
			</div>
			<div v-else ref="sContent" v-html="tmp.selectContent" class="content"></div>
			<input v-if="settings.searchable" ref="searchBox" class='search' autocomplete='off' tabindex='0'>
			<span v-if="settings.searchable && settings.multipleSelect" ref="mDSizer" class='sizer'></span>
			<div ref="sPlaceholder" class="placeholder">{{ placeholder }}</div>
			<i v-if="$attrs.class.split(' ').includes('select')" ref="ddIcon" class="indicator icon luicon menu-down"></i>
			<input ref="sInput" type="hidden" :name="name">
		</template>
		<slot></slot>
	</div>
</template>