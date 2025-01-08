console.log("---operator task");
var num1=parseInt(prompt("enter the first number"));
var num2=parseInt(prompt("enter the second number"));
sum=num1+num2
sub=num1-num2;
mul=num1*num2;
div=num1/num2;
console.log("sum ="+sum);
console.log("Difference ="+sub);
console.log("product ="+mul);
console.log("quotient ="+div);


console.log("\n--------Logical Condition");
var max =prompt("the number for logical condition");
if(max>10 &&max % 2==0){
    console.log("the number is greater than 10 and divisible by 2");
}else{
    console.log("the number is  not greater than 10 and divisible by 2");
}


console.log("-----Ternary Operator Task");
let pos=prompt("enter the number");
let neg=pos>0 ?"positive" :"Negative";
console.log(neg);



console.log("------Check Odd or Even");
var vare=prompt("enter the number for check");
if(vare % 2 == 0){
    console.log("the number is even");   
}else{
    console.log("the number is odd");
}


console.log("----Grade System");
let score =parseInt(prompt("enter the percentage of grade"));
switch (true) {
    case score>=90 && score<=100:
        console.log("grade A");
        break;
    case score>=80 && score<90:
        console.log("grade B");
        break;
    case score>=70 && score<80:
        console.log("grade C");
        break;
    case score>=1 && score<70:
        console.log("grade D");
        break;
    default:
        console.log("Na");
        break;
}


console.log("----Print Multiplication Table");
let table=prompt("table you want");
for (let i = 0; i < 10;i++) {
    console.log(i+"*"+table+"="+i*table);
}


console.log("----Count Digits in a Number");
let n=7;
let count=0;
while (n>0) {
    let r=n%10;
    count++;
    n=Math.floor(n/10);
}
console.log(count);

console.log("----Dialog Box Tasks");
alert("Welcome to my website!");

console.log("----User Confirmation");
if (confirm("press the button")) {
    console.log("You chose to continue!");
}else{
    console.log("You canceled!");
}

console.log("----Prompt for Age");
let age1=prompt("enter the age");
if (age1>18) {
    console.log("you are eligible");
}else{
    console.log("you are not eligible");
}

console.log("-----Simple BMI Calculator");
var height=prompt("enter the height");
var weight=prompt("enter the weight");
var bmi=weight/(height**2)
console.log(bmi);


console.log("-----String Methods Tasks");
var name2="sasikumar";
var rev=name2.split('').reverse().join('');
console.log(rev);

console.log("-----Count Vowels");
var title="sasikumar";
var vowe="aeiou";
var a=0;
for (let i = 0; i < 10; i++) {
    if (vowe.includes(vowe[i])) {
        a++;
    }
}
console.log(a);


console.log("-----Check Palindrome");
var name3="madam";
var pal=(name3.split('').reverse().join(''));
if (name3==pal) {
    console.log(true);
}else{
    console.log(false);
}

console.log("-----Replace Words");
let i="I love programming";
console.log(i.replace("programming","JavaScript."));


console.log("-----Split Sentence into Words");
let sen = "Hello world";
if (sen) {
    const wordsArray = sen.split(" ");
    console.log(wordsArray);
    alert("Words Array: " + wordsArray.join(", "));
} else {
    alert("Please enter a valid sentence.");
}

console.log("-----Remove Spaces");
let inputS = "I love JavaScript";
let resultS = inputS.replace(/ /g, "");
console.log(resultS);


console.log("-----Find Character Frequency");
let hi="hello";
let char="1";
let count2=0;
for (let i = 0; i < hi.length; i++) {
   if (hi[i]===char) {
    count2++;
   }
}
console.log(count2)





















