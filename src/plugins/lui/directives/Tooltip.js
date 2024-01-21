import { utils } from "../utils";

export function Tooltip() {
    const dnm = {
        createTooltip() {
            dnm.tooltip = document.createElement('div');
            dnm.tooltip.classList.add('plain', 'tooltip');
            dnm.tooltip.setAttribute('data-tooltipid', dnm.uniqueId);
            dnm.tooltip.appendChild(document.createTextNode(dnm.el.getAttribute('data-tooltip')));
            document.body.append(dnm.tooltip);
        },
        showTooltip(e) {
            dnm.el = e.currentTarget;
            dnm.evt = e;
            dnm.binding = dnm.el.luiData.tooltip.binding;
            dnm.delay = 150;

            if (!dnm.el.luiData.tooltipId || !document.querySelector(`[data-tooltipid="${dnm.el.luiData.tooltipId}"]`)) {
                dnm.uniqueId = utils.getUniqueId();
                dnm.el.luiData.tooltipId = dnm.uniqueId;
                dnm.createTooltip();
            }
            else {
                dnm.uniqueId = dnm.el.luiData.tooltipId;
                dnm.tooltip = document.querySelector(`[data-tooltipid="${dnm.uniqueId}"]`);
            }

            dnm.calcPosition();
            dnm.el.addEventListener('mouseleave', dnm.hideTooltip);

            if (dnm.binding.modifiers.hasOwnProperty('unblocking')) return;
            
            dnm.el.addEventListener('mousemove', dnm.mousePosition);
        },
        hideTooltip() {
            dnm.el.removeEventListener('mousemove', dnm.mousePosition);
            dnm.el.removeEventListener('mouseleave', dnm.hideTooltip);
            clearTimeout(dnm.renderer);
            dnm.tooltip.classList.remove('active');
        },
        getCoords(e) {
            return {
                x: e.type.indexOf("touch") > -1 ? e.touches[0].pageX : e.clientX,
                y: e.type.indexOf('touch') > -1 ? e.touches[0].pageY : e.clientY
            }
        },
        mousePosition(e) {
            let
                coord = dnm.getCoords(e),
                prevCoord = dnm.getCoords(dnm.evt)
            ;

            if (Math.abs(coord.x - prevCoord.x) > 20 || Math.abs(coord.y - prevCoord.y) > 20) {
                dnm.evt = e;
                dnm.tooltip.classList.remove('active');
                clearTimeout(dnm.renderer);
                dnm.renderer = setTimeout(() => { dnm.calcPosition(); }, dnm.delay);
            }
        },
        calcPosition() {
            document.body.append(dnm.tooltip);
            dnm.tooltip.style.width = null;
            dnm.tooltip.classList.remove('rhs', 'lhs', 'upward', 'downward');

            let 
                prop = dnm.getCoords(dnm.evt),
                tProp = dnm.evt.target.getBoundingClientRect(),
                unblocking = dnm.binding.modifiers.hasOwnProperty('unblocking'),
                vHeight = window.innerHeight,
                vWidth = window.innerWidth,
                offset = 5,
                spacing = {}, tpPos = {}
            ;

            prop.width = dnm.tooltip.offsetWidth;

            if (unblocking) {
                dnm.tooltip.style.left = `${Math.max(Math.min(Math.max(0, tProp.left + (tProp.width/2) - (prop.width/2)), (vWidth - prop.width)), 0)}px`;
                if (prop.width > vWidth) dnm.tooltip.style.width = `${vWidth}px`;
            }
            else {
                spacing.top = prop.y - offset;
                spacing.bottom = window.innerHeight - prop.y - offset;
                spacing.left = prop.x - offset;
                spacing.right = window.innerWidth - prop.x - offset;

                tpPos.left = prop.x - dnm.tooltip.offsetWidth - offset;
                tpPos.right = prop.x + offset;

                if (spacing.right >= prop.width || spacing.right >= spacing.left) {
                    if (prop.width > spacing.right) dnm.tooltip.style.width = `${spacing.right}px`;
                    dnm.tooltip.style.left = `${tpPos.right}px`;
                    dnm.tooltip.classList.add('rhs');
                }
                else {
                    if (prop.width > spacing.left) dnm.tooltip.style.width = `${spacing.left}px`;
                    dnm.tooltip.style.left = `${tpPos.left}px`;
                    dnm.tooltip.classList.add('lhs');
                }
            }

            prop.height = dnm.tooltip.offsetHeight;

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
                dnm.tooltip.style.top = `${tpPos.bottom}px`;
                dnm.tooltip.classList.add('upward');
            }
            else {
                dnm.tooltip.style.top = `${tpPos.top}px`;
                dnm.tooltip.classList.add('downward');
            }

            dnm.tooltip.classList.add('active');
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

            el.addEventListener('mouseenter', dnm.showTooltip);
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