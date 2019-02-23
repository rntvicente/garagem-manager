const { expect } = require('chai');
const moment = require('moment');

const { fiftDay } = require('../../../lib/util');

describe.only('# Casos de Test Unit Obter 5ª dia útil', () => {
  const SUNDAY = 0;
  const SATURDAY = 6;

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
      expect(result).to.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
    });

    it('Deve ser uma data útil', () => {
      const referenceDate = moment('2019-02-01').toDate();
      const result = fiftDay.get(referenceDate);

      const weekDay = moment(result).day();

      expect(weekDay).to.be.not.equal(SATURDAY);
      expect(weekDay).to.be.not.equal(SUNDAY);
    });

    it('Deve retornar o quinto dia útil do mês de fevereiro de 2019', () => {
      const referenceDate = moment('2019-02-25').toDate();
      const result = fiftDay.get(referenceDate);

      expect(result).to.be.equal('2019-02-07');
    });
  });

  describe('#Caso de Falhas', () => {
    it('Deve retornar erro quando Data não for valida', () => {
      const arr = [
        undefined,
        null,
        '',
        ' ',
        function fn() { },
        'batata',
        0,
        '00/00/0000'
      ];

      arr.forEach((test) => {
        const fn = () => fiftDay.get(test);
        expect(fn).to.throw();
      });
    });
  });
});
