import { Component, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellersServiceService } from '../Service/sellers-service.service';
import { Seller } from '../Interface/Seller';
import { EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-seller-form',
  templateUrl: './seller-form.component.html',
  styleUrls: ['./seller-form.component.css']
})
export class SellerFormComponent {

  // Declaração das propriedades do componente
  // formGroupSellers: Armazena o formulário de vendedores
  // seller: Armazena os dados do vendedor atual
  // sellers: Armazena a lista de vendedores
  // saveEmitter: EventEmitter para emitir o evento de salvamento

  formGroupSellers: FormGroup;
  seller: Seller = {} as Seller;
  sellers: Seller[] = [];
  @Output() saveEmitter = new EventEmitter();

  // Construtor do componente
  constructor(private sellersService: SellersServiceService, private formBuilder: FormBuilder) {
    // Inicialização do formulário de vendedores
    this.formGroupSellers = this.formBuilder.group({
      id: { value: null, disabled: true },
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      salary: ['', Validators.required],
      bonus: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }


  // Função save() que é chamada quando o formulário é enviado

  save() {
    // Verifica se o formulário é válido
    if (this.formGroupSellers.valid) {
      // Atribui os valores do formulário ao objeto seller usando Object.assign
      Object.assign(this.seller, this.formGroupSellers.value);
      // Chama o serviço para criar um novo vendedor
      this.sellersService.createSeller(this.seller).subscribe({
        next: data => {
          // Atualiza o objeto seller com os dados retornados pelo serviço
          this.seller = data;
          // Emite um evento de salvamento com o valor true
          this.saveEmitter.emit(true);
        }
      });
      // Reinicializa o objeto seller para ficar vazio
      this.seller = {} as Seller;
      // Reseta o formulário
      this.formGroupSellers.reset();
      // Define o estado de erro como null para cada campo individualmente
      Object.keys(this.formGroupSellers.controls).forEach((key: string) => {
        this.formGroupSellers.get(key)?.setErrors(null);
      });
    }
  }




 //Esses são getters que retornam os controles
 //individuais do formulário formGroupSellers com base nos seus nomes.
 
  get sfgName() { return this.formGroupSellers.get('name'); }
  get sfgSalary() { return this.formGroupSellers.get('salary'); }
  get sfgBonus() { return this.formGroupSellers.get('bonus'); }
  get sfgGender() { return this.formGroupSellers.get('gender'); }
}
