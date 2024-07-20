import { elements } from "./base";
//private function

/*image_url
: 
"http://forkify-api.herokuapp.com/images/burger53be.jpg"
publisher
: 
"The Pioneer Woman"
publisher_url
: 
"http://thepioneerwoman.com"
recipe_id
: 
"46892"
social_rank
: 
99.99999283988569
source_url
: 
"http://thepioneerwoman.com/cooking/2012/10/supreme-pizza-burgers/"
title
: 
"Supreme Pizza Burgers"*/
const renderRecipe = recipe => {
    console.log(recipe)
    const markup = `                
                <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
`;
//ul ruuge nemne
elements.searchResultList.insertAdjacentHTML('beforeend', markup)
};
export const clearSearch = () => {
    elements.searchInput.value = "";
}
export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = '';
}
export const getInput = () => elements.searchInput.value;
export const renderRecipes = recipes => {
    // undefined orj irvel
    recipes.forEach(renderRecipe);
}