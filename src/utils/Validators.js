class Validators {
  static isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  static checkPositiveNumber(value) {
    return !value || value <= 0 || !this.isNumeric(value);
  }
}

module.exports = Validators;
