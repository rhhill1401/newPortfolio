import $ = require("jquery");

import LsApi from "~/Src/Components/Api/Api";
import { getCookie, setCookie } from "~/Src/Components/Utilities/Utilities";
import LsModals from "~/Src/Components/Modal/Modal";
import LsLogger from "../Logging/Logger";


class LsReturnModel {
    contextData: string;
    location: string;
    referrer: string;
    items: Array<{ [key: string]: string }>;
}



class LsReturnDefaults {
    public static container = "[data-decoded-container]";
    public static urlAttribute = "data-url";

}
export class LsReturnModal {
    protected static initialized = false;

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


        if (!LsReturnModal.initialized) {
            console.log('initialized')

            if (LsReturnModal._url === undefined) {
                console.log('url is undefined')

       

                //var href = LsReturnModal.window.location.href;
                const href = "http%3A%2F%2Flocalhost%3A51626%3Faccount%2Frewards%2Falleconnectmodal";
              

                let decodedURL = LsReturnModal.decodeUrl(href, "rtm", 4)
                //var href = "account/rewards/alleconnectmodal"

           /*     if (href.indexOf("rtm")!=-1) {*/
                // check if the url has the parameter
                  
                  /*  let decodedURL = decodeURIComponent(href)
                    console.log(decodedURL)

                    let newURL = decodedURL.indexOf('rtm')
                    console.log(newURL)
                    let result = decodedURL.substring(newURL + 4)
                    
                    let replacethis = result.replace(/["]+/g, '')
                    console.log(replacethis)
                 */
                    if (decodedURL === undefined) {
                        LsLogger.log(`LsRecommendations.context - lsRecommendationContext not found - could not load recommendations`, "fatal");
                        return LsReturnModal._url;
                    }

           /*         LsReturnModal._url = replacethis*/
                 
                 
              /*  }*/

   
             

                // look at productrecommendations for examples of how to set url if its undefined on page load
                // return LsReturnModal._url || (LsReturnModal._url = LsUdoManager.get("sms"));
               /* LsModals.openModalByUrl(LsReturnModal._url)*//*
              LsModals.openModalByUrl(LsReturnModal._url)*/
/*
                LsModals.openModalByUrl(decodedURL)*/
                let test5 = LsModals.openModalByUrl(decodedURL)
                console.log(test5)
            }
        }
    }
    public constructor() {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => {
                LsReturnModal.url
            })
        } else {
            LsReturnModal.getModal();
        }
    }

    public static decodeUrl(url: string, param: string, num: number) {

        if (url.indexOf(param) != -1) {
            let decodedURL = decodeURIComponent(url);
            console.log(decodedURL);
            let newURL = decodedURL.indexOf(param);
            console.log(param);

            let result = decodedURL.substring(newURL + num);
            console.log(result);

            let replacethis = result.replace(/["]+/g, '')
            console.log(replacethis)

            

            LsReturnModal._url = replacethis
        }

        return LsReturnModal._url

    }

    protected static getModal() {
        // remove the paramater from the URL before loading the modal
        console.log("modal test")
        LsModals.openModalByUrl(LsReturnModal._url)
    }

   
    
          
}

export default LsReturnModal;