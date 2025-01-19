function LargestWord(str) {
    const n = str.split(" ");
    let largeWord = "";
    for (let i = 0; i < n.length; i++) {
        if (n[i].length > largeWord.length) {
            largeWord = n[i];
        }
    }
    return largeWord;
}
const sen = "The quick brown fox jumped over the lazy dog";
console.log(LargestWord(sen));


function replaceNames(sentence) {
    const n = sentence.split(" ");
    const sentence = new Set();
    for (let i = 0; i < n.length; i++) {
        if (sentence.has(n[i])) {
            n[i] = "CHANGED";
        } else {
            sentence.add(n[i]);
        }
    }
    return n.join(" ");
}
const sen1 = "John Mary John Alex Mary";
console.log(replaceNames(sen1));


function replaceIndexedWords(sentence) {
    const words = sentence.split(" "); 
    for (let i = 0; i < words.length; i++) {
        if (i % 2 == 0) { 
            words[i] = "EVEN"; 
        }
    }
    return words.join(" ");
}
const sen2 = "I am learning JavaScript every day";
console.log(replaceIndexedWords(sen2));


function removeDuplicates(input) {
    let result = "";
    for (let i = 0; i < input.length; i++) {
        if (!result.includes(input[i])) {
            result += input[i];
        }
    }
    return result;
}
const input = "Hello world";
console.log(removeDuplicates(input));


