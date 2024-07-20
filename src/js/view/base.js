export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchResultDiv: document.querySelector('.result')
}
export const renderLoader = parent => {
    const loader = `<div class="loader">
                    <svg>
                        <use href="img/icons.svg#icon-cw"></use>
                    </svg>
                </div>`;
    parent.insertAdjacentHTML('afterbegin', loader);
}