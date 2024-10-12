import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentCommunicationService } from 'src/app/Services/component-communication.service';

@Component({
  selector: 'app-search-by',
  templateUrl: './search-by.component.html',
  styleUrls: ['./search-by.component.css'],
})
export class SearchByComponent implements OnInit, OnDestroy{
  //Search fields are configurable
  searchFields = [
    { symbol: '\\', labelName: 'First name', inputValue: '' },
    { symbol: '@', labelName: 'Last name', inputValue: '' },
    { symbol: '#', labelName: 'Chart no', inputValue: '' },
    { symbol: '$', labelName: 'Address 1', inputValue: '' },
  ];
  searchValueSubscriber:Subscription = new Subscription();

  constructor(private componentCommunication: ComponentCommunicationService) {}

  ngOnInit(): void {
    this.searchValueSubscriber = this.componentCommunication.searchToSearchBy.subscribe((value:string) => {
      console.log(value);
      let inputValue:string = '';
      for(let i=value.length-1;i>=0;i--) {
        if((value[i] >= 'A' && value[i] <= 'Z') || (value[i] >= 'a' && value[i] <= 'z')) {
          inputValue+=value;
        }
        else {
          this.findInputBySymbol(inputValue,value[i]);
          break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.searchValueSubscriber.unsubscribe();
  }

  // Function to get triggered to pressing enter key
  handleSearchOnEnter(symbol: string, event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('Hello:', symbol, inputValue);
    this.componentCommunication.searchByToSearch.next(`${symbol}${inputValue}`);
  }

  findInputBySymbol(value:string,symbol:string) {
    console.log('In find By Symbol',value,symbol);
    for(let i=0;i<this.searchFields.length;i++) {
      if(symbol === this.searchFields[i].symbol) {
        this.searchFields[i].inputValue += value;
        break;
      }
    }
  }
}
