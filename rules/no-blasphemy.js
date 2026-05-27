const aliases = {
    d: ['ⅆ', 'ԁ', 'Ԁ', 'đ'],
    i: ['1', '|', '!', 'ɩ'],
    o: ['0', 'ø', '◎'],
    m: ['м', 'ṃ', 'ɱ'],
    a: ['4', '@'],
    n: ['η'],
    g: ['ɡ', 'ց'],
    e: ['3', '℮'],
    s: ['5', '$', 'ƽ'],
    u: ['ʊ'],
    c: ['¢'],
    t: ['7', '+']
};

const bannedWords = ['dio', 'madonna', 'gesu', 'cristo'];

const aliasMap = Object.entries(aliases).reduce((map, [letter, variants]) => {
    variants.forEach((variant) => {
        map.set(variant, letter);
    });

    return map;
}, new Map());

const normalizeText = (text) => {
    return text
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/gu, '')
        .toLowerCase()
        .split('')
        .map((character) => aliasMap.get(character) || character)
        .join('')
        .replace(/([a-z])\1{2,}/gu, '$1$1');
};

const buildObfuscatedWordPattern = (word) => {
    const characters = word.split('').map((character) => `${character}+`);
    const separator = '[^a-z]*';

    return new RegExp(`(^|[^a-z])${characters.join(separator)}([^a-z]|$)`, 'u');
};

const bannedWordPatterns = bannedWords.map(buildObfuscatedWordPattern);

const containsBlasphemy = (text) => {
    const normalizedText = normalizeText(text);

    return bannedWordPatterns.some((pattern) => pattern.test(normalizedText));
};
module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "disallow blasphemy",
        },
        schema: [] // no options
    },
    create: function(context) {
        return {
            Literal(node) {
                if (typeof node.value === 'string') {
                    if (containsBlasphemy(node.value)) {
                        context.report({
                            node,
                            message: `Blasphemy is not allowed.`
                        });
                    }
                }
            }
        };
    }
};