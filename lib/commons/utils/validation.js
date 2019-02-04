const isNumber = value => !Number.isNaN(parseFloat(value));

const isMobile = (value) => {
  const mobilePattern = /^(?:(55[0-9]{2})|[0-9]{2})[6-9][0-9]{8}$/;

  return mobilePattern.test(value);
};

module.exports = {
  isNumber,
  isMobile
};
