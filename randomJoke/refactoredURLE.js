import LsModals from '~/Src/Components/Modal/Modal';
import LsLogger from '../Logging/Logger';

class LsReturnModal {
  static _window;
  static get window() {
    return LsReturnModal._window || (LsReturnModal._window = window);
  }

  static _document;
  static get document() {
    return (
      LsReturnModal._document ||
      (LsReturnModal._document = LsReturnModal.window.document)
    );
  }

  static _url;
  static get url() {
    if (LsReturnModal._url === undefined) {
      //var href = LsReturnModal.window.location.href;
      const href =
        'http%3A%2F%2Flocalhost%3A51626%3Frtm%3D%22account%2Frewards%2Falleconnectmodal%22';
      let decodedURL = LsReturnModal.decodeUrl(href, 'rtm', 4);
      if (decodedURL === undefined) {
        LsLogger.log(
          `LsRecommendations.context - lsRecommendationContext not found - could not load recommendations`,
          'fatal'
        );
        return LsReturnModal._url;
      }

      //LsReturnModal.window.location.href = LsReturnModal.stripRTM(href, "rtm");
      return (LsReturnModal._url = decodedURL);
    }
  }

  constructor() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', LsReturnModal.getModal);
    } else {
      LsReturnModal.getModal();
    }
  }

  static decodeUrl(url, param, num) {
    let value;

    if (url.indexOf(param) != -1) {
      let decodedURL = decodeURIComponent(url);
      let newURL = decodedURL.indexOf(param);
      let subString = decodedURL.substring(newURL + num);
      let result = subString.replace(/["]+/g, '');

      value = result;
    }

    return value;
  }

  // remove rtm and its value and return url to set as href on location
  static stripRTM(url, param) {
    let value;

    if (url.indexOf(param) != -1) {
      let decodedURL = decodeURIComponent(url);
      console.log(decodedURL);
      let newURL = decodedURL.indexOf(param);
      console.log(param);

      //value = result;
    }

    return value;
  }

  static getModal() {
    LsModals.openModalByUrl(LsReturnModal.url);
  }
}
