
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { copy, home, list, cart, fastFood } from 'ionicons/icons';
import { Page } from './models/page';
import { Usuario } from './models/usuario';
import { Database } from './services/database';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink, 
    RouterLinkActive, 
    IonApp, 
    IonSplitPane, 
    IonMenu, 
    IonContent, 
    IonList, 
    IonListHeader, 
    IonNote, 
    IonMenuToggle, 
    IonItem, 
    IonIcon, 
    IonLabel, 
    IonRouterLink, 
    IonRouterOutlet
  ],
})
export class AppComponent implements OnInit {
  user: Usuario;
  
  public appPages = [
    new Page('Home', '/home', 'home' ),
    new Page('Categorias', '/categories', 'copy'),    
    new Page('Ingredientes', '/ingredients', 'fast-food' ),
    new Page('Lista de recetas', '/recipe-list', 'list' ),
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  
  constructor(private readonly database: Database) {
    addIcons({ home, copy, list, cart, fastFood });
    this.user = new Usuario('Vidal', 'Admin', 'vidalUser', 'password123');
  }

  async ngOnInit(): Promise<void> {
    await this.database.initializeDatabase();
  }
}
