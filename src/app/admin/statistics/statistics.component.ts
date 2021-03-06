import { AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import { ChartData } from '../../models/ChartData';
import { Router } from '@angular/router';
import { connect, getInstanceByDom } from 'echarts';

import * as echarts from 'echarts';
import { macarons } from 'echarts-themes-js/src/macarons';
import { walden } from 'echarts-themes-js/src/walden';
import { vintage } from 'echarts-themes-js/src/vintage';
import { halloween } from 'echarts-themes-js/src/halloween';
import { chalk } from 'echarts-themes-js/src/chalk';
import { infographic } from 'echarts-themes-js/src/infographic';
// import { purple-passion } from 'echarts-themes-js/src/infographic';
import { shine } from 'echarts-themes-js/src/shine';
import { essos } from 'echarts-themes-js/src/essos';
import { westeros } from 'echarts-themes-js/src/westeros';
import { wonderland } from 'echarts-themes-js/src/wonderland';
import { roma } from 'echarts-themes-js/src/roma';
import { romantic } from 'echarts-themes-js/src/romantic';
import { dark } from 'echarts-themes-js/src/dark';


@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
	chartData: ChartData = null;
	
	// statistics types
	statisticsList = [
		{value: 'favourites-recipes-per-user', viewValue: 'Favourites recipes per user'},
		{value: 'recipes-per-month', viewValue: 'Recipes per month'},
		{value: 'top-followed-users', viewValue: 'Top followed users'}
	]

	// Chart options
	options;

	constructor(private statisticsService: StatisticsService
				) { }


	ngOnInit() {
		this.getStatistic(this.statisticsList[0].value);
	}


	getStatistic(title: string) {
		this.statisticsService.get(title)
		.subscribe((data) => {
			this.chartData = <ChartData>data;

			this.generateChart(title);
		})
	}


	generateChart(title: string) {
		console.log("generate chart " + title)
		this.options = {
			responsive: true,
			maintainAspectRatio: false,
			width: '80%',
			theme: walden, // chalk, essos, halloween, infographic, macarons, roma
			title: {
				text: this.chartData.title,
				left: 'center',
				top: '3%',
				bottom: '3%',
				textStyle: {
					fontWeight: 'bold',
					fontSize: '2em',
					lineHeight: 20,
				}
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow',
				},
				backgroundColor: 'white',
			},
			grid: {
				containLabel: true,
			},
			xAxis: [
				{
					type: 'category',
					data: 
					this.chartData.xAxis, // xAxis
				},
			],
			yAxis: [
				{
					type: 'value',
				},
			],
			series: [
				{
					type: 'bar',
					data: this.chartData.yAxis, // yAxis
				},
			],
			toolbox: {
				feature: {
					dataView: {},
					saveAsImage: {},
					restore: {}
				}
			}
			
		};

		this.handleUniqueStyle(title);
	}


	// Handles different styles between different statistics types
	handleUniqueStyle(statisticType: string) {
		switch(statisticType) {
			case 'favourites-recipes-per-user': {
				this.favouriteRecipesPersUser();
				break;
			}
			case 'recipes-per-month': {
				this.RecipesPerMonth();
				break;
			}
			case 'default': {

			}
		}
	}
	
	favouriteRecipesPersUser() {
		console.log("favouriteRecipesPersUser")
		this.options.series[0].name = 'Favourites';
	}

	RecipesPerMonth() {
		console.log("RecipesPerMonth")

		this.options.series[0].name = 'Recipes';
	}


	// On select change
	onChange(statisticType) {		
		this.getStatistic(statisticType.value);
	}
}