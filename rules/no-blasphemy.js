const aliases = {
  d: ['d', 'D', '𝑑', '𝐝', '𝕕', '𝖉', 'ⅆ', 'ԁ', 'Ԁ', 'đ'],
  i: ['i', 'I', '1', '𝑖', '𝐢', '𝕚', '𝖎', 'í', 'ì', 'î', 'ï', '|'],
  o: ['o', 'O', '0', '𝑜', '𝐨', '𝕠', '𝖔', 'ó', 'ò', 'ô', 'ö', 'ø', '◎'],
  m: ['m', 'M', '𝑚', '𝐦', '𝕞', '𝖒', 'м', 'ṃ', 'ɱ'],
  a: ['a', 'A', '4', '𝑎', '𝐚', '𝕒', '𝖆', 'á', 'à', 'â', 'ä', '@'],
  n: ['n', 'N', '𝑛', '𝐧', '𝕟', '𝖓', 'ñ', 'ń', 'η'],
  g: ['g', 'G', '𝑔', '𝐠', '𝕘', '𝖌', 'ğ', 'ǧ', 'ɡ', 'ց'],
  e: ['e', 'E', '3', '𝑒', '𝐞', '𝕖', '𝖊', 'é', 'è', 'ê', 'ë', '℮'],
  s: ['s', 'S', '5', '𝑠', '𝐬', '𝕤', '𝖘', '$', 'š', 'ş', 'ƽ'],
  u: ['u', 'U', '𝑢', '𝐮', '𝕦', '𝖚', 'ú', 'ù', 'û', 'ü', 'ʊ'],
  c: ['c', 'C', '𝑐', '𝐜', '𝕔', '𝖈', 'ç', 'č', '¢'],
  r: ['r', 'R', '𝑟', '𝐫', '𝕣', '𝖗', 'ŕ', 'ř', 'ɾ'],
  t: ['t', 'T', '7', '𝑡', '𝐭', '𝕥', '𝖙', 'ţ', 'ŧ', '+']
};

const bannedWords = ['dio', 'madonna', 'gesù', 'cristo']

const getNormalizedWord = (word) => {
    for (const i in word) {
        for (const key in aliases) {
            const letters = aliases[key];
            if (letters.includes(word[i])) {
                word = word.replace(word[i], key);
            }
        }
    }
    return word;
};
const rule = {
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
                    const word = node.value.toLowerCase();
                    const normalizedWord = getNormalizedWord(word);
                    if (bannedWords.some(bannedWord => normalizedWord.includes(bannedWord))) {
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

export default rule;