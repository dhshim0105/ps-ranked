function randomWork() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const success = Math.random() < 0.5;

            if (success) {
                resolve("작업 성공!");
            } else {
                reject("작업 실패!");
            }
        }, 1000);
    });
}
async function testAsync() {
    console.log("1");

    const result = await waitTwoSeconds();

    console.log(result);
    console.log("2");
}

testAsync();

console.log("3");