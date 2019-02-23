const { expect } = require('chai');
const moment = require('moment');

const { fiftDay } = require('../../../lib/util');

describe('# Casos de Test Unit Obter 5ª dia útil', () => {
  const SUNDAY = 0;
  const SATURDAY = 6;

  describe('#Casos de Sucesso', () => {
    it('Nao deve retornar valor null.', () => {
      const referenceDate = moment().toDate();
      const result = fiftDay.get(referenceDate);
      expect(result).to.be.not.equal(null);
    });

    it('Não deve retornar um undefined.', () => {
      const referenceDate = moment().toDate();
      const result = fiftDay.get(referenceDate);
      expect(result).to.be.not.equal(undefined);
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

    it('Deve retornar o quinto dia útil do mês quando o mês inicia na Segunda (2019-04)', () => {
      const referenceDate = moment('2019-04-25').toDate();
      const result = fiftDay.get(referenceDate);

      expect(result).to.be.equal('2019-04-05');
    });

    it('Deve retornar o quinto dia útil do mês quando o mês inicia na Terça (2019-01)', () => {
      const referenceDate = moment('2019-01-25').toDate();
      const result = fiftDay.get(referenceDate);

      expect(result).to.be.equal('2019-01-07');
    });

    it('Deve retornar o quinto dia útil do mês quando o mês inicia na Quarta (2019-05)', () => {
      const referenceDate = moment('2019-05-25').toDate();
      const result = fiftDay.get(referenceDate);

      expect(result).to.be.equal('2019-05-07');
    });

    it('Deve retornar o quinto dia útil do mês quando o mês inicia na Quinta (2019-08)', () => {
      const referenceDate = moment('2019-08-25').toDate();
      const result = fiftDay.get(referenceDate);

      expect(result).to.be.equal('2019-08-07');
    });

    it('Deve retornar o quinto dia útil do mês quando o mês inicia na Sexta (2019-02)', () => {
      const referenceDate = moment('2019-08-25').toDate();
      const result = fiftDay.get(referenceDate);

      expect(result).to.be.equal('2019-08-07');
    });

    it('Deve retornar o quinto dia útil do mês quando o mês inicia na Sabado (2019-06)', () => {
      const referenceDate = moment('2019-06-25').toDate();
      const result = fiftDay.get(referenceDate);

      expect(result).to.be.equal('2019-06-07');
    });

    it('Deve retornar o quinto dia útil do mês quando o mês inicia na Domingo (2019-09)', () => {
      const referenceDate = moment('2019-09-25').toDate();
      const result = fiftDay.get(referenceDate);

      expect(result).to.be.equal('2019-09-06');
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
