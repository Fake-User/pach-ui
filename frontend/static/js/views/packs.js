import BaseView from "./base-view.js";

export default class extends BaseView {
    constructor(params) {
        super(params);
    }
    async getHtml() {
        return `
        <app-header></app-header>
        <pack-grid backgroundColor="#222" shadowBottom="true"></pack-grid>
        <app-footer></app-footer>
        `
    }
};
