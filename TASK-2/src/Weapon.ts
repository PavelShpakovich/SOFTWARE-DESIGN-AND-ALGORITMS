import { Item } from "./Item";

export abstract class Weapon extends Item {
  static MODIFIER_CHANGE_RATE: number = 0.05;
  protected baseDamage: number;
  protected damageModifier: number = 0;
  protected durabilityModifier: number = 0;
  private baseDurability: number;

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(name, value, weight);
    this.baseDamage = baseDamage;
    this.baseDurability = baseDurability;
  }

  abstract polish(): void;

  use(): string {
    if (this.baseDurability <= 0) return `You can't use the ${this.name}, it is broken.`;

    this.baseDurability -= Weapon.MODIFIER_CHANGE_RATE;
    if (this.baseDurability <= 0) {
      this.baseDurability = 0;
    }
    return `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.${
      !this.baseDurability ? `\nThe ${this.name} breaks.` : ""
    }`;
  }

  toString(): string {
    return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}, Damage: ${(
      this.baseDamage + this.damageModifier
    ).toFixed(2)}, Durability: ${((this.baseDurability + this.durabilityModifier) * 100).toFixed(2)}%`;
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
