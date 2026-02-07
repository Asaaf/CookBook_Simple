import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { image } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  cardsList = [
    { title: 'Pollo al Ajillo', subtitle: 'Delicious garlic chicken recipe', description: "Here's a small text description for the card content. Nothing more, nothing less.", image: 'assets/images/pollo-al-ajillo.jpg' },
    { title: 'Ensalada César', subtitle: 'Classic Caesar salad with a twist', description: "Here's a small text description for the card content. Nothing more, nothing less.", image: 'assets/images/ensalada-cesar.jpeg' },
    { title: 'Tarta de Manzana', subtitle: 'Homemade apple pie with cinnamon', description: "Here's a small text description for the card content. Nothing more, nothing less.", image: 'assets/images/tarta-de-manzana.jpg' }
  ]
  constructor() { }

  ngOnInit() {
  }

}
