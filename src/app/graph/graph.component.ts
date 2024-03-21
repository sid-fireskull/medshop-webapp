import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() dataRows: any[] = [];
  @Input() productName: string="";
  labels: string[] = [];
  values: string[] = [];

  constructor() { }


  ngOnInit(): void {
    this.organizeData();
  }

  organizeData() {
    this.dataRows.forEach(element => {
      this.labels.push(element[0]);
      this.values.push(element[1]);
    });
    this.renderChart(this.productName, 'line', 'myChart')
  }

  renderChart(itemName: any, type: any, id: string) {
    const data = {
      labels: this.labels,
      datasets: [{
        label: itemName,
        data: this.values,
        fill: false,
        borderColor: 'rgb(255, 145, 145)',
        tension: 0.1
      }]
    };

    const myChart = new Chart(id, {
      options: {
        layout: { padding: 10 }
      },
      type: type,
      data: data,
    });

  }

}