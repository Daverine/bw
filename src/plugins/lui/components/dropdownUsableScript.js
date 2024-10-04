m = {
    dd_setSelect(item, xClose = false) {
      if (!item || !settings.selectable) return;
      
      let items = [...dropMenu.querySelectorAll(selectors.items)];
      
      if (settings.multipleSelect) {
        if (item.matches('.selected')) return;

        let
          itemIndex = items.indexOf(item),
          ddid = utils.getUniqueId('ddid'),
          itemValue = item.getAttribute('data-value') || item.textContent
        ;
        
        item.classList.add('selected');
        tmp.selectionValue[ddid] = itemValue;
        compValue.value.next(Object.values(tmp.selectionValue));
        item.setAttribute('data-ddid', ddid);
        tmp.selectionContent.push({
          html: `${item.innerHTML} <i class="svgv1 action close trailing icon"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M480.435-421.652 277.522-219.304q-12.131 12.13-29.392 12.413-17.26.282-28.826-12.848-12.695-12.131-12.478-28.674.217-16.544 12.913-29.674L422.217-480 219.304-683.348q-12.695-12.13-12.695-28.674 0-16.543 12.695-29.674 11.566-12.13 28.826-11.848 17.261.283 29.392 12.414l202.913 202.347L682.478-741.13q12.131-12.131 29.392-12.414 17.26-.282 28.826 11.848 12.695 13.131 12.478 29.674-.217 16.544-11.913 28.674L538.783-480l202.478 201.913q11.696 12.696 11.913 29.457.217 16.76-12.478 28.891-11.566 13.13-28.826 12.848-17.261-.283-29.392-12.413L480.435-421.652Z"/></svg></i>`,
          index: ddid
        });
        selectableContentBox.classList.remove('no-content');

        if (settings.searchable && showDropdown.value) {
          searchBox.value = '';
          utils.triggerEvent(searchBox, 'input');
          searchBox.focus();
        }

        if (!items.filter((el) => !el.matches('.selected'))[0]) tmp.allItemSelected = true;

        if (!showDropdown.value || dropdown.matches('.indicating')) return;

        item.classList.remove('hovered');
        
        if (!settings.searchable) {
          let
            next = items.filter((el, i) => i > itemIndex && !el.matches('.selected'))[0],
            prev = items.filter((el, i) => i < itemIndex && !el.matches('.selected')).slice(-1)[0]
          ;
          if (next) next.classList.add('hovered');
          else if (prev) prev.classList.add('hovered');
        }

        dd_CalcPosition();
      }
      else {
        item.classList.add('active');
        if (!showDropdown.value && items.filter((el) => el !== item && el.matches('.active'))[0]) console.warn("A selection-dropdown on this page has multiple preselected value which is not suppose to be except it is a multiple-selection-dropdown. Only the first preselected value will be preselected.");

        items.filter((el) => el !== item).forEach((el) => el.classList.remove('active'));
        compValue.value.next(item.getAttribute('data-value') || item.textContent);
        tmp.selectionContent = item.innerHTML;
      }

      if (!xClose) {
        if (settings.searchable) {
          searchBox.value = '';
          utils.triggerEvent(searchBox, 'input');
        }

        showDropdown.value = false;
      }
    },
    dd_setDeselect(sItem) {
      if (!settings.multipleSelect) return;
      
      let
        ddid = sItem.getAttribute('data-ddid'),
        item = [...dropMenu.querySelectorAll(`:scope [data-ddid="${ddid}"]`)][0]
      ;

      delete tmp.selectionValue[ddid];
      compValue.value.next(Object.values(tmp.selectionValue));
      item.classList.remove('selected');
      item.setAttribute('data-ddid', '');
      tmp.selectionContent = tmp.selectionContent.filter((el) => el.index !== ddid);

      if (tmp.allItemSelected) tmp.allItemSelected = false;
      if (!tmp.selectionContent[0]) selectableContentBox.classList.add('no-content');

      if (showDropdown.value) {
        if (settings.searchable) {
          searchBox.value = '';
          utils.triggerEvent(searchBox, 'input');
        }
      
        dd_CalcPosition();
      }

      if (settings.searchable) searchBox.focus();
    },
    dd_toggleDropdown(e) {
      if (typeof(e) === "object") {
        if ([...dropdown.querySelectorAll(':scope > .content > .chip')].filter((el) => el.contains(e.target))[0] || (e.target && e.target.closest('ex-dropdown'))) return;

        if (settings.openOnMouseover) {
          let timeDelay = settings.delay || 300;

          if (e.type === 'mouseenter') {
            document.addEventListener('mousemove', dd_toggleDropdown);
            clearTimeout(tmp.hideDropdownTimeout);
            tmp.showDropdownTimeout = setTimeout(() => {
              if (settings.searchable) dd_toggleDropdown('activate keyboard controls');
              else showDropdown.value = true;
            }, timeDelay/2);
          }
          else if (e.type === 'mousemove') {
            if (tmp.asdm.filter((el) => el.contains(e.target))[0]) {
              settings.closing = false;
              clearTimeout(tmp.hideDropdownTimeout);
              return;
            }
            if (settings.closing) return;
            
            settings.closing = true;
            clearTimeout(tmp.showDropdownTimeout);
            tmp.hideDropdownTimeout = setTimeout(() => {
              settings.closing = false;
              showDropdown.value = false;
            }, timeDelay);
          }
          else if (e.type === 'touchstart') {
            // prevent opening and closing event from interfering with drop menu item actions.
            if (dropMenu.contains(e.target)) return;
            
            if (showDropdown.value) {
              clearTimeout(tmp.showDropdownTimeout);
              showDropdown.value = false;
            }
            else {
              document.addEventListener('mousemove', dd_toggleDropdown);
              clearTimeout(tmp.hideDropdownTimeout);
              if (settings.searchable) dd_toggleDropdown('activate keyboard controls');
              else showDropdown.value = true;
            }
          }
        }
        else {
          // prevent opening and closing event from interfering with drop menu item actions.
          if (dropMenu.contains(e.target)) return;
          
          let timeDelay = settings.delay || 0;

          e.preventDefault();
          //get pointer cordinate to use for page-dropdown
          if (settings.page) tmp.evt = e;

          if (showDropdown.value) {
            if (settings.searchable && dropdown.classList.contains('select') && !dropdown.querySelector(':scope .ddico')?.contains(e.target)) {
              searchBox.focus();
              return;
            }
            
            setTimeout(() => showDropdown.value = false, timeDelay);
          }
          else {
            setTimeout(() => {
              if (settings.searchable) dd_toggleDropdown('activate keyboard controls');
              else showDropdown.value = true;
            }, timeDelay)
          }
        }
        return;
      }
      else if (e === 'activate keyboard controls') {
        tmp.keyboard = true;
        if (showDropdown.value) return;
      }
      
      if (showDropdown.value) showDropdown.value = false;
      else if (e !== 'close-all') showDropdown.value = true;

      if (e === 'close-all') this.m.dd_closeAll();
    },
    dd_openWithKeyboard(e) {
      if ((e.key == "Enter" || e.key == "ArrowDown") && (dropdown.matches(':focus') || dropdown.querySelectorAll(':scope :focus')[0]) && !showDropdown.value) {
        e.preventDefault();
        dd_toggleDropdown('activate keyboard controls');
      }
    },
    dd_openWithSearch() {
      if (searchBox.value) {
        selectablePlaceholder.classList.add('filtered');
        if (!settings.multipleSelect) selectableContentBox.classList.add('filtered');
      }
      else {
        selectablePlaceholder.classList.remove('filtered');
        if (!settings.multipleSelect) selectableContentBox.classList.remove('filtered');
      }

      searchBoxSizer.textContent = searchBox.value;
      searchBox.style.width = searchBoxSizer.clientWidth + 'px';
      if (!showDropdown.value) dd_toggleDropdown('activate keyboard controls');
    },
    dd_mSClickFunc(e) {
      let
        sItems = [...dropdown.querySelectorAll(':scope > .content > .chip')],
        sItem = sItems.filter((el) => el.contains(e.target))[0],
        sItemClose = [...dropdown.querySelectorAll(':scope > .content > .chip > .close')].filter((el) => el.contains(e.target))[0]
      ;
      // deselecting multiple dropdown item when not opened when user clicks on the close button of a chip
      if (sItemClose && !showDropdown.value) dd_setDeselect(sItem);
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
      let acSItems = [...dropdown.querySelectorAll(':scope > .content > .chip.active')];

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

          acSItems.forEach((el) => dd_setDeselect(el));
        }
        else if (e.key === 'ArrowRight' && nextSib) {
          if (nextSib === searchBox) {
            acSItems.forEach((el) => el.classList.remove('active'));
            searchBox.focus();
            return;
          }
          else if (nextSib.matches('.chip')) {
            if (!e.shiftKey) acSItems.forEach((el) => el.classList.remove('active'));
            nextSib.classList.add('active');
          }
        }
        else if (e.key === 'ArrowLeft' && prevSib && prevSib.matches('.chip')) {
          if (!e.shiftKey) acSItems.forEach((el) => el.classList.remove('active'));
          prevSib.classList.add('active');
        }
        else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          acSItems.forEach((el) => el.classList.remove('active'));
          if (e.key === 'ArrowDown') dd_toggleDropdown('activate keyboard controls');
        }
        else if (e.key === ' ' || e.key === 'Enter' || e.key === 'Tab') acSItems.forEach((el) => el.classList.remove('active'));
      }
      /* delete the last chip in multiple dropdown if searchbox is focused-on and seachbox is empty and the backspace key is pressed */
      else if (settings.searchable && searchBox.matches(':focus') && !searchBox.value && e.key == 'Backspace' && [...dropdown.querySelectorAll(':scope > .content > .chip')][0]) dd_setDeselect([...dropdown.querySelectorAll(':scope > .content > .chip')].slice(-1)[0]);
      else if ((dropdown.matches(':focus') || dropdown.querySelectorAll(':scope :focus')[0])) {
        let sItems = [...dropdown.querySelectorAll(':scope > .content > .chip')];

        if (sItems[0]) {
          if (e.key == 'ArrowRight') sItems[0].classList.add('active');
          else if (e.key == 'ArrowLeft') sItems.pop().classList.add('active');
        }
      }
    },
    dd_checkerFill(dm) {
      if (dm.querySelectorAll(':scope .dropdown.browse')[0]) {
        [...dm.querySelectorAll(':scope .dropdown.browse')].forEach((el) => {
          let newDm = document.getElementById(el.getAttribute('data-target')); 
          if (newDm) {
            tmp.asdm.push(newDm);
            this.m.dd_checkerFill(newDm);
          }
        });
      }
    },
    dd_searchFunc() {
      let 
        items = [...dropMenu.querySelectorAll(selectors.items_of_indicating_dropdown)],
        filter = searchBox.value.toUpperCase()
      ;

      items.forEach((el) => {
        if (el.textContent.toUpperCase().trim().indexOf(filter.trim()) !== 0) el.classList.add('filtered');
        else el.classList.remove('filtered');
      });

      items = [...dropMenu.querySelectorAll(selectors.items_filtered)];

      if (!items[0]) {
        [...dropMenu.querySelectorAll(selectors.items)].forEach((el) => el.classList.remove('hovered'));

        if (filter && !tmp.allItemFiltered) tmp.allItemFiltered = true;
        else if (!filter && tmp.allItemFiltered) tmp.allItemFiltered = false;
      }
      else if (filter && !dropdown.matches('.indicating')) {
        [...dropMenu.querySelectorAll(selectors.items)].forEach((el) => el.classList.remove('hovered'));
        items[0].classList.add('hovered');
        tmp.allItemFiltered = false;
      }
      
      if (settings.multipleSelect) {
        if (filter) {
          selectableContentBox.classList.remove('no-content');
          let sItems = [...dropdown.querySelectorAll(':scope > .content > .chip')];
          if (sItems[0]) sItems.forEach(el => el.classList.remove('active'));
        }
        else if (!tmp.selectionContent[0]) selectableContentBox.classList.add('no-content');
      }

      dd_CalcPosition();
    },
    dd_clickOnDom(e) {
      let
        items = [...dropMenu.querySelectorAll(selectors.items)],
        item = items.filter((el) => el.contains(e.target))[0],
        sItem = [...dropdown.querySelectorAll(':scope > .content > .chip')].filter((el) => el.contains(e.target))[0],
        sItemClose = [...dropdown.querySelectorAll(':scope > .content > .chip > .close')].filter((el) => el.contains(e.target))[0],
        exiter = [...dropMenu.querySelectorAll(dropdown_exiter)].filter(el => el.contains(e.target))[0]
      ;

      /* Close when an exiter is clicked or on "Click Out" */
      if (exiter || (!dropdown.contains(e.target) && !dropMenu.contains(e.target))) showDropdown.value = false;
      /* do something when an item is clicked */
      else if (item) {					
        if (item.matches('.dropdown')) return;

        if (settings.selectable) {
          /* deselecting items for multiple select dropdown that has the indicating class */
          if (item.matches('.selected')) dd_setDeselect([...dropdown.querySelectorAll(':scope > .content > .chip')].filter(el => el.getAttribute('data-ddid') === item.getAttribute('data-ddid'))[0]);
          // select item if dropdown is selectable
          else dd_setSelect(item, (settings.multipleSelect ? true : false));
        }
        // close all dropdown including all sub dropdowns and parent dropdowns
        else if ((settings.closeOnItemClick && !item.matches('.dd-xclose')) || item.matches('.dd-close')) dd_toggleDropdown('close-all');
      }
      else if (sItemClose) dd_setDeselect(sItem);

    },
    dd_EscTabFunc(e) {
      // you should use an Escape tracker here to stop other plugins like modal from triggering close on escape press if the dropdown is opened down.
      if ((e.key == 'Escape' && utils.checkEscStatus(tmp.escTrack)) || (e.key == 'Tab' && ![...dropdown.querySelectorAll(':scope :focus')][0] && ![...dropMenu.querySelectorAll(':scope :focus')][0] && ![...dropMenu.querySelectorAll(':scope .dropdown.active')][0])) {
        e.preventDefault();
        if (e.key === 'Escape') tmp.escTrack = undefined;
        showDropdown.value = false;

        if (e.key == 'Tab') this.m.dd_closeAll();
        // I don't know why I used setTimeout here
        else if (dropdown.matches('.sub') && dd_getParentDropdown()) setTimeout(() => dropdown.classList.add('hovered'), 10);
      }
    },
    dd_KBFunc(e) {
      let items = [...dropMenu.querySelectorAll(selectors.items_filtered)];
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
          item.click();
        }
      }
      // Arrow left key (Use to close a sub dropdown) support
      else if (e.key == 'ArrowLeft' && dropdown.matches('.sub') && ![...dropMenu.querySelectorAll(':scope .dropdown.active')][0]) {
        e.preventDefault();
        showDropdown.value = false;
        // I don't know why I used setTimeout here
        if (dropdown.matches('.sub') && dd_getParentDropdown()) setTimeout(() => dropdown.classList.add('hovered'), 10);
      }
      // Up and down arrrow key navigation on dropdown menu item.
      else if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
        let
          hvItem = items.filter((el) => el.matches('.hovered'))[0],
          acItem = items.filter((el) => el.matches('.active'))[0]
        ;

        if (![...dropMenu.querySelectorAll(':scope .dropdown.active')][0]) {
          e.preventDefault();
          dd_offItemsHoverEvent();

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
              getIop = utils.getParents(ci, '', dropMenu).filter((el) => (window.getComputedStyle(el).getPropertyValue('overflow-y') === 'auto' || window.getComputedStyle(el).getPropertyValue('overflow-y') === 'scroll'))[0],
              iOp = getIop ? getIop : dropMenu,
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
            if (settings.selectable && !settings.multipleSelect) dd_setSelect(ci, true);
          }
        }

        document.addEventListener('mousemove', dd_mouseMover);
      }
    },
    dd_ItemHover(e) {
      let item = e.currentTarget;
      item.classList.add('hovered');
      [...dropMenu.querySelectorAll(selectors.items_of_indicating_dropdown)].filter((el) => el !== item).forEach((el) => el.classList.remove('hovered'));
    },
    dd_ItemLeave(e) {
      e.currentTarget.classList.remove('hovered');
    },
    dd_onItemsHoverEvent() {
      [...dropMenu.querySelectorAll(selectors.items_of_indicating_dropdown)].forEach((el) => {
        el.addEventListener('mouseenter', dd_ItemHover);
        el.addEventListener('mouseleave', dd_ItemLeave);
      });
    },
    dd_offItemsHoverEvent() {
      [...dropMenu.querySelectorAll(selectors.items_of_indicating_dropdown)].forEach((el) => {
        el.removeEventListener('mouseenter', dd_ItemHover);
        el.removeEventListener('mouseleave', dd_ItemLeave);
      });
    },
    dd_mouseMover(e) {
      let items = [...dropMenu.querySelectorAll(selectors.items_of_indicating_dropdown)];

      if (dropdown.contains(e.target) || dropMenu.contains(e.target)) {
        let item = items.filter((el) => el.contains(e.target))[0];
        if (!item) return;
        item.classList.add('hovered');
        items.filter((el) => el !== item).forEach((el) => el.classList.remove('hovered'));
      }
      else if (settings.openOnMouseover) { showDropdown.value = false; }
      else { items.forEach((el) => el.classList.remove('hovered')); }

      dd_onItemsHoverEvent();
      document.removeEventListener('mousemove', dd_mouseMover);
    },
    dd_CalcPosition() {
      if (settings.page) {
        let cord = {
          left: (tmp.evt.pageX - window.scrollX) || 0,
          top: (tmp.evt.pageY - window.scrollY) || 0,
          right: undefined, bottom: undefined,
        };

        cord.right = document.documentElement.clientWidth - cord.left;
        cord.bottom = document.documentElement.clientHeight - cord.top;
        dropMenu.style.right = 'auto';
        dropMenu.style.bottom = 'auto';

        if (cord.right >= dropMenu.offsetWidth) {
          dropMenu.style.left = cord.left;
          dropMenu.classList.add('rhs');
        }
        else if (cord.left >= dropMenu.offsetWidth) {
          dropMenu.style.left = cord.left - dropMenu.offsetWidth;
          dropMenu.classList.add('lhs');
        }
        else if (cord.right >= cord.left) {
          dropMenu.classList.add('rhs');
          if (cord.right + cord.left >= dropMenu.offsetWidth)  dropMenu.style.left = document.documentElement.clientWidth - dropMenu.offsetWidth;
          else {
            dropMenu.style.left = 0;
            dropMenu.style.maxWidth = document.documentElement.clientWidth;
          }
        }
        else {
          dropMenu.classList.add('lhs');
          dropMenu.style.left = 0;
          if (cord.right + cord.left < dropMenu.offsetWidth) dropMenu.style.maxWidth = document.documentElement.clientWidth;
        }

        if (cord.bottom >= dropMenu.offsetHeight) {
          dropMenu.style.top = cord.top;
          dropMenu.classList.add('downward');
        }
        else if (cord.top >= dropMenu.offsetHeight) {
          dropMenu.style.top = cord.top - dropMenu.offsetHeight;
          dropMenu.classList.add('upward');
        }
        else if (cord.bottom >= cord.top) {
          dropMenu.classList.add('downward');
          if (cord.bottom + cord.top >= dropMenu.offsetHeight) dropMenu.style.top = document.documentElement.clientHeight - dropMenu.offsetHeight;
          else {
            dropMenu.style.top = 0;
            dropMenu.style.maxHeight = document.documentElement.clientHeight;
          }
        }
        else {
          dropMenu.classList('upward');
          dropMenu.style.top = 0;
          if (cord.bottom + cord.top < dropMenu.offsetHeight) dropMenu.style.maxWidth = document.documentElement.clientHeight;
        }
      }
      else {
        let
          dProp = dropdown.getBoundingClientRect(),
          dmProp = {
            width: dropMenu.offsetWidth,
            height: dropMenu.offsetHeight
          },
          vHeight = window.innerHeight,
          vWidth = window.innerWidth - utils.getScrollbarWidth(),
          spacing, dmPosition
        ;

        if (settings.view === "vertical") {
          spacing = {
            top: dProp.top,
            bottom: vHeight - dProp.top - dProp.height,
            left: dProp.left + dProp.width,
            right: vWidth - dProp.left,
          }

          dmPosition = {
            left: dProp.left + dProp.width - dmProp.width,
            right: dProp.left,
            top: dProp.top - dmProp.height,
            bottom: dProp.top + dProp.height,
          }
        }
        else {
          spacing = {
            top: dProp.top + dProp.height,
            bottom: vHeight - dProp.top,
            left: dProp.left,
            right: vWidth - dProp.left - dProp.width,
          }

          dmPosition = {
            left: dProp.left - dmProp.width,
            right: dProp.left + dProp.width,
            top: dProp.top + dProp.width - dmProp.height,
            bottom: dProp.top,
          }
        }

        if (settings.directionPriority.x === 'right') {
          if (spacing.right >= dmProp.width || spacing.right >= spacing.left || dmProp.width > spacing.left) {
            if (!dropdown.classList.contains('select')) dropMenu.style.left = `${dmPosition.right}px`;
            if (!dropMenu.classList.contains('rhs')) {
              dropMenu.classList.add('rhs');
              dropMenu.classList.remove('lhs');
            }
          }
          else {
            if (!dropdown.classList.contains('select')) dropMenu.style.left = `${dmPosition.left}px`;
            if (!dropMenu.classList.contains('lhs')) {
              dropMenu.classList.add('lhs');
              dropMenu.classList.remove('rhs');
            }
          }
        }
        else if (settings.directionPriority.x === 'center') {
                    dropMenu.style.left = `${Math.max(Math.min(Math.max(0, dProp.left + (dProp.width/2) - (dmProp.width/2)), (vWidth - dmProp.width)), 0)}px`;
        }
        else {
          if (spacing.left >= dmProp.width) {
            if (!dropdown.classList.contains('select')) dropMenu.style.left = `${dmPosition.left}px`;
            if (!dropMenu.classList.contains('lhs')) {
              dropMenu.classList.add('lhs');
              dropMenu.classList.remove('rhs');
            }
          }
          else {
            if (!dropdown.classList.contains('select')) dropMenu.style.left = `${dmPosition.right}px`;
            if (!dropMenu.classList.contains('rhs')) {
              dropMenu.classList.add('rhs');
              dropMenu.classList.remove('lhs');
            }
          }
        }

        if (settings.directionPriority.y === 'bottom') {
          if (spacing.bottom >= dmProp.height || spacing.bottom >= spacing.top || dmProp.height > spacing.top) {
            if (!dropdown.classList.contains('select')) dropMenu.style.top = `${dmPosition.bottom}px`;
            if (!dropMenu.classList.contains('downward')) {
              dropMenu.classList.add('downward');
              dropMenu.classList.remove('upward');
            }
          }
          else {
            if (!dropdown.classList.contains('select')) dropMenu.style.top = `${dmPosition.top}px`;
            if (!dropMenu.classList.contains('upward')) {
              dropMenu.classList.add('upward');
              dropMenu.classList.remove('downward');
            }
          }
        }
        else {
          if (spacing.top >= dmProp.height) {
            if (!dropdown.classList.contains('select')) dropMenu.style.top = `${dmPosition.top}px`;
            if (!dropMenu.classList.contains('upward')) {
              dropMenu.classList.add('upward');
              dropMenu.classList.remove('downward');
            }
          }
          else {
            if (!dropdown.classList.contains('select')) dropMenu.style.top = `${dmPosition.bottom}px`;
            if (!dropMenu.classList.contains('downward')) {
              dropMenu.classList.add('downward');
              dropMenu.classList.remove('upward');
            }
          }
        }
      }
    },
    dd_closeAll() {
      let pDd = dd_getParentDropdown();
      if (pDd) utils.triggerEvent(pDd, new CustomEvent('ddconsole', {detail: 'close all ancestor dropdown'}));
    },
    dd_getParentDropdown() {
      let pDd = utils.getParents(dropdown, '.drop.menu')[0];
      pDd = utils.getParents(dropdown, '.dropdown')[0] || (pDd && pDd.getAttribute('id'))
        ? [...document.querySelectorAll(`[data-browse-dm="${pDd.getAttribute('id')}"]`)].filter(el => el.matches('.dropdown'))[0]
        : undefined;
      return pDd;
    },
    dd_console(e) {
      if (e.detail === 'close') showDropdown.value = false;
      else if (e.detail === 'close all ancestor dropdown') dd_toggleDropdown('close-all');
      else if (e.detail === 'open') showDropdown.value = true;
      else if (e.detail === 'open with keyboard') dd_toggleDropdown('activate keyboard controls');
      else if (e.detail.command === 'set hovered item' && e.detail.el) {
        [...dropMenu.querySelectorAll(selectors.items)].forEach((el) => el.classList.remove('hovered'));
        setTimeout(() => e.detail.el.classList.add('hovered'), 10);
      }
    },
  }