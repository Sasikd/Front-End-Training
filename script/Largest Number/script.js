var arr=[1, 5, 3, 9, 2];
let max=0;
for(let i=0;i<arr.length;i++){
    if(max < arr[i]) {
        max=arr[i];
    }
}
console.log(max);
