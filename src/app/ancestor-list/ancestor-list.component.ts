import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { IAncestor } from '../shared/interfaces';

const PAGE_SIZE: number = 5;

@Component({
  selector: 'app-ancestor-list',
  templateUrl: './ancestor-list.component.html',
  styleUrls: ['./ancestor-list.component.css']
})
export class AncestorListComponent implements OnInit {

  private ancestorList: IAncestor[];
  private ancestorListCurrent: IAncestor[];
  private ancestorListNext: IAncestor[];
  private ancestorListPrevious: IAncestor[];
  selectedAncestor?: IAncestor;
  displayStyle: string = "none";
  searchTextFirstName: string;
  searchTextLastName: string;
  searchTextStreetName: string;
  private displayIndexStart: number = 0;
  private displayIndexEnd: number = PAGE_SIZE - 1;
  isSearch: boolean = false;
  isSearchError: boolean = false;
  isNoDataFound: boolean = false;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.loadTopAncestors();
  }

  private loadTopAncestors() {
    this.dataService.getAncestorsTop().subscribe((ancestors: IAncestor[]) => {
      this.ancestorList = ancestors;
      this.ancestorListCurrent = ancestors;
      this.ancestorListNext = [];
      this.displayIndexStart = 0;
      this.displayIndexEnd = PAGE_SIZE - 1;
    });
  }

  public getAncestorList() {
    return this.ancestorList;
  }

  public getAncestorListCurrent() {
    return this.ancestorListCurrent;
  }

  public search() {
    this.isSearch = true;
    this.isSearchError = false;
    this.isNoDataFound = false;
    this.selectedAncestor = undefined;
    if (this.searchTextFirstName && this.searchTextLastName && this.searchTextStreetName) {
      this.dataService.getAncestorsByFirstnameSurname(this.searchTextFirstName, this.searchTextLastName).subscribe((ancestorsByName: IAncestor[]) => {
        this.dataService.getAncestorsByAddress(this.searchTextStreetName).subscribe((ancestorsByAddress: IAncestor[]) => {
          this.ancestorList = this.getAncestorListIntersect(ancestorsByName, ancestorsByAddress);
          this.ancestorListCurrent = this.ancestorList.slice(0, PAGE_SIZE);
          this.displayIndexStart = 0;
          this.displayIndexEnd = PAGE_SIZE - 1;
        },
          error => {
            this.isNoDataFound = true;
          });
      },
        error => {
          this.isNoDataFound = true;
        });
    }
    else if (this.searchTextLastName && this.searchTextStreetName) {
      this.dataService.getAncestorsBySurname(this.searchTextLastName).subscribe((ancestorsByName: IAncestor[]) => {
        this.dataService.getAncestorsByAddress(this.searchTextStreetName).subscribe((ancestorsByAddress: IAncestor[]) => {
          this.ancestorList = this.getAncestorListIntersect(ancestorsByName, ancestorsByAddress);
          this.ancestorListCurrent = this.ancestorList.slice(0, PAGE_SIZE);
          this.displayIndexStart = 0;
          this.displayIndexEnd = PAGE_SIZE - 1;
        },
          error => {
            this.isNoDataFound = true;
          });
      },
        error => {
          this.isNoDataFound = true;
        });
    }
    else if (this.searchTextFirstName && this.searchTextLastName) {
      this.dataService.getAncestorsByFirstnameSurname(this.searchTextFirstName, this.searchTextLastName).subscribe((ancestors: IAncestor[]) => {
        this.ancestorList = ancestors;
        this.ancestorListCurrent = ancestors.slice(0, PAGE_SIZE);
        this.displayIndexStart = 0;
        this.displayIndexEnd = PAGE_SIZE - 1;
      },
        error => {
          this.isNoDataFound = true;
        });
    }
    else if (this.searchTextLastName) {
      this.dataService.getAncestorsBySurname(this.searchTextLastName).subscribe((ancestors: IAncestor[]) => {
        this.ancestorList = ancestors;
        this.ancestorListCurrent = ancestors.slice(0, PAGE_SIZE);
        this.displayIndexStart = 0;
        this.displayIndexEnd = PAGE_SIZE - 1;
      },
        error => {
          this.isNoDataFound = true;
        });
    }
    else if (this.searchTextStreetName) {
      this.dataService.getAncestorsByAddress(this.searchTextStreetName).subscribe((ancestors: IAncestor[]) => {
        this.ancestorList = ancestors;
        this.ancestorListCurrent = ancestors.slice(0, PAGE_SIZE);
        this.displayIndexStart = 0;
        this.displayIndexEnd = PAGE_SIZE - 1;
      },
        error => {
          this.isNoDataFound = true;
        });
    }
    else {
      this.isSearchError = true;
    }
  }

  public next() {
    this.displayIndexStart = this.displayIndexStart + PAGE_SIZE;
    this.ancestorListCurrent = this.ancestorList.slice(this.displayIndexStart, this.displayIndexStart + PAGE_SIZE);
    this.displayIndexEnd = this.displayIndexStart + PAGE_SIZE;
  }

  public previous() {
    this.displayIndexStart = this.displayIndexStart - PAGE_SIZE;
    this.ancestorListCurrent = this.ancestorList.slice(this.displayIndexStart, this.displayIndexStart + PAGE_SIZE);
    this.displayIndexEnd = this.displayIndexStart - PAGE_SIZE;
  }

  public hasNext() {
    return this.ancestorList != null && this.ancestorList.length > this.displayIndexEnd + 1;
  }

  public hasPrevious() {
    return this.displayIndexStart > 0;
  }

  public selectAncestor(selection) {
    this.dataService.getAncestor(selection.uuid).subscribe((ancestor: IAncestor) => {
      this.displayStyle = "block";
      this.selectedAncestor = ancestor;
    });
  }

  public closePopup() {
    this.displayStyle = "none";
  }

  private getAncestorListIntersect(ancestorsByName, ancestorsByAddress) {
    if ((ancestorsByName == null || ancestorsByName.length == 0) && (ancestorsByAddress == null || ancestorsByAddress.length == 0)) {
      return new Array<IAncestor>();
    }
    else if (ancestorsByAddress == null || ancestorsByAddress.length == 0) {
      return ancestorsByName;
    }
    else if (ancestorsByName == null || ancestorsByName.length == 0) {
      return ancestorsByAddress;
    }
    else {
      let combined: IAncestor[] = new Array<IAncestor>();
      ancestorsByName.forEach((ancestorByName: IAncestor) => {
        ancestorsByAddress.forEach((ancestorByAddress: IAncestor) => {
          if (ancestorByName.uuid === ancestorByAddress.uuid) {
            combined.push(ancestorByName);
          }
        });
      });
      return combined;
    }
  }
}
