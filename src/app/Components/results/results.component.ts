import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentCommunicationService } from 'src/app/Services/component-communication.service';
import {
  SEARCH_INPUT_LABELS,
  SEARCH_INPUT_SYMBOLS,
  TABLE_DATA,
} from 'src/app/Util/constData';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  tableColumn = [
    SEARCH_INPUT_LABELS.firstName,
    SEARCH_INPUT_LABELS.lastName,
    SEARCH_INPUT_LABELS.chartNo,
    SEARCH_INPUT_LABELS.add,
  ];
  tableDataSource = [...TABLE_DATA];
  searchTableSubscriber: Subscription = new Subscription();
  resetTableSubscriber: Subscription = new Subscription();
  symbolsList = SEARCH_INPUT_SYMBOLS;
  constructor(private componentCommunication: ComponentCommunicationService) {}

  ngOnInit(): void {
    this.handleCustomSubscriber();
  }

  ngOnDestroy(): void {
    this.searchTableSubscriber.unsubscribe();
  }

  // Handling custom subscription for subject
  handleCustomSubscriber() {
    this.searchTableSubscriber =
      this.componentCommunication.searchTable.subscribe((value: string) => {
        console.log(value);
        this.searchTheTable(value);
      });

    this.resetTableSubscriber =
      this.componentCommunication.clearFields.subscribe(() => {
        this.resetTable();
      });
  }

  // function to convert object into array of values
  getColumns(data: { [key: string]: string }) {
    return Object.values(data);
  }

  searchTheTable(value: string) {
    this.resetTable();
    let searchValue: string = '';
    let symbolFound = false;
    for (let i = value.length - 1; i >= 0; i--) {
      let char = value[i];
      if (/^[a-zA-Z0-9 ]$/.test(char)) {
        searchValue += char;
      } else {
        symbolFound = true;
        const filterValue = searchValue.split('').reverse().join('');
        //  console.log(searchValue,filterValue);
        switch (char) {
          case this.symbolsList.firstNameSymbol:
            console.log('In first name symbol:');
            this.searchTheColumn(
              this.tableDataSource,
              filterValue,
              'firstName'
            );
            break;
          case this.symbolsList.lastNameSymbol:
            console.log('In last name symbol:');
            this.searchTheColumn(this.tableDataSource, filterValue, 'lastName');
            break;
          case this.symbolsList.charNoSymbol:
            console.log('In chart no symbol:');
            this.searchTheColumn(this.tableDataSource, filterValue, 'chartNo');
            break;
          case this.symbolsList.addSymbol:
            console.log('In address symbol:');
            this.searchTheColumn(this.tableDataSource, filterValue, 'add');
            break;
          case '%':
            console.log('In % symbol:');
            this.tableDataSource = this.tableDataSource.filter((val: any) =>
              Object.values(val).some((check: any) =>
                check.toUpperCase().includes(filterValue.toUpperCase())
              )
            );
            break;
          default:
            console.log('Invalid symbol');
           
        }
        searchValue = '';
      }
    }

    // Helping log when search without symbol
    if (!symbolFound) {
      console.log('Symbol not found');
    }
  }

  searchTheColumn(data: any, filterValue: string, key: string) {
    this.tableDataSource = data.filter((val: any) =>
      val[key].toUpperCase().includes(filterValue.toUpperCase())
    );
  }

  resetTable() {
    this.tableDataSource = [...TABLE_DATA];
  }
}
