# Budget

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

Follow development server directions with Angular section below to run

## Summary of Use

* User can add an account balance and monthly income
* User can add categories and items that correspond with their respective limits and actual expenses
* App calculates remaining funds after expenses
* User can edit information and save or cancel edits
* User can delete items and categories
* User can navigate between months 
* User can view budget by month or by yearly summary


## Features

Routing
* Links route between two components - month and year 
* Previous/Next month and year buttons route to correct month or year through URL parameters

Services
* BudgetService provides main functionality
* loads initial budget data from JSON

Local Storage
* BudgetData is stored in local storage, on loading the app checks local storage before loading data from json


## Code Organization

Angular Application

Components
* AppComponent
  * AppRoutingModule
* MonthComponent
* Year Component

Model
* BUDGETDATA - json
* BudgetService

CSS
* all styles in styles.css 


## Walk Through

* App automatically routes to current month
* Click +Category to add a new category of items
* Click Edit to add, edit, or delete items within a category
  * Click cancel to undo edits
  * Click save to complete edits
  * Click delete next to category to delete entire category or click delete next to item to only delete that item
* Click Edit in header to change account balance or income
* Remaining funds will automatically update
* Click Previous and Next Month buttons to navigate between months
* If a month has no categories, click Copy Last Month to roll over last months category data
* Click Year view to view 12 months of the current year
* Click Previous and Next Year buttons to navigate between years

## Angular

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
