import BaseView from "./base-view.js";

export default class extends BaseView {
    constructor(params) {
        super(params);
    }

    async getHtml() {
        return `
        <app-header></app-header>
        <app-background></app-background>
        <landing-spacer></landing-spacer>
        <app-landing></app-landing>
        <pack-grid paramID="Packs" backgroundColor="#171717"></pack-grid>
        <artist-grid paramID="Artists" backgroundColor="#222" shadowTop="true" shadowBottom="true"></artist-grid>
        <app-footer></app-footer>
        `
    }
};
