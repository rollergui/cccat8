export default class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expirationDate: Date
  ) {}

  getDiscount(total: number) {
    return this.validCoupon() ? (total * this.percentage)/100 : 0;
  }

  validCoupon() {
    return this.expirationDate > new Date();
  }
}