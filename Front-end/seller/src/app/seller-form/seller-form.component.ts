import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellersServiceService } from '../Service/sellers-service.service';
import { Seller } from '../Interface/Seller';
@Component({
  selector: 'app-seller-form',
  templateUrl: './seller-form.component.html',
  styleUrls: ['./seller-form.component.css']
})
export class SellerFormComponent {

  formGroupSellers: FormGroup;
  seller : Seller = {} as Seller;
  sellers: Seller[] = [];


  constructor(private sellersService: SellersServiceService,
              private formBuilder: FormBuilder) {
    this.formGroupSellers = this.formBuilder.group({
      id : {value: null, disabled: true},
      name: ['', Validators.required],
      salario : ['', Validators.required],
      bonus : ['', Validators.required],
      genero : ['', Validators.required]

    })
  }

    save() {
      console.log("teste");
      if (this.formGroupSellers.valid) {
        Object.assign(this.seller, this.formGroupSellers.value)

        console.log(this.seller);
        this.sellersService.createSeller(this.seller).subscribe({
          next: data => {
            this.seller = data;
          }
        });
        // Reinicie o objeto this.seller
        this.seller = {} as Seller;

      }
    }

}
