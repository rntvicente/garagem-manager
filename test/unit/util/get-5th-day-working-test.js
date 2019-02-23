const { expect } = require('chai');
const moment = require('moment');

const { fiftDay } = require('../../../lib/util');

describe.only('# Casos de Test Unit Obter 5ª dia útil', () => {
  describe('#Casos de Sucesso', () => {
    it('Nao deve retornar valor null.', () => {
      const referenceDate = moment().toDate();
      const result = fiftDay.get(referenceDate);
      expect(result).to.not.be.null;
    });

    it('Não deve retornar um undefined.', () => {
      const referenceDate = moment().toDate();
      const result = fiftDay.get(referenceDate);
      expect(result).to.not.be.undefined;
    });

    it('Deve retornar uma data', () => {
      const referenceDate = moment().toDate();
      const result = fiftDay.get(referenceDate);
      expect(result).to.be.an('object');
    });
  });

  describe('#Caso de Falhas', () => {
    it('Deve dar erro quando não informado uma data', () => {
      const fn = () => fiftDay.get();
      expect(fn).to.throw();
    });
  });
});
