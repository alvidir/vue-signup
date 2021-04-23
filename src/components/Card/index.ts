import Card from "./Card.vue";

export type Message = {
    title: string,
    subtitle: string | undefined,
    body: string | undefined,
    color: string |undefined,
}

export class Controller {
    msg: Message;
    id: string;
    
    constructor(id: string, data: Message) {
        this.id = id;
        this.msg = data;
    }

    public data(): any {
        return this.msg;
    }

    public key(): string {
        return this.id;
    }

    public type(): string {
        return "card";
    }

}

export default Card;