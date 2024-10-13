import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {
  searchByToSearch = new Subject<string>();
  searchToSearchBy = new Subject<string>();
  clearFields = new Subject<string>();
  searchTable = new Subject<string>();
  constructor() { }
}
