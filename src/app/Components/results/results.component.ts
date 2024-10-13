import { Component } from '@angular/core';
import { SEARCH_INPUT_LABELS, TABLE_DATA } from 'src/app/Util/constData';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  tableColumn = [
    SEARCH_INPUT_LABELS.firstName,
    SEARCH_INPUT_LABELS.lastName,
    SEARCH_INPUT_LABELS.chartNo,
    SEARCH_INPUT_LABELS.add,
  ];
  tableDataSource = TABLE_DATA;

  constructor() {}

  // function to convert object into array of values
  getColumns(data:{[key:string]:string}) {
    return Object.values(data);
  } 
}
