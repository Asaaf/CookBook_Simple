import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'recipes',
    loadComponent: () => import('./pages/recipe-detail/recipe-detail.page').then( m => m.RecipeDetailPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'recipe-detail',
    loadComponent: () => import('./pages/recipe-detail/recipe-detail.page').then( m => m.RecipeDetailPage)
  },
  {
    path: 'recipe-list',
    loadComponent: () => import('./pages/recipe-list/recipe-list.page').then( m => m.RecipeListPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'ingredients',
    loadComponent: () => import('./pages/ingredients/ingredients.page').then( m => m.IngredientsPage)
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.page').then( m => m.CategoriesPage)
  },
];
