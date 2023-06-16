import { Component } from '@angular/core';
import { SellersServiceService } from '../Service/sellers-service.service';
import { Seller } from '../Interface/Seller';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent {

  seller: Seller = {} as Seller;
  deletedSeller: Seller = {} as Seller;
  sellersList: Seller[] = [];
  showForm = false;


  constructor(private sellersService: SellersServiceService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadSellers();
    //setInterval(() => this.loadSellers(), 5000);
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
