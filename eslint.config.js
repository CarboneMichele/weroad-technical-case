// As on:  https://github.com/antfu/eslint-config
import antfu from '@antfu/eslint-config';

export default antfu({
    stylistic: {
        indent: 4,
        quotes: 'single',
        semi: true,
    },
    javascript: {
        node: true,
    },

});
