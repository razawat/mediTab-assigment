import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentCommunicationService } from 'src/app/Services/component-communication.service';
import {
  SEARCH_INPUT_LABELS,
  SEARCH_INPUT_SYMBOLS,
} from '../../Util/constData';
@Component({
  selector: 'app-search-by',
  templateUrl: './search-by.component.html',
  styleUrls: ['./search-by.component.css'],
})
export class SearchByComponent implements OnInit, OnDestroy {
  //Search fields are configurable
  searchFields = [
    {
      symbol: SEARCH_INPUT_SYMBOLS.firstNameSymbol,
      labelName: SEARCH_INPUT_LABELS.firstName,
      inputValue: '',
    },
    {
      symbol: SEARCH_INPUT_SYMBOLS.lastNameSymbol,
      labelName: SEARCH_INPUT_LABELS.lastName,
      inputValue: '',
    },
    {
      symbol: SEARCH_INPUT_SYMBOLS.charNoSymbol,
      labelName: SEARCH_INPUT_LABELS.chartNo,
      inputValue: '',
    },
    {
      symbol: SEARCH_INPUT_SYMBOLS.addSymbol,
      labelName: SEARCH_INPUT_LABELS.add,
      inputValue: '',
    },
  ];
  searchValueSubscriber: Subscription = new Subscription();
  clearInputFieldSubscriber: Subscription = new Subscription();

  constructor(private componentCommunication: ComponentCommunicationService) {}

  ngOnInit(): void {
    this.handleCustomSubscriber();
  }

  ngOnDestroy(): void {
    this.searchValueSubscriber.unsubscribe();
    this.clearInputFieldSubscriber.unsubscribe();
  }

  // Function to get triggered when pressing enter key
  handleSearchOnEnter(symbol: string, event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('Hello:', symbol, inputValue);
    this.componentCommunication.searchByToSearch.next(`${symbol}${inputValue}`);
  }

  // Handling custom subscription for subject
  handleCustomSubscriber() {
    // Filling the input fields as per their symbols
    this.searchValueSubscriber =
      this.componentCommunication.searchToSearchBy.subscribe(
        (value: string) => {
          console.log(value);
          //debugger
          let inputValue: string = '';
          for (let i = value.length - 1; i >= 0; i--) {
            const char = value[i];
            // Use regex to check if the character is a letter, digit, or space
            if (/^[a-zA-Z0-9 ]$/.test(char)) {
              inputValue += char;
            } else {
              this.findInputBySymbol(
                inputValue.split('').reverse().join(''),
                char
              );
              break;
            }
          }
        }
      );

    // Clearing out the input fields
    this.clearInputFieldSubscriber =
      this.componentCommunication.clearFields.subscribe(() => {
        for (let fields of this.searchFields) {
          this.findInputBySymbol('', fields.symbol);
        }
      });
  }

  findInputBySymbol(value: string, symbol: string) {
    console.log('In find By Symbol', value, symbol);
    for (let i = 0; i < this.searchFields.length; i++) {
      if (symbol === this.searchFields[i].symbol) {
        this.searchFields[i].inputValue = value;
        break;
      }
    }
  }
}
