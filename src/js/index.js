require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import { renderRecipe, clearRecipe, highLightSelectedRecipe } from './view/recipeVeiw';
import List from "./model/List";
import * as listView from "./view/listView";
import Likes from "./model/Like";
import * as likesView from "./view/likesView";
// let search = new Search("pasta");
// search.doSearch().then( r => console.log(r));
const state = {};
//MVC hailtiin controller = Model ==> Controller <== View


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
};
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
elements.pageButtons.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goto = parseInt(btn.dataset.goto, 10);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, goto);
    }
});

//joriin controller
const controlRecipe = async () => {
    //1) url aas idg salgaj avna
    const id = window.location.hash.replace('#', '');
    if(!state.likes) state.likes = new Likes();
    if(id){
        //2) jorin modeliig uusgene
        state.recipe = new Recipe(id);
        //3) ui beltgene
        clearRecipe();
        renderLoader(elements.recipeDiv);
        highLightSelectedRecipe(id);
        //4) joroo tatana
        await state.recipe.getRecipe();
        //5) joriig guitsetgeh hugatsaa bolon ortsiig tootsoolno
        // clearLoader();
        state.recipe.calcTime();
        state.recipe.calcHuniiToo();
        //6) joroo delgetsend gargana    
        renderRecipe(state.recipe, state.likes.isLiked(id));
    }

}

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
window.addEventListener('load', e => {
    //shineer like model iig app achaalagdahad uusgene
    if(!state.likes) state.likes = new Likes();

    state.likes.likes.forEach(like => likesView.renderLike(like));
});

//nairlaganii controller heregte
const controlList = () => {
    //nairlaganii modeliig uusgene
    state.list = new List();
    //omnon haragdaj bsn nairlagnuudig alga bolgn
    listView.clearItems();
    //ug model ruu odoo haragdaj bgaa jornii buh nairlagiig avch hiine.
    state.recipe.ingredients.forEach( n => {
        //tuhain nairlagiig model ruu hiine
        const item = state.list.addItem(n);
        //tuhain nairlagiiig delgetsend gargana
        listView.renderItem(item);
    });
}; 

// like controller
const controlLike = () => {
    //1. like iin modeliig uusgene
    if(!state.likes) state.likes = new Likes();
    //2. odoo haragdaj bgaa joriin id g olj avah
    const currentRecipeId = state.recipe.id;
    //3. ene joriig likelsn esehiig shalgah
    if(state.likes.isLiked(currentRecipeId)){
        //4. likelsn bol like iig n boliulah
        state.likes.deleteLike(currentRecipeId);
        //like iin tsesnees ustgana
        likesView.deleteLike(currentRecipeId);
        //likelsn baidliig boliulah
        likesView.toggleLikeBtn(false);
    } else {
        //5. like hiigegu bol likelna
        const newLike = state.likes.addLike(currentRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.image_url);
        likesView.renderLike(newLike);
        likesView.toggleLikeBtn(true);
    }
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
}
elements.recipeDiv.addEventListener('click', e => {
    if(e.target.matches('.recipe__btn, .recipe__btn * ')){
        controlList();
    }
    else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
});



elements.shoppingList.addEventListener('click', e => {
    // click hisen li elementiin data-itemid atributiig shuuj gargaj avah
    const id = e.target.closest(".shopping__item").dataset.itemid;
    //oldsn id-te ortsiig modeloos ustganas
    state.list.deleteItem(id);
    //delgetsnees iim ID te ortsiig olj ustgana.
    listView.deleteItem(id);
})