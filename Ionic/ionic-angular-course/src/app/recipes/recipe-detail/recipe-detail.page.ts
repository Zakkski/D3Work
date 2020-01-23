import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
    loadedRecipe: Recipe;
    constructor(
        private recipesService: RecipesService,
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private alertController: AlertController) { }

    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(paramMap => {
          if (!paramMap.has('recipeId')) {
              this.route.navigate(['/recipes']);
              return;
          }
          const recipeId = paramMap.get('recipeId');
          this.loadedRecipe = this.recipesService.getRecipe(recipeId);
      });
  }

  onDeleteRecipe() {
      this.alertController.create({
            header: 'Are you sure?',
            message: 'like really?',
            buttons: [
                { text: 'Cancel', role: 'cancel'},
                { text: 'Delete',
            handler: () => {
                this.recipesService.deleteRecipe(this.loadedRecipe.id);
                this.route.navigate(['/recipes']);
            }}
            ]}).then(alertEl => alertEl.present());
  }
}
