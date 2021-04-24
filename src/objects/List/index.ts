import List from "./List.vue";

export interface ItemController {
    data(): any;
    key(): string;
    type(): string;
}

export interface ListController<itemType> {
    len(): number;
    all(): itemType[];
    get(index: number): itemType | undefined;
    push(item: itemType): number;
    pop(): itemType | undefined;
}

class Node<itemType> {
    public item: itemType;
    public next: Node<itemType> | undefined;

    constructor(item: itemType) {
        this.item = item;
    }
}

export class ObjectList<itemType> {
    root: Node<itemType> | undefined;
    latest: Node<itemType> | undefined;
    lenght = 0;

    public len(): number {
        return this.lenght;
    }

    public all(): itemType[] {
        if(!this.root) {
            return [];
        }

        const buffer = new Array<itemType>(this.lenght);
        for (let i = 0, it: Node<itemType> | undefined = this.root;
                 i < buffer.length && it;
                 it = it.next, i++) {
            buffer[i] = it.item;
        }

        return buffer;
    }

    public get(index: number): itemType | undefined {
        if (!this.root || index < 0 || index > this.lenght-1) {
            return undefined;
        }

        let subject: itemType | undefined = undefined;
        for (let it: Node<itemType> | undefined = this.root;
                 index+1 > 0 && it && it != this.latest;
                 it = it.next, index--) {
            if (index == 0) subject = it.item;
        }
        
        return subject;
    }

    public push(item: itemType): number {
        const node = new Node(item);

        if (!this.root) {
            this.root = node;
            this.lenght++;
        } else if (this.latest) {
            this.latest.next = node;
            this.lenght++;
        }

        this.latest = node;
        return this.lenght;
    }
    

    public pop(): itemType | undefined {
        if (!this.root) {
            return undefined;
        }

        let subject: itemType | undefined = undefined;
        if (!this.root.next) {
            // if this.root is a single node
            subject = this.root.item;
            this.root = undefined;
            this.lenght--;
        }
        
        for (let it: Node<itemType> | undefined = this.root;
                 it && it != this.latest; it = it.next) {
            if (!it.next?.next) {
                subject = it.next?.item;
                it.next = undefined;
                this.lenght--;
            }
        }

        return subject;
    }
}

export default List;