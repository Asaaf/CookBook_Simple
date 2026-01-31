export class Category {
    private id: number;
    private name?: string;
    private description?: string;

    constructor(id: number, name?: string, description?: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
    set Name(name: string) {
        this.name = name;
    }
    get Name(): string | undefined {
        return this.name;
    }
    set Description(description: string) {
        this.description = description;
    }
    get Description(): string | undefined {
        return this.description;
    }
}
