import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CategoryApi {
    private categories =['all', 'electronics', 'audio', 'computers', 'accessories', 'photography', 'wearables'];

    getCategories() {
        return this.categories;
    }
}

