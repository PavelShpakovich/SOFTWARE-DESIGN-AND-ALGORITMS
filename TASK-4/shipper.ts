abstract class Shipper {
  abstract rate: number;
  private weight: number;

  constructor(weight: number) {
    this.weight = weight;
  }

  getCost(): number {
    return this.weight * this.rate;
  }
}

class AirEastShipper extends Shipper {
  rate: number = 0.39;
  constructor(weight: number) {
    super(weight);
  }
}

class ChicagoSpirintShipper extends Shipper {
  rate: number = 0.42;
  constructor(weight: number) {
    super(weight);
  }
}

class PacificParcelShipper extends Shipper {
  rate: number = 0.51;
  constructor(weight: number) {
    super(weight);
  }
}

export class ShipperFactory {
  produceShipper(weight: number, zipCode?: string) {
    const zipCodeBegins = parseInt(zipCode?.[0] as string);

    if (zipCodeBegins <= 3) {
      return new AirEastShipper(weight);
    }

    if (zipCodeBegins <= 6) {
      return new ChicagoSpirintShipper(weight);
    }

    if (zipCodeBegins <= 9) {
      return new PacificParcelShipper(weight);
    }

    return new AirEastShipper(weight);
  }
}
