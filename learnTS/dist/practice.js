"use strict";
class LsReturnModal {
    constructor(url, param) {
        this.url = url;
        this.param = param;
        this.hrefDecoded = decodeURIComponent(url);
        this.paramStart = this.hrefDecoded.indexOf(param);
    }
    urldecoder(param, number) {
        if (this.hrefDecoded.indexOf(param) - 1) {
            this.paramStart = this.hrefDecoded.indexOf(param);
            let removeParam = this.hrefDecoded.substring(this.paramStart + number);
            let deletQuotes = removeParam.replace(/['"]+/g, '');
        }
        return this;
    }
    stripRtm(num) {
        this.hrefDecoded;
        console.log(this.hrefDecoded);
        let firstHalf = this.hrefDecoded.substring(num, this.paramStart);
        let secondHalf = this.hrefDecoded.match(/(?:"[^"]*"|^[^"]*$)/)[0];
        let split = this.hrefDecoded.split(secondHalf);
        let firstAndLast = firstHalf + split[1];
        console.log(`${firstHalf}: starts at ${num} index until begining of param`);
        console.log(`${secondHalf}: takes text with quotes`);
        console.log(split);
        console.log(firstAndLast);
    }
}
const UrlDecoded = new LsReturnModal('http%3A%2F%2Flocalhost%3A51626%3Frtm%3D%22%2Faccount%2Frewards%2Falleconnectmodal%22', 'btm');
UrlDecoded.urldecoder('rtm', 4).stripRtm(0);
//# sourceMappingURL=practice.js.map