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
        <artist-landing paramID="${this.params.id}"></artist-landing>
        <pack-grid paramID="${this.params.id}" backgroundColor="#222" shadowBottom="true"></pack-grid>
        <app-footer></app-footer>
        `
    }
};
