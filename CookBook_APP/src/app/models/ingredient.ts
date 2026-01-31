export class Ingredient {
    private id: number;
    private name?: string;
    private quantity?: string; // e.g., "2 cups", "150g"

    constructor(id: number, name?: string, quantity?: string) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }

    set Name(name: string) {
        this.name = name;
    }

    get Name(): string | undefined {
        return this.name;
    }

    set Quantity(quantity: string) {
        this.quantity = quantity;
    }

    get Quantity(): string | undefined {
        return this.quantity;
    }

    set Id(id: number) {
        this.id = id;
    }

    get Id(): number {
        return this.id;
    }

}
