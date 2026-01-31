export class Recipe {
    private id: number;
    private name?: string;
    private ingredients?: string[];
    private instructions?: string;
    private timeRequired?: number; // in minutes

    constructor(id: number, name?: string, ingredients?: string[], instructions?: string, timeRequired?: number) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.timeRequired = timeRequired;
    }

    set Name(name: string) {
        this.name = name;
    }
    get Name(): string | undefined {
        return this.name;
    }
    set Ingredients(ingredients: string[]) {
        this.ingredients = ingredients;
    }
    get Ingredients(): string[] | undefined {
        return this.ingredients;
    }
    set Instructions(instructions: string) {
        this.instructions = instructions;
    }
    get Instructions(): string | undefined {
        return this.instructions;
    }
    set TimeRequired(timeRequired: number) {
        this.timeRequired = timeRequired;
    }
    get TimeRequired(): number | undefined {
        return this.timeRequired;
    }
}
