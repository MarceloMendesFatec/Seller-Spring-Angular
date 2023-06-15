import { Component } from '@angular/core';
import { SellersServiceService } from '../Service/sellers-service.service';
import { Seller } from '../Interface/Seller';
@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent {

  sellersList: Seller[] = [];
  showForm = false;


  constructor(private sellersService: SellersServiceService) { }

  ngOnInit(): void {
    this.loadSellers();
  }

  closeForm() {
    this.showForm = false;
  }

  loadSellers(){
    this.sellersService.getSellers().subscribe({
      next: (sellers) => {
        this.sellersList = sellers;
      }
    })

  }
}
