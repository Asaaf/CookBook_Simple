import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import {
  IonAlert,
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
import { CreateRecipeInput, Database, RecipeRecord, UpdateRecipeInput } from 'src/app/services/database';

interface RecipeCard {
  id: number;
  title: string;
  subtitle: string;
  description: string | null;
  instructions: string | null;
  timeRequired: number | null;
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
    IonAlert,
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

  // Indica si el formulario está editando una receta existente (id) o creando una nueva (null).
  editingRecipeId: number | null = null;

  // Controla la apertura/cierre del popup de confirmación para eliminar receta.
  isDeleteAlertOpen = false;

  // Guarda temporalmente la receta seleccionada para eliminar.
  recipeToDelete: RecipeCard | null = null;

  // Botones del popup de confirmación de eliminación.
  deleteAlertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.cancelDeleteAlert();
      },
    },
    {
      text: 'Eliminar',
      role: 'destructive',
      handler: () => {
        void this.confirmDeleteRecipe();
      },
    },
  ];

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
    this.editingRecipeId = null;
    this.resetForm();
    this.isRecipeModalOpen = true;
  }

  // Abre el formulario cargando los datos actuales de la receta para permitir edición.
  editRecipe(card: RecipeCard): void {
    // Marca que se editará la receta seleccionada.
    this.editingRecipeId = card.id;
    // Precarga los campos del formulario con los datos de la tarjeta.
    this.newRecipe = {
      title: card.title,
      subtitle: card.subtitle,
      description: card.description ?? '',
      instructions: card.instructions ?? '',
      timeRequired: card.timeRequired,
    };
    // Abre el modal en modo edición.
    this.isRecipeModalOpen = true;
  }

  closeRecipeForm(): void {
    // Cierra el modal y restablece el formulario para evitar datos residuales.
    this.isRecipeModalOpen = false;
    this.editingRecipeId = null;
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

    if (this.editingRecipeId) {
      // Si hay id en edición, actualiza la receta existente en SQLite.
      const updatePayload: UpdateRecipeInput = {
        id: this.editingRecipeId,
        ...payload,
      };
      await this.database.updateRecipe(updatePayload);
    } else {
      // Si no hay id en edición, inserta una receta nueva en SQLite.
      await this.database.createRecipe(payload);
    }
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
      id: recipe.id,
      title: recipe.name,
      subtitle: recipe.subtitle ?? 'Nueva receta',
      description: recipe.description,
      instructions: recipe.instructions,
      timeRequired: recipe.timeRequired,
      image: 'assets/images/pollo-al-ajillo.jpg',
    };
  }

  // Devuelve el texto visible de descripción con fallback cuando no hay contenido.
  getCardDescription(card: RecipeCard): string {
    return card.description ?? card.instructions ?? 'Sin descripción';
  }

  // Abre el popup de confirmación para eliminar una receta.
  requestDeleteRecipe(card: RecipeCard, event: Event): void {
    // Evita que el click burbujee al contenedor y active edición.
    event.stopPropagation();
    // Guarda la receta seleccionada para confirmar su eliminación.
    this.recipeToDelete = card;
    // Muestra el popup de confirmación.
    this.isDeleteAlertOpen = true;
  }

  // Cierra el popup de confirmación y limpia el estado temporal.
  cancelDeleteAlert(): void {
    this.isDeleteAlertOpen = false;
    this.recipeToDelete = null;
  }

  // Elimina la receta seleccionada cuando el usuario confirma en el popup.
  async confirmDeleteRecipe(): Promise<void> {
    if (!this.recipeToDelete) {
      return;
    }

    // Elimina la receta seleccionada de SQLite.
    await this.database.deleteRecipe(this.recipeToDelete.id);
    // Refresca la lista para reflejar cambios inmediatamente.
    await this.loadRecipes();
    // Cierra el popup y limpia selección temporal.
    this.cancelDeleteAlert();
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
