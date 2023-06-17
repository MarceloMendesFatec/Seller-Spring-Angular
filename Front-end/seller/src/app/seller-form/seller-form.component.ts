import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellersServiceService } from '../Service/sellers-service.service';
import { Seller } from '../Interface/Seller';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-seller-form',
  templateUrl: './seller-form.component.html',
  styleUrls: ['./seller-form.component.css']
})
export class SellerFormComponent {

  formGroupSellers: FormGroup;
  seller : Seller = {} as Seller;
  sellers: Seller[] = [];

  @Output()
  saveEmitter =  new EventEmitter();


  constructor(private sellersService: SellersServiceService, private formBuilder: FormBuilder) {
    this.formGroupSellers = this.formBuilder.group({
      id: { value: null, disabled: true },
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      salary: ['', Validators.required],
      bonus: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }


  save() {
    if (this.formGroupSellers.valid) {
      Object.assign(this.seller, this.formGroupSellers.value);

      this.sellersService.createSeller(this.seller).subscribe({
        next: data => {
          this.seller = data;
          this.saveEmitter.emit(true); // Emitir o evento com o valor true
        }
      });

      this.seller = {} as Seller;
    }
  }


  get sfgName() { return this.formGroupSellers.get('name'); }
  get sfgSalary() { return this.formGroupSellers.get('salary'); }
  get sfgBonus() { return this.formGroupSellers.get('bonus'); }
  get sfgGender() { return this.formGroupSellers.get('gender'); }
}
