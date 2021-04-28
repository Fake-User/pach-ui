/* Components */
import AppBackground from "./components/app-background.js";
import AppHeader from "./components/app-header.js";
import AppLanding from "./components/app-landing.js";
import LandingSpacer from "./components/landing-spacer.js";
import SampleCard from "./components/sample-card.js";
import SampleGrid from "./components/sample-grid.js";
import PackCard from "./components/pack-card.js";
import PackGrid from "./components/pack-grid.js";
import PackLanding from "./components/pack-landing.js";
import ArtistCard from "./components/artist-card.js";
import ArtistGrid from "./components/artist-grid.js";
import ArtistLanding from "./components/artist-landing.js";
import AppFooter from "./components/app-footer.js";

/* Views */
import Home from "./views/home.js";
import Search from "./views/search.js";
import Packs from "./views/packs.js";
import Artists from "./views/artists.js";
import Pack from "./views/pack.js";
import Artist from "./views/artist.js";

/* Router */
//const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
const pathToRegex = path => new RegExp(`^${path.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/:(\w+)/g, '(?<$1>[^/]+)')}\/?$`)

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    /* Paths */
    const routes = [
        {path: "/", view: Home},
        {path: "/Search", view: Search},
        {path: "/Packs", view: Packs},
        {path: "/Artists", view: Artists},
        {path: "/Pack/:id", view: Pack},
        {path: "/Artist/:id", view: Artist}
    ];

    /* Test Each Route For Match */
    const matchRoutes = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = matchRoutes.find(matchRoute => matchRoute.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

/* Get url from route event  */
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("route", e => {
        navigateTo(e.detail.url)
        /* reset scroll on route change */
        window.scrollTo(0,0)
    })
    /* Call Router on Initialization */
    router()
});
