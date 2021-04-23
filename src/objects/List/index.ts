import List from "./List.vue";

export interface ItemController {
    data(): any;
    key(): string;
    type(): string;
}

export interface ListController<itemType> {
    add(item: itemType): number;
    get(index: number): itemType | undefined;
    remove(item: itemType): boolean;
    removeByIndex(index: number): itemType | undefined;
    len(): number;
    all(): itemType[];
}

export class ObjectList<itemType> {
    items: itemType[];

    constructor() {
        this.items = new Array<itemType>();
    }

    public all(): itemType[] {
        return this.items;
    }

    public get(index: number): itemType | undefined {
        if (index < 0 || index > this.items.length-1) {
            return undefined;
        }

        return this.items[index];
    }

    public len(): number {
        return this.items.length;
    }

    public add(item: itemType): number {
        return this.items.push(item);
    }
    
    public remove(item: itemType): boolean {
        if (this.items.length > 0){
            const index = this.items.indexOf(item)
            if (index != -1) {
                delete this.items[index];
                return true;
            }
        }

        return false;
    }

    public removeByIndex(index: number): itemType | undefined {
        if (index < 0 || index > this.items.length-1) {
            return undefined;
        }

        const item = this.items[index];
        delete this.items[index];
        return item;
    }
}

export default List;