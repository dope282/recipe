require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader } from "./view/base";
import * as searchView from "./view/searchView";
// let search = new Search("pasta");
// search.doSearch().then( r => console.log(r));
const state = {};
const controlSearch = async () => {
    // webees hailtiin tulhuur ugiig gargaj avna
    const query = searchView.getInput();
    if(query){
        // shineer hailtiin objectiig uusgej ogno
        state.search = new Search(query);
        // hailt hiihed zoriult interfaceiig beltgene
        searchView.clearSearch();
        searchView.clearSearchResult();
        // renderLoader(elements.searchResultDiv);
        // hailtiig guitsetgene
        await state.search.doSearch();
        // hailtiin ur dung delgetsend uzuulne
        if(state.search.result === undefined) alert("hailt ilertsgui");
        else searchView.renderRecipes(state.search.result);
    }
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})