export default class Likes {
    constructor() {

        this.readDataFromLocalStorage();
        if(!this.likes) this.likes = [];
    }

    addLike(id, title, publisher, img){
        const like = {id, title, publisher, img};
        this.likes.push(like)
        //storage ruu hadgalna
        this.saveDataToLocalStorage();
        return like;
    }
    deleteLike(id){
        //id gedeg ID-te like iin indexiig massive aas olno
        const index = this.likes.findIndex(el => el.id === id);
        //ug index deerh elementiig massive aas ustgana
        this.likes.splice(index, 1);
        this.saveDataToLocalStorage();
    }
    isLiked(id){
        // if(this.likes.findIndex(el => el.id === id) === -1) return false;
        // else return true;
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumberOfLikes() {
        return this.likes.length;
    }

    saveDataToLocalStorage() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readDataFromLocalStorage(){
        this.likes = JSON.parse(localStorage.getItem('likes'));
    }
}

