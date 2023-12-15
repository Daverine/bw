export function Collapsible() {
    const dnm = {
        nextAll(el) {
			const nextElements = []
			let nextElement = el
			
			while(nextElement.nextElementSibling) {
				nextElements.push(nextElement.nextElementSibling)
				nextElement = nextElement.nextElementSibling
			}
			
			return nextElements
		},
        toggleCollapsible(e, el) {
            el = el || e.currentTarget;

            const
                collapsible = dnm.nextAll(el).filter((el) => el.classList.contains('collapsible'))[0],
                accordiion = el.getAttribute('data-collapsible')
            ;

            if (e !== 'initialize') el.classList.toggle('active');
            
            if (collapsible) {
                if (el.classList.contains('active')) {
                    collapsible.style.maxHeight = collapsible.scrollHeight + 'px';
                    
                    if (accordiion) {
                        let activeElems = [...el.parentNode.querySelectorAll(`:scope > [data-collapsible='${accordiion}']`)].filter(elem => elem.classList.contains('active') && elem !== el);
                        if (activeElems) {
                            activeElems.filter(elem => elem !== el).forEach(el => el.dispatchEvent(new Event('click', {bubbles: true})));
                        }
                    }
                }
                else collapsible.style.maxHeight = null;
            }
        }
    };

    return {
        mounted(el) {
            dnm.toggleCollapsible('initialize', el);
            el.addEventListener('click', dnm.toggleCollapsible);
        },
        unmounted(el) {
            el.removeEventListener('click', dnm.toggleCollapsible);
        }
    }
}