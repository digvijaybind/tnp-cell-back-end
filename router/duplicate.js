


const arr = ["1",-1, 2, "2", "bad", -0.5,3,"-3", 5, 4,5, NaN,{name: "Digvijay"}]



function uniquefunction(arr){
    const unique=[];

    arr.forEach((value) =>{
        if(!unique.include(value)){
            unique.push(value)
        }
    })
  return unique;
}