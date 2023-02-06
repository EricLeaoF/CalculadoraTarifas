class Tarifa {
  constructor(origem, destino, valor) {
      this.origem = origem;
      this.destino = destino;
      this.valor = valor;
  }
}

class CalculadorTarifa {
  constructor(tarifas, plano) {
      this.tarifas = tarifas;
      this.plano = plano;
  }

  calcular(origem, destino, tempo) {
      const tarifa = this.tarifas.find(t => t.origem === origem && t.destino === destino);
      if (!tarifa) {
          return { error: 'Tarifa não encontrada' };
      }

      const minutosGratis = this.plano;
      const minutosExcedentes = Math.max(tempo - minutosGratis, 0);
      const valorComPlano = minutosExcedentes * tarifa.valor * 1.1;
      const valorSemPlano = tempo * tarifa.valor;

      return {
          valorComPlano: valorComPlano.toFixed(2),
          valorSemPlano: valorSemPlano.toFixed(2)
      };
  }
}

module.exports = {
  Tarifa,
  CalculadorTarifa
};