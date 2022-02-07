import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Service } from './service';
import { MatStepper, MatTableDataSource } from '@angular/material';

export interface DataSelectedDetails {
  name : string;
  capital : string;
  population : string;
  currencies : {
    name : string;
  }
  flag : string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  @ViewChild('stepper', { static: true }) stepper: MatStepper;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  countries: any;
  savedData: any;
  displayedColumns: string[] = ['Name', 'Capital', 'Population', 'Currencies', 'Flag'];
  dataSource = new MatTableDataSource<DataSelectedDetails>();
  
  constructor(private _formBuilder: FormBuilder, private _service: Service) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [Validators.required, Validators.minLength(2)],
      
    });
    console.log(this.firstFormGroup.errors);
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required, Validators.minLength(2)],
    });
    console.log(this.secondFormGroup.errors);
  }

  public getData(event : any){
    const api_name = event.target.value;
    this._service.sendGetRequest(api_name).subscribe((data: any[])=>{
      this.countries = data.map(element=> element.name);
      this.savedData = data;
      this.stepper.selected.completed = true;
      this.stepper.next();
    }) 
  }

  public showDetails(event : any){
    const country_name = event.target.value;
    this.dataSource.data = this.savedData.find(item => item.name === country_name);
    this.stepper.selected.completed = true;
    this.stepper.next();
  }
}
