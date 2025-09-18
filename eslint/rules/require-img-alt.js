import {
	findAttribute,
	findBindDirective,
	findShorthandAttribute,
	getStaticAttributeValue
} from 'eslint-plugin-svelte/lib/utils/ast-utils.js';

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'require meaningful alt text on img elements inside Svelte routes',
			recommended: false
		},
		schema: [],
		messages: {
			missingAlt: 'Provide an alt attribute for this image.',
			emptyAlt: 'Alt text should not be empty. Describe the image for screen readers.'
		}
	},
	create(context) {
		return {
			"SvelteElement[name.name='img'] > SvelteStartTag"(node) {
				const altAttr = findAttribute(node, 'alt');

				if (altAttr) {
					if (altAttr.value.length === 0) {
						context.report({ node: altAttr, messageId: 'emptyAlt' });
						return;
					}

					const staticValue = getStaticAttributeValue(altAttr);
					if (typeof staticValue === 'string' && staticValue.trim().length === 0) {
						context.report({ node: altAttr, messageId: 'emptyAlt' });
					}
					return;
				}

				if (findBindDirective(node, 'alt') || findShorthandAttribute(node, 'alt')) {
					return;
				}

				for (const attribute of node.attributes) {
					if (attribute.type === 'SvelteSpreadAttribute') {
						return;
					}
				}

				context.report({ node, messageId: 'missingAlt' });
			}
		};
	}
};

export default rule;
