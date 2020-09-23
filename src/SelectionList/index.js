import "@default-js/defaultjs-html-components/src/components/Pagination";
import { NODENAME as RequestNodeName } from "./Request";
import BaseField from "@default-js/defaultjs-html-form/src/BaseField";
import { HTML_TAG_PREFIX } from "@default-js/defaultjs-html-form/src/Constants";
import { Renderer, Template } from "@default-js/defaultjs-template-language";

export const NODENAME = HTML_TAG_PREFIX + "selection-list";
const ATTR_REQUEST = "request";
const ATTR_TEMPLATE = "template";
const ATTRIBUTES = [ATTR_REQUEST, ATTR_TEMPLATE];
const TEMPLATE = `
<div class="${NODENAME}-filter"><input class="${NODENAME}-filter-input" type="text">
	<button class="${NODENAME}-filter-button">filter</button>
</div>
<div class="${NODENAME}-content"></div>
<d-pagination class="${NODENAME}-pagination" size="9" disable-shadow-dom></d-pagination>`;

const getTemplate = (node) => {
	let template = node.find(":scope > template").first();
	if (!!template) return template;
	const value = node.attr(ATTR_TEMPLATE);
	if (!value) return TEMPLATE;
	try {
		template = find(value).first();
		if (!!template) return template;
	} catch (e) {}
	return new URL(value, location.href);
};

const execute = async (field) => {
	const { request, container, form, renderer } = field;
	let data = await request.execute({ context: form.data });
	data = await data.json();
	renderer.render({ container, data });
};

class SelectionList extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	constructor() {
		super();
		this.initialized = false;
	}

	async init() {
		this.initSelectionList();
	}

	async initSelectionList() {
		await this.initBaseField();
		this.append(TEMPLATE);
		this.filterInput = this.find(`.${NODENAME}-filter input`).first();
		this.filterButton = this.find(`.${NODENAME}-filter button`).first();
		this.container = this.find(`.${NODENAME}-content`).first();
		this.pagination = this.find("d-pagination").first();
		this.request = this.find(RequestNodeName).first();

		const template = await Template.load(getTemplate(this));
		this.renderer = new Renderer({ template });
		if (this.active) execute(this);
		this.initialized = true;
	}

	async activeUpdated() {
		if (this.active && this.initialized) execute(this);
	}

	readonlyUpdated() {}

	async updatedValue() {}
}

customElements.define(NODENAME, SelectionList);
export default SelectionList;
