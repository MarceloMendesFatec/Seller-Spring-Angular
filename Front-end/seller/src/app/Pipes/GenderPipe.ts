import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender' // Nome do pipe
})
export class GenderPipe implements PipeTransform {
  transform(value: number): string {
    // Transformação do valor recebido para uma string representando o gênero
    return value === 1 ? 'Masculino' : 'Feminino';
  }
}

