import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentCommunicationService } from 'src/app/Services/component-communication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchByValueSubscriber: Subscription = new Subscription();
  searchInput:string = '';

  constructor(private componentCommunication: ComponentCommunicationService) {}

  ngOnInit(): void {
    console.log('In ngOnInIt');
    this.searchByValueSubscriber =
      this.componentCommunication.searchByToSearch.subscribe((value) => {
        console.log('In Search comp: ', value);
        this.searchInput += value;
      });
  }

  ngOnDestroy(): void {
    console.log('In on destroy');
    this.searchByValueSubscriber.unsubscribe();
  }

  // function to handle search input value 
  handleSearchValue(evemt:Event) {
    const inputValue = (evemt.target as HTMLInputElement).value;
  //  console.log(inputValue);
    this.componentCommunication.searchToSearchBy.next(inputValue);
  }

  // function to clear the all inputs fields
  handleClearButton() {
    this.searchInput = '';
    this.componentCommunication.clearFields.next('');
  }

  handleSearchButton() {
    this.componentCommunication.searchTable.next(this.searchInput);
  }
}
