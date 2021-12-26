import { Component, OnInit } from '@angular/core';
import { SetsService } from 'src/app/services/sets.service';
import { Set } from '../../models/set.interface'

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  loading: boolean = true;
  loaded: boolean = false;
  sets: Set[] = [];

  constructor(private setsService: SetsService) {}

  ngOnInit(): void {
    this.setsService
      .getAllExpansions()
      .subscribe((sets) => {
        this.sets = sets;
        this.loading = false;
        this.loaded = true;
    });
  }

}
