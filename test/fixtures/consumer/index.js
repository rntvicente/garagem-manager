const Chance = require('chance');

const chance = new Chance();

const dbModel = (data = {}) => ({
  mobile: data.mobile || '5511982247171',
  name: data.name || chance.name({ nationality: 'it' })
});

module.exports = { dbModel };
