
function verify(str) {
    let checksum = str.substring(str.length - 2, str.length)


    let sumNum = 0;
    for (let index = 0; index < (str.length - 2) / 2; index++) {
        sumNum += parseInt("0x" + str.substring(2 * index, 2 * index + 2));
    }

    let sumNum16 = sumNum.toString(16).length == 1 ? '0' + sumNum.toString(16) : sumNum.toString(16)

    let verSumNum16 = sumNum16.substring(sumNum16.length - 2, sumNum16.length)

    let calculateCheckSum = (parseInt("0xff") - parseInt("0x" + verSumNum16) + parseInt('0x01')).toString(16)


    return checksum.toUpperCase() == calculateCheckSum.toUpperCase()

}

// let num = "00006d01cb01720000000000000000000000000000000000000000000000ed039d024c010500ce004001b4510000010201f4010000000000000000000300000000000000000000000204010000000000005cc90e3d0003000000000000000000000000030000000000000000000000e6"
// console.log(verify(num))



module.exports = {
    verify
}