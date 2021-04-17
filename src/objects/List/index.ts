import List from "./List.vue";

export interface ListController<itemType> {
    add(item: itemType): number;
    remove(item: itemType): boolean;
    removeByIndex(index: number): itemType;
}

export class ObjectList<itemType> {
    items: itemType[];
    csize: number;

    constructor(csize: number) {
        this.csize = csize;
        this.items = new Array<itemType>(csize > 0? csize : 0);
    }

    
    add(item: itemType): number {
        if (this.items.indexOf(item) == -1) {
            return this.items.push(item);
        }

        return -1;
    }
    
    remove(item: itemType): boolean {
        if (this.items.length > 0){
            const index = this.items.indexOf(item)
            if (index != -1) {
                delete this.items[index];
                return true;
            }
        }

        return false;
    }
}

export default List;