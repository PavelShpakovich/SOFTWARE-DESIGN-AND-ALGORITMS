import { Item } from "./Item";

export abstract class Weapon extends Item {
  static MODIFIER_CHANGE_RATE: number = 0.05;
  protected baseDamage: number;
  protected damageModifier: number = 0;
  protected durabilityModifier: number = 0;
  private baseDurability: number;
  private isBroken: boolean = false;

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(name, value, weight);
    this.baseDamage = baseDamage;
    this.baseDurability = baseDurability;
  }

  abstract polish(): void;

  use(): string {
    if (this.isBroken) return `You can't use the ${this.name}, it is broken.`;

    this.durabilityModifier -= Weapon.MODIFIER_CHANGE_RATE;
    if (this.getEffectiveDurability() <= 0) {
      this.isBroken = true;
    }
    return `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.${
      this.getEffectiveDurability() <= 0 ? `\nThe ${this.name} breaks.` : ""
    }`;
  }

  toString(): string {
    return `${super.toString()}, Damage: ${this.getEffectiveDamage().toFixed(2)}, Durability: ${(
      this.getEffectiveDurability() * 100
    ).toFixed(2)}%`;
  }

  getEffectiveDamage(): number {
    return this.baseDamage + this.damageModifier;
  }
  getEffectiveDurability(): number;
  getEffectiveDurability(durabilityModifier: number): number;
  getEffectiveDurability(durabilityModifier?: number): number {
    return this.baseDurability + (durabilityModifier ?? this.durabilityModifier);
  }
}
