import Field from './Field.vue';

export interface Controller {
    getValue(): string;
    clear(): void;
}

export default Field;