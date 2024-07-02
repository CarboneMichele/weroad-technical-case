import { defineEventHandler } from 'h3';
import { getTravels } from './data';

export default defineEventHandler(() => {
    return getTravels();
});
