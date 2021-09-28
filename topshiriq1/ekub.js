
 function ekub (a, b){
  if(typeof a !== 'number'&& typeof b !== 'number'){
     return false
  }
  while(b){
    let c = b
    b = a % b
    a = c
  }
  return a
}
 
 module.exports = ekub



