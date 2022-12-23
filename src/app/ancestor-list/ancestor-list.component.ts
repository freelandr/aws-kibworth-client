import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { IAncestor } from '../shared/interfaces';

@Component({
  selector: 'app-ancestor-list',
  templateUrl: './ancestor-list.component.html',
  styleUrls: ['./ancestor-list.component.css']
})
export class AncestorListComponent implements OnInit {

  private ancestorList: IAncestor[];
  selectedAncestor: IAncestor;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.loadTopAncestors();
  }

  private loadTopAncestors() {
    this.dataService.getAncestorsTop().subscribe((ancestors: IAncestor[]) => this.ancestorList = ancestors)
  }

  public getAncestorList() {
    return this.ancestorList;
  }

  public selectAncestor(ancestor) {
    this.selectedAncestor = ancestor;
  }
}
