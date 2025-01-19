//1
const employees = [
    { name: 'John', age: 28 },
    { name: 'Anna', age: 22 },
    { name: 'Mike', age: 32 },
];
employees.sort(function (a, b) {
    return a.age - b.age;
});
console.log(employees);
  
//2
function groupOddEven(numbers) {
    const result = { odd: [], even: [] };
    numbers.forEach(num => {
        result[num % 2 == 0 ? 'even' : 'odd'].push(num);
    });
    return result;
}
const nums = [1, 2, 3, 4, 5, 6];
const grouped = groupOddEven(nums);
console.log(grouped);


//3
function removeDuplicates(data) {
    const unique = {};
    return data.filter(item => {
        if (!unique[item.id]) {
            unique[item.id] = true;
            return true;
        }
        return false;
    });
}
const data = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 1, name: 'C' },
];
const uniqueData = removeDuplicates(data);
console.log(uniqueData);



//4
const nums2 = [1, 2, 2, 3, 3, 3];
let count = {};
nums2.forEach(n => count[n] = (count[n] || 0) + 1);
let max = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
console.log("Most Frequent Element:", Number(max));




//5
function findCommon(arr1, arr2) {
    return arr1.filter(element => arr2.includes(element));
}
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];
const commonElements = findCommon(arr1, arr2);
console.log(commonElements);
  



//6
function transform(arr) {
    return arr.reduce((map, obj) => {
        map[obj.id] = obj.name;
        return map;
    }, {});
}
const arr = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
];
const result = transform(arr);
console.log(result);
  



//7
const nums3 = [1, 2, 2, 3, 4, 4, 5];
let count2 = {};
nums3.forEach(n => count2[n] = (count2[n] || 0) + 1);
const uniqueNums = Object.keys(count2).filter(k => count2[k] === 1).map(Number);
console.log("Unique Elements:", uniqueNums);





//8
const obj = { a: 1, b: 2 };
const result1 = Object.entries(obj);
console.log(result1);


//9
const obj1={a: 1, b: 2, c: 3}
const filtered=Object.fromEntries(Object.entries(obj1).filter(([key])>=key!=='c'));
console.log(filtered);




//10
const a = [1, 2, 3, 5];
const b = [4, 7];
const c = 6;
const result2 = [];
const inputs = [];
for (let i = 0; i < a.length; i++) {
  inputs.push(a[i]);
}
for (let i = 0; i < b.length; i++) {
  inputs.push(b[i]);
}
inputs.push(c);
for (let i = 0; i < inputs.length; i++) {
  if (!result2.includes(inputs[i])) {
    result2.push(inputs[i]);
  }
}
console.log(result2);



