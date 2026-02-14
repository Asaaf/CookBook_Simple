import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import {
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTextarea,
} from '@ionic/angular/standalone';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CreateRecipeInput, Database, RecipeRecord } from 'src/app/services/database';

interface RecipeCard {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

interface RecipeForm {
  title: string;
  subtitle: string;
  description: string;
  instructions: string;
  timeRequired: number | null;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonTextarea,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ]
})
export class HomePage implements OnInit {
  // Lista que alimenta las tarjetas mostradas en la pantalla principal.
  cardsList: RecipeCard[] = [];

  // Controla la apertura/cierre del modal para crear una receta.
  isRecipeModalOpen = false;

  // Modelo enlazado al formulario de nueva receta.
  newRecipe: RecipeForm = {
    title: '',
    subtitle: '',
    description: '',
    instructions: '',
    timeRequired: null,
  };

  constructor(private readonly database: Database) {
    // Registra el ícono "add" para poder usarlo en el botón flotante.
    addIcons({ add });
  }

  async ngOnInit(): Promise<void> {
    // Carga las recetas al iniciar la vista para mostrar datos persistidos en SQLite.
    await this.loadRecipes();
  }

  openRecipeForm(): void {
    // Abre el modal del formulario.
    this.isRecipeModalOpen = true;
  }

  closeRecipeForm(): void {
    // Cierra el modal y restablece el formulario para evitar datos residuales.
    this.isRecipeModalOpen = false;
    this.resetForm();
  }

  async saveRecipe(): Promise<void> {
    // Elimina espacios del título para validar correctamente.
    const title = this.newRecipe.title.trim();

    if (!title) {
      // No permite guardar si el campo principal está vacío.
      return;
    }

    // Construye el payload con el formato esperado por el servicio de base de datos.
    const payload: CreateRecipeInput = {
      name: title,
      subtitle: this.newRecipe.subtitle,
      description: this.newRecipe.description,
      instructions: this.newRecipe.instructions,
      timeRequired: this.newRecipe.timeRequired,
    };

    // Inserta la receta en SQLite.
    await this.database.createRecipe(payload);
    // Recarga la lista para reflejar inmediatamente el nuevo registro.
    await this.loadRecipes();

    // Cierra modal y limpia campos tras guardar.
    this.closeRecipeForm();
  }

  private async loadRecipes(): Promise<void> {
    // Consulta todas las recetas persistidas en la base de datos.
    const recipes = await this.database.getRecipes();
    // Transforma el modelo de DB al modelo de tarjetas usado por la UI.
    this.cardsList = recipes.map((recipe: RecipeRecord) => this.toRecipeCard(recipe));
  }

  private toRecipeCard(recipe: RecipeRecord): RecipeCard {
    // Define valores por defecto para mantener una tarjeta consistente cuando faltan campos opcionales.
    return {
      title: recipe.name,
      subtitle: recipe.subtitle ?? 'Nueva receta',
      description: recipe.description ?? recipe.instructions ?? 'Sin descripción',
      image: 'assets/images/pollo-al-ajillo.jpg',
    };
  }

  private resetForm(): void {
    // Restablece el estado inicial del formulario.
    this.newRecipe = {
      title: '',
      subtitle: '',
      description: '',
      instructions: '',
      timeRequired: null,
    };
  }

}
