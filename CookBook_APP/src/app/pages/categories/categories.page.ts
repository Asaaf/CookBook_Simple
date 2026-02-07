import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import * as echarts from 'echarts';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CategoriesPage implements OnInit {
  echartInstance: any;
  categories = [
    { name: 'Appetizers' },
    { name: 'Main Courses' },
    { name: 'Desserts' },
    { name: 'Beverages' },
    { name: 'Salads' },
    { name: 'Soups' },
    { name: 'Snacks' },
    { name: 'Breakfast' },
    { name: 'Vegetarian' },
    { name: 'Vegan' },
    { name: 'Gluten-Free' },
    { name: 'Keto' },
    { name: 'Paleo' },
  ];

  constructor() {
  }

  ngOnInit() {
    this.inicializarEchart();
  }

  inicializarEchart() {
    this.echartInstance = echarts.init(document.getElementById('main'));
    this.echartInstance.setOption({
      title: {
        text: 'Presupuestos por Categoría',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Presupuestos',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
  }

}
