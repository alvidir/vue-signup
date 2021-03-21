import Field from './Field.vue';

export interface Controller {
    getValue: () => string,
    match: (regex: string, msg: string) => boolean,
    setError: () => void,
}

export default Field;