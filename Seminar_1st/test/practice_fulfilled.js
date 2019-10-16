function getData() {
    return new Promise(function (resolve, reject) {
    var data = 25;
    resolve(data); 
});
}
getData().then(
    function (resolvedData) {
        console.log(resolvedData); 
    });