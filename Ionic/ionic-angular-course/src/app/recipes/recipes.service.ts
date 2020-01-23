import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
    private recipes: Recipe[] = [
        {
            id: 'r1',
            title: 'Schnitzel',
            imageUrl: 'https://images.pexels.com/photos/6013/food-holiday-vacation-summer.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            ingredients: ['French Fries', 'Pork Meat', 'Salad']
        },
        {
            id: 'r2',
            title: 'Spaghetti',
            imageUrl: 'https://images.pexels.com/photos/725990/pexels-photo-725990.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            ingredients: ['Spaghetti', 'Meat', 'Toamtoes']
        },
    ];

  constructor() { }

  getAllRecipes() {
      // return a copy of the array
      return [...this.recipes];
  }

  getRecipe(recipeId: string) {
      // return copy of recipe
      return {...this.recipes.find(x => x.id === recipeId)};
  }

  deleteRecipe(recipeId: string) {
      this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
  }
}
