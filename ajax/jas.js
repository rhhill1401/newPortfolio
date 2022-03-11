((window: any) => {
  class LsReturnModal {
      protected static _window: Window;
      public static get window() {
          return LsReturnModal._window || (LsReturnModal._window = window);
      }

      protected static _document: Document;
      public static get document() {
          return LsReturnModal._document || (LsReturnModal._document = LsReturnModal.window.document);
      }

      protected static _url: string;
      public static get url() {
          if (LsReturnModal._url === undefined) {

              //var href = LsReturnModal.window.location.href;
              const href = "http%3A%2F%2Flocalhost%3A5162%2Fc%2Fskinmedica%3Frtm%3D%22%2Faccount%2Frewards%2Falleconnectmodal%22";
              let decodedURL = LsReturnModal.decodeUrl(href, "rtm", 4)
            
              if (decodedURL === undefined) {
                  //LsLogger.log(`LsRecommendations.context - lsRecommendationContext not found - could not load recommendations`, "fatal");
                  return LsReturnModal._url;
              }

              window.history.replaceState({}, LsReturnModal.stripRTM(href, "rtm"));
              LsReturnModal.stripRTM(href, "rtm")
              return LsReturnModal._url = decodedURL;
          }
      }

      public constructor() {
          if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", LsReturnModal.getModal)
          } else {
              LsReturnModal.getModal();
          }
      }

      public static decodeUrl(url: string, param: string, num: number) {
          let value: string;

          if (url.indexOf(param) != -1) {
              let decodedURL = decodeURIComponent(url);
              let newURL = decodedURL.indexOf(param);
              let subString = decodedURL.substring(newURL + num);
              let result = subString.replace(/["]+/g, '')

              value = result;
          }

          return value;
      }

      // remove rtm and its value and return url to set as href on location
      public static stripRTM(url: string, param: string) {
          let newUrl: string;
          let decodedURL = decodeURIComponent(url);
          //let decodedURL = 'www.google.com/rtm="sssssss"yahoo'
          if (decodedURL.indexOf(param) != -1) {
              let indexOfparam = decodedURL.indexOf(param)
              let beforeParam = decodedURL.substring(0, indexOfparam)
              //let afterParam = decodedURL.substring(indexOfparam)
              let afterParam = decodedURL.match(/(?:"[^"]*"|^[^"]*$)/)[0]
              let urlArr = decodedURL.split(afterParam)
              newUrl = beforeParam + urlArr[1]
              console.log(newUrl)
          }

          return newUrl
      }

      protected static getModal() {
          var url = LsReturnModal.url;
          LsReturnModal.window.modalControls.Load(url);
      }
  }

  (window as any).LsReturnModal = LsReturnModal;
  const urd = new LsReturnModal();
})(window);