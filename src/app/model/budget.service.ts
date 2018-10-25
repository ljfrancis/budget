import { Injectable } from '@angular/core';
import { Category, Month } from './category';
import { BUDGETDATA } from './budget-data';


@Injectable()

export class BudgetService {
  
  getBudget(): Month[] {
  
    //get data from localStorage if available
    if ("budgetData" in window.localStorage) {
      return JSON.parse(window.localStorage["budgetData"]);
    } else {
        window.localStorage.setItem("budgetData", JSON.stringify(BUDGETDATA));
        return BUDGETDATA;
    }
  }
  
  // return a given month's budget data based on month and year
  getMonth(month: number, year: number, budgetData: Month[]): Month {
    //create new month entry if it doesn't exist
    let selectedMonth: Month = 
        budgetData.find(m => {return (m.month == month && m.year == year)});
    if (!selectedMonth){
      let newMonth: Month = {
        year: parseInt(year),
        month: parseInt(month),
        income: 0.00,
        editBalances: false,
        account: {
          name: "",
          balance: 0.00
        },
        categories: []
      };

      
      //append new month in order
      var i: number = 0;
      while (i < budgetData.length && newMonth.year >= budgetData[i].year){
          i++;
      }
      while (i < budgetData.length && newMonth.month > budgetData[i].month){
        i++;
      }

      budgetData.splice(i, 0, newMonth);
      return newMonth;
    }
  	else return selectedMonth;
  }
  
  getYear(year: number, budgetData: Month[]): Month[] {
    let yearData: Month[] = [];
    //find months with correct year 
    let months: Month[] = budgetData.filter(m => m.year == year);
    for (var i=1; i<12; i++){
      var month = this.getMonth(i, year, budgetData);
      yearData.push(month);
      month.monthName = this.getMonthName(month.month);
      month.totalPredictedExpenses = this.getTotalPredictedExpenses(month);
      month.totalExpenses = this.getTotalExpenses(month);
    }
    return yearData;
  }
  
  //returns long form of month for displaying
  getMonthName(month: number): string {
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"
];
    return monthNames[month - 1];
  }


  //add up amount limit for every item
  getTotalPredictedExpenses(month: Month): number {
    let total = 0;
    for (var category of month.categories){
      for (var item of category.items){
        if(typeof parseFloat(item.amount) == "number"){
          total += item.amount;
        }
      }
    }
    return total;
  }

  //add up actual expenses
  getTotalExpenses(month: Month): number {
    let total = 0;
    for (var category of month.categories){
      for (var item of category.items){
        if(typeof parseFloat(item.expense) == "number"){
          total += item.expense;
        }
      }
    }
    return total;
  }


  addItem(id: number, month: Month) {
    let categories = month.categories;
    //find parent category to append item
    for (var i = 0; i < categories.length; i++){
      if (categories[i].id == id) {
        categories[i].items.push({name: "", amount: 0.0, expense: 0.0});
      }
    }
  }

  getNextCategoryId() {
    //next category id is +1 of larget existing
    //only called onInit, month component incremements
    let budgetData:Month[] = this.getBudget();
    let max: number = 0;
    for (var month of budgetData) {
      for (var category of month.categories){
        if(category.id > max) {
          max = category.id;
        }
      }
    }
    return max + 1;
  }

  saveMonth(month: Month, budgetData: Month[]){
    for(var i=0; i < budgetData.length; i++){
      if (month.year == budgetData[i].year && 
         month.month == budgetData[i].month){
        budgetData[i] = month;
      }
    }
  }

  toggleEdit(id: number, monthData: Month) {
    for (var i = 0; i < monthData.categories.length; i++){
      if (monthData.categories[i].id == id) {
        monthData.categories[i].edit = !monthData.categories[i].edit;
      }
    }
  }

  deleteCategory(id: number, monthData: Month) {
    for (var i = 0; i < monthData.categories.length; i++){
      if (monthData.categories[i].id == id) {
        monthData.categories.splice(i, 1);
      }
    }
  }

  deleteItem(id: number, index: number, monthData: Month) {
    for (var i = 0; i < monthData.categories.length; i++){
      if (monthData.categories[i].id == id) {
        monthData.categories[i].items.splice(index, 1);
      }
    }
  }

  copyLastMonth(month: Month, budgetData: Month[]){
    for(var i=0; i < budgetData.length; i++){
      if (month.year == budgetData[i].year && 
         month.month == budgetData[i].month){
        budgetData[i] = Object.assign({}, budgetData[i-1]);
        budgetData[i].month = month.month;
        budgetData[i].year = month.year;   
      }
    }
  }

  
  constructor() { }
}
