import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ancestor-list',
  templateUrl: './ancestor-list.component.html',
  styleUrls: ['./ancestor-list.component.css']
})
export class AncestorListComponent implements OnInit {

  ancestors;
  selectedAncestor;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.ancestors = this.dataService.getAncestors();    
  }
  public selectAncestor(ancestor){
    this.selectedAncestor = ancestor;
  }
}
