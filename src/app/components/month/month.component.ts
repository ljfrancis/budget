import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Category, Month } from '../../model/category';
import { BudgetService } from '../../model/budget.service';


@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
  providers: [BudgetService]
})
export class MonthComponent implements OnInit, OnDestroy {
  
  budgetData: Month[]; 
  categoryCopy: string;
  nextCategoryId: number;
  monthData: Month;
  sub: any;
  monthName: string;
  totalPredictedExpenses: number;
  totalExpenses: number;
  
  constructor(private route: ActivatedRoute, private router: Router, private budgetService: BudgetService) {}   

  ngOnInit() {

    this.budgetData = this.budgetService.getBudget();  
    
    this.nextCategoryId = this.budgetService.getNextCategoryId();
    
    //get current month's data
    var date = new Date();
    var currentMonth = date.getMonth() + 1;
    var currentYear = date.getFullYear();
  
    
    this.sub = this.route.params.subscribe(params => {
      let month: number;
      let year: number;
      //Default to current month/year, overwrite with params passed
      month = currentMonth;
      year = currentYear;
      if (params['month']){
        month = params['month'];
      } if (params['year']){
        year = params['year'];
      }
      
      this.monthData = this.budgetService.getMonth(month, year, this.budgetData);
      this.monthName = this.budgetService.getMonthName(month); 
      
      this.calculateExpenses();
    });
     
  }

  //add main category
  addCategory() {
    var newCategory: Category = {id: this.nextCategoryId, edit: true, category: "", items: []};
    this.monthData.categories.push(newCategory);
    this.nextCategoryId++; 
  }
  
  //add item within category
  addItem(id: number) {
    this.budgetService.addItem(id, this.monthData);
    this.calculateExpenses();
  }

  //save category updates
  saveCategory(id: number) {
    this.calculateExpenses();
    this.budgetService.saveMonth(this.monthData, this.budgetData);
    this.budgetService.toggleEdit(id, this.monthData);
    
    //save updates to local storage
    window.localStorage.removeItem("budgetData");
    window.localStorage.setItem("budgetData", JSON.stringify(this.budgetData));
    this.ngOnInit();
  }

  editCategory(id: number) {
    //copy old data in event of cancel
    this.categoryCopy = JSON.stringify(this.monthData);
    this.budgetService.toggleEdit(id, this.monthData);
  }

  editBalances(){
    this.monthData.editBalances = true;
  }

  saveBalances(){
    this.budgetService.saveMonth(this.monthData, this.budgetData);
    this.monthData.editBalances = false;
    
    //save updates to local storage
    window.localStorage.removeItem("budgetData");
    window.localStorage.setItem("budgetData", JSON.stringify(this.budgetData));
  
    this.ngOnInit();
  }

  cancel(){
    //restore old data saved entering edit mode  
    var oldData = JSON.parse(this.categoryCopy);
    this.monthData = oldData;
  }

  deleteCategory(id: number) {
    this.budgetService.deleteCategory(id, this.monthData);
    this.budgetService.toggleEdit(id, this.monthData);
  }

  deleteItem(id: number, index: number){
    this.budgetService.deleteItem(id, index, this.monthData);
  }

  copyLastMonth() {
    this.budgetService.copyLastMonth(this.monthData, this.budgetData);
    //save updates to local storage
    window.localStorage.removeItem("budgetData");
    window.localStorage.setItem("budgetData", JSON.stringify(this.budgetData));
    
    this.ngOnInit();
  }

  calculateExpenses() {
    this.totalPredictedExpenses = this.budgetService.getTotalPredictedExpenses(this.monthData);
    this.totalExpenses = this.budgetService.getTotalExpenses(this.monthData);
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
