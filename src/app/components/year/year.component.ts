import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Category, Month } from '../../model/category';
import { BudgetService } from '../../model/budget.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css'],
  providers: [BudgetService]
})
export class YearComponent implements OnInit, OnDestroy {
  
  budgetData: Month[];
  yearData: Month[];
  sub: any;

  constructor(private route: ActivatedRoute, private budgetService: BudgetService) { }

  ngOnInit() {
    this.budgetData = this.budgetService.getBudget();
    
    var date = new Date();
    var currentYear = date.getFullYear();
    
    this.sub = this.route.params.subscribe(params => {
      let year: number;
      //Default to current year, overwrite if param passed
      year = currentYear;
      if (params['year']){
        year = params['year'];
      }
      this.yearData = this.budgetService.getYear(year, this.budgetData);      
    }); 
  }

  ngOnDestroy() {
    
  }

}
