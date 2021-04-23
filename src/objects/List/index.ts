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
    capacity(): number;
    len(): number;
    all(): itemType[];
}

export class ObjectList<itemType> {
    items: itemType[];
    csize: number;

    constructor(csize: number) {
        this.csize = csize > 0? csize : -1;
        this.items = new Array<itemType>(csize > 0? csize : 0);
    }

    public all(): itemType[] {
        return this.items;
    }

    public capacity(): number {
        return this.csize;
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
        if (this.items.indexOf(item) == -1) {
            return this.items.push(item);
        }

        return -1;
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