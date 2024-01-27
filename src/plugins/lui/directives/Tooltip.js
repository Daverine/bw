import { utils } from "../utils";

export function Tooltip() {
    const dnm = {
        tooltip: 'tooltip',
        createTooltip() {
            this.tooltip = document.createElement('div');
            this.tooltip.classList.add('plain', 'tooltip');
            this.tooltip.setAttribute('data-tooltipid', this.uniqueId);
            this.tooltip.appendChild(document.createTextNode(this.el.getAttribute('data-tooltip')));
            document.body.append(this.tooltip);
        },
        showTooltip(e) {
            this.el = e.currentTarget;
            this.evt = e;
            this.binding = this.el.luiData.tooltip.binding;
            this.delay = 150;

            if (!this.el.luiData.tooltipId || !document.querySelector(`[data-tooltipid="${this.el.luiData.tooltipId}"]`)) {
                this.uniqueId = utils.getUniqueId();
                this.el.luiData.tooltipId = this.uniqueId;
                this.createTooltip();
            }
            else {
                this.uniqueId = this.el.luiData.tooltipId;
                this.tooltip = document.querySelector(`[data-tooltipid="${this.uniqueId}"]`);
            }

            this.calcPosition();
            this.el.addEventListener('mouseleave', this.hideTooltip.bind(this));
            if (this.binding.modifiers.hasOwnProperty('unblocking')) return;
            this.el.addEventListener('mousemove', this.mousePosition.bind(this));
        },
        hideTooltip() {
            this.el.removeEventListener('mousemove', this.mousePosition);
            this.el.removeEventListener('mouseleave', this.hideTooltip);
            clearTimeout(this.renderer);
            this.tooltip.classList.remove('active');
        },
        getCoords(e) {
            return {
                x: e.type.indexOf("touch") > -1 ? e.touches[0].pageX : e.clientX,
                y: e.type.indexOf('touch') > -1 ? e.touches[0].pageY : e.clientY
            }
        },
        mousePosition(e) {
            let
                coord = this.getCoords(e),
                prevCoord = this.getCoords(this.evt)
            ;

            if (Math.abs(coord.x - prevCoord.x) > 20 || Math.abs(coord.y - prevCoord.y) > 20) {
                this.evt = e;
                this.tooltip.classList.remove('active');
                clearTimeout(this.renderer);
                this.renderer = setTimeout(() => { this.calcPosition(); }, this.delay);
            }
        },
        calcPosition() {
            document.body.append(this.tooltip);
            this.tooltip.style.width = null;
            this.tooltip.classList.remove('rhs', 'lhs', 'upward', 'downward');

            let 
                prop = this.getCoords(this.evt),
                tProp = this.evt.target.getBoundingClientRect(),
                unblocking = this.binding.modifiers.hasOwnProperty('unblocking'),
                vHeight = window.innerHeight,
                vWidth = window.innerWidth,
                offset = 5,
                spacing = {}, tpPos = {}
            ;

            prop.width = this.tooltip.offsetWidth;

            if (unblocking) {
                this.tooltip.style.left = `${Math.max(Math.min(Math.max(0, tProp.left + (tProp.width/2) - (prop.width/2)), (vWidth - prop.width)), 0)}px`;
                if (prop.width > vWidth) this.tooltip.style.width = `${vWidth}px`;
            }
            else {
                spacing.top = prop.y - offset;
                spacing.bottom = window.innerHeight - prop.y - offset;
                spacing.left = prop.x - offset;
                spacing.right = window.innerWidth - prop.x - offset;

                tpPos.left = prop.x - this.tooltip.offsetWidth - offset;
                tpPos.right = prop.x + offset;

                if (spacing.right >= prop.width || spacing.right >= spacing.left) {
                    if (prop.width > spacing.right) this.tooltip.style.width = `${spacing.right}px`;
                    this.tooltip.style.left = `${tpPos.right}px`;
                    this.tooltip.classList.add('rhs');
                }
                else {
                    if (prop.width > spacing.left) this.tooltip.style.width = `${spacing.left}px`;
                    this.tooltip.style.left = `${tpPos.left}px`;
                    this.tooltip.classList.add('lhs');
                }
            }

            prop.height = this.tooltip.offsetHeight;

            if (unblocking) {
                spacing.top = tProp.top;
                spacing.bottom = vHeight - tProp.top - tProp.height;
                tpPos.top = tProp.top - prop.height - offset;
                tpPos.bottom = tProp.top + tProp.height + offset;
            }
            else {
                tpPos.top = prop.y - prop.height - offset;
                tpPos.bottom = prop.y + offset;
            }

            if (spacing.bottom >= prop.height || spacing.bottom >= spacing.top) {
                this.tooltip.style.top = `${tpPos.bottom}px`;
                this.tooltip.classList.add('upward');
            }
            else {
                this.tooltip.style.top = `${tpPos.top}px`;
                this.tooltip.classList.add('downward');
            }

            this.tooltip.classList.add('active');
        }
    }
    return {
        mounted(el, binding) {
            if (binding.value) el.setAttribute('data-tooltip', String(binding.value));

            // Attach binding to el itself to have it accessable anywhere.
            if (el.luiData === undefined) el.luiData = {};
            el.luiData.tooltip = {};
            el.luiData.tooltip.binding = binding;
            dnm.binding = binding;

            el.addEventListener('mouseenter', dnm.showTooltip.bind(dnm));
        },
        unmounted(el) {
            let 
                uniqueId = el.luiData.tooltipId,
                tooltip = document.querySelector(`[data-tooltipid="${uniqueId}"]`)
            ;
            
            if (tooltip) tooltip.remove();
        }
    }
}

/* tooltip should be non-blocking. it can appear in any of the four sides of the element. it open on mousehover and focus enter */