import BaseView from "./base-view.js";

export default class extends BaseView {
    constructor(params) {
        super(params);
    }

    async getHtml() {
        return `
        <app-header></app-header>
        <app-background></app-background>
        <app-landing></app-landing>
        <sample-grid backgroundColor="#222" shadowBottom="true"></sample-grid>
        <pack-grid paramID="" backgroundColor="#171717" shadowBottom="true"></pack-grid>
        <artist-grid paramID="" backgroundColor="#222" shadowBottom="true"></artist-grid>
        <app-footer></app-footer>
        `
    }
};
