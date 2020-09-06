import BaseField from "@default-js/defaultjs-html-form/src/BaseField";
import { HTML_TAG_PREFIX } from "@default-js/defaultjs-html-form/src/Constants";

import Search from "./Search";
import Rows from "./Rows";
import Row from "./Row";
import Pagination from "./Pagination";

const ATTRIBUTES = [];

class SelectionList extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	constructor() {
        super();		
		this.append(new Search());
		this.append(new Rows());
		this.append(new Pagination());
	}

	async init() {
		this.initSelectionList();
	}

	async initSelectionList() {
		await this.initBaseField();
	}

    activeUpdated() {}
    
    readonlyUpdated() { }

	async updatedValue() {}
}

customElements.define(HTML_TAG_PREFIX + "selection-list-search", Search);
customElements.define(HTML_TAG_PREFIX + "selection-list-rows", Rows);
customElements.define(HTML_TAG_PREFIX + "selection-list-row", Row);
customElements.define(HTML_TAG_PREFIX + "selection-list-pagination", Pagination);
customElements.define(HTML_TAG_PREFIX + "selection-list", SelectionList);
export default SelectionList;