import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import { Statistics } from '../../models/Statistics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  statisticsList = [
    {value: 'favourites-recipes-per-user', viewValue: 'Favourites recipes per user'},
    {value: 'test 2', viewValue: 'test 2 value'},
    {value: 'test 3', viewValue: 'test 3 value'}
  ]

  chartData: Statistics[] = null;

  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartColors: Array<any>;
  public chartOptions: any;


  constructor(private statisticsService: StatisticsService
        ) { }

	ngOnInit() {
    this.statisticsService.getAll()
      .subscribe((data) => {
        console.log("DATA" + data);
        this.chartData = <Statistics[]>data;
        console.log(this.chartData[0]);

        this.generateChart();
      })
  }

  public generateChart() {
    this.chartType = 'bar';
  
    this.chartDatasets = [
      { data: 
        // [65, 59, 80, 81, 56, 55, 40], 
        [this.chartData[0].yAxis, this.chartData[1].yAxis], 
  
        // label: 'My First dataset Title' 
        label: this.chartData[0].title

      }
    ];
  
    // public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    this.chartLabels = [this.chartData[0].xAxis, this.chartData[1].xAxis];
  
    this.chartColors = [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
      }
    ];
  
    this.chartOptions = {
      responsive: true
    };
  }

  public chartClicked(e: any): void {

   }

  public chartHovered(e: any): void { 

  }
}
