import {createEvent, createStore} from "effector";

const setField = createEvent()

// const $form = createStore({}).on(setField, (s, {key, value}) => ({
//     ...s,
//     [key]: value,
// }))