import { Component, Input, Output, SimpleChanges } from '@angular/core';
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

  @Input()
  seller: Seller = {} as Seller;

  sellers: Seller[] = [];

  @Output()
  saveEmitter = new EventEmitter();



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

  ngOnChanges(): void {
    if (this.seller.id) {
      this.formGroupSellers.setValue(this.seller);
    }
  }

  ngOnInit(): void {
  }

  // Função save() que é chamada quando o formulário é enviado

  // save()
  // Função responsável por salvar os dados do formulário

  save() {
    // Verifica se o formulário é válido
    if (this.formGroupSellers.valid) {

      // Atribui os valores do formulário ao objeto seller
      Object.assign(this.seller, this.formGroupSellers.value);

      // Atualiza o vendedor existente
      if (this.seller.id) {

        // Chama o serviço para atualizar o vendedor
        this.sellersService.updateSeller(this.seller).subscribe(() => {
          // Emite um evento indicando que o salvamento foi bem-sucedido
          this.saveEmitter.emit(true);
          // Limpa o formulário
          this.resetForm();
        });
      } else {
        // Cria um novo vendedor
        // Chama o serviço para criar o vendedor
        this.sellersService.createSeller(this.seller).subscribe((data) => {
          // Armazena os dados do novo vendedor retornado pelo serviço
          this.seller = data;
          // Emite um evento indicando que o salvamento foi bem-sucedido
          this.saveEmitter.emit(true);
          // Limpa o formulário
          this.resetForm();
        });
      }

    }
  }


  resetForm() {
    // Verifica se o formulário existe
    if (this.formGroupSellers) {
      // Reseta os valores dos controles do formulário
      this.formGroupSellers.reset();
      // Remove as validações dos controles do formulário
      this.clearFormValidators(this.formGroupSellers);
    }

    // Limpa a variável de seller
    this.seller = {} as Seller;
  }


  clearFormValidators(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      // Verifica se o controle existe
      if (control) {
        // Remove as validações do controle
        control.clearValidators();
        // Atualiza o valor e a validade do controle
        control.updateValueAndValidity();
      }
    });
  }




  //Esses são getters que retornam os controles
  //individuais do formulário formGroupSellers com base nos seus nomes.

  get sfgName() { return this.formGroupSellers.get('name'); }
  get sfgSalary() { return this.formGroupSellers.get('salary'); }
  get sfgBonus() { return this.formGroupSellers.get('bonus'); }
  get sfgGender() { return this.formGroupSellers.get('gender'); }
}
