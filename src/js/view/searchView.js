import { elements } from "./base";
//private function

const renderRecipe = recipe => {
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
    elements.pageButtons.innerHTML = '';
}
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resultPerPage = 10) => {
    //hailtiin ur dung huudaslaj uzuuleh
    //page = 2, start = 10, end = 20
    const start = (currentPage-1)*resultPerPage;
    const end = currentPage*resultPerPage;
    // undefined orj irvel
    recipes.slice(start, end).forEach(renderRecipe);
    //huudaslaltiin tovchiig gargaj ireh
    const totalPages = Math.ceil(recipes.length / resultPerPage);
    renderButtons(currentPage, totalPages);
};
const createButton = (page, type, direction) => `                
                <button class="btn-inline results__btn--${type}" data-goto=${page}>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${direction}"></use>
                    </svg>
                    <span>Хуудас ${page}</span>
                </button>`;
const renderButtons = (currentPage, totalPages) => {
    let buttonHTML;
    if(currentPage === 1 && totalPages > 1) {
        //1-r huudsan deer bn daraachin huudas gedg tovchiig garga
        buttonHTML = createButton(2, 'next', "right");
    } else if(currentPage < totalPages){
        // omnoh bolon daraachin huudas ruu shiljih tovchuudiig uzuulne
        buttonHTML = createButton(currentPage-1, 'prev', "left");
        buttonHTML += createButton(currentPage+1, 'next', 'right');
    }    
    else if(currentPage === totalPages){
        //hamgiin suuliin huudas deer bn. omnoh ruu shiljuuleh tovchiig uzuulne
        buttonHTML = createButton(currentPage-1, 'prev', 'left');
    }
    elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHTML)
};
//type ===> "prev", "next"
