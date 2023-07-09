import { Component, EventEmitter, Output } from '@angular/core';
import { SellersServiceService } from '../Service/sellers-service.service';
import { Seller } from '../Interface/Seller';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { SellerFormComponent } from '../seller-form/seller-form.component';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent {

  // Define um objeto vazio do tipo Seller para ser usado como modelo
  seller: Seller = {} as Seller;

  // Define um objeto vazio do tipo Seller para armazenar o vendedor a ser excluído
  deletedSeller: Seller = {} as Seller;

  // Inicializa uma lista vazia de vendedores
  sellersList: Seller[] = [];

  // Define uma flag para controlar a exibição do formulário
  showForm: boolean = false;




  constructor(private sellersService: SellersServiceService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadSellers(true);

    //setInterval(() => this.loadSellers(), 5000);
  }



  loadSellers(save: boolean) {
    // Chama o serviço para obter a lista de vendedores
    this.sellersService.getSellers().subscribe({
      next: (sellers) => {
        // Atualiza a lista de vendedores com os dados recebidos do serviço
        this.sellersList = sellers;
      }
    });
  }






  edit(seller: Seller) {
    this.seller = seller;
    this.showForm = true;

  }





  delete(modal: any, seller: Seller) {
    // Armazena o vendedor que será excluído
    this.deletedSeller = seller;

    // Abre o modal de confirmação
    this.modalService.open(modal).result.then(
      (confirm) => {
        // Verifica se o usuário confirmou a exclusão
        if (confirm) {
          // Chama o serviço para excluir o vendedor pelo ID
          this.sellersService.deleteSeller(seller.id).subscribe({
            next: () => {
              // Atualiza a lista de vendedores removendo o vendedor excluído
              this.sellersList = this.sellersList.filter(s => s.id !== seller.id);
            }
          });
        }
      }
    );
  }
//some codes ..

}
