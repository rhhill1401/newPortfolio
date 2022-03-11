class LsReturnModal {
  hrefDecoded: any;
  paramStart: any;

  constructor(protected url: string, protected param: string) {
    this.hrefDecoded = decodeURIComponent(url);
    this.paramStart = this.hrefDecoded.indexOf(param);
  }
  urldecoder(param: any, number: number) {
    if (this.hrefDecoded.indexOf(param)! - 1) {
      this.paramStart = this.hrefDecoded.indexOf(param);
      let removeParam = this.hrefDecoded.substring(this.paramStart + number);
      let deletQuotes = removeParam.replace(/['"]+/g, '');
    }
    return this;
  }

  stripRtm(num: number) {
    this.hrefDecoded;
    console.log(this.hrefDecoded);
    // let tester = 'https://www.google.com/= "gravyman"';
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

const UrlDecoded = new LsReturnModal(
  'http%3A%2F%2Flocalhost%3A51626%3Frtm%3D%22%2Faccount%2Frewards%2Falleconnectmodal%22',
  'btm'
);

UrlDecoded.urldecoder('rtm', 4).stripRtm(0);
//   protected static _url: string;
//   public static get url() {
//     if (LsReturnModal._url === undefined) {
//       //var href = LsReturnModal.window.location.href;
//       const href =
//         'http%3A%2F%2Flocalhost%3A51626%3Frtm%3D%22%2Faccount%2Frewards%2Falleconnectmodal%22';
//       let decodedURL = LsReturnModal.decodeUrl(href, 'rtm', 4);
//       console.log(decodedURL);
//       if (decodedURL === undefined) {
//         return LsReturnModal._url;
//       }
//       LsReturnModal.window.location.href = LsReturnModal.stripRTM(href, 'rtm')!;
//       window.history.replaceState({}, LsReturnModal.stripRTM(href, 'rtm'));
//       return (LsReturnModal._url = decodedURL);
//     }
//   }

//   public constructor() {
//     // if (document.readyState === 'loading') {
//     //   document.addEventListener('DOMContentLoaded', LsReturnModal.getModal);
//     // } else {
//     //   LsReturnModal.getModal();
//     // }
//   }

//   public static decodeUrl(url: string, param: string, num: number) {
//     let value;

//     if (url.indexOf(param) != -1) {
//       let decodedURL = decodeURIComponent(url);
//       let newURL = decodedURL.indexOf(param);
//       let subString = decodedURL.substring(newURL + num);
//       let result = subString.replace(/["]+/g, '');

//       value = result;
//     }

//     return value;
//   }

//   // remove rtm and its value and return url to set as href on location
//   public static stripRTM(url: string, param: string) {
//     let newUrl;

//     let decodedURL = decodeURIComponent(url);
//     //let decodedURL = 'www.google.com/rtm="sssssss"yahoo'
//     if (decodedURL.indexOf(param) != -1) {
//       let indexOfparam = decodedURL.indexOf(param);
//       let beforeParam = decodedURL.substring(0, indexOfparam);
//       // let afterParam = decodedURL.match(/(?:"[^"]*"|^[^"]*$)/)[0];
//       // let urlArr = decodedURL.split(afterParam);
//       // newUrl = beforeParam + urlArr[1];
//       console.log(beforeParam);

//       //value = result;
//     }

//     return newUrl;
//   }

//   protected static getModal() {
//     let url = LsReturnModal.url;
//   }
// }

// export default LsReturnModal;
