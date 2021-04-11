const add = (a,b) => {
    if(isNaN(a) || isNaN(b)) return 'error'
    return a+b
}

module.exports = {add}