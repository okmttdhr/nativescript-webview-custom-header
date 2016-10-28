import { device } from "platform";
import { WebView } from "ui/web-view";

export class WebViewHelper extends android.webkit.WebViewClient {
    private _view: any;
    private _origClient: any; // WebViewClient

    constructor() {
      super();
      return global.__native(this);
    }

    public static initWithIntercept(wv: WebView) {
      (<any>wv)._webViewClient = WebViewHelper.initWithView(wv);
    }

    private static initWithView(view: WebView): WebViewHelper {
      let client = new WebViewHelper();
      client._view = view;
      client._origClient = (<any>view)._webViewClient;
      return client;
    }

    // You can customize your http header here.
    public shouldOverrideUrlLoading(view: android.webkit.WebView, url: string) {
      const addedHeaders: java.util.Map<String, String> = new java.util.HashMap<String, String>();
      addedHeaders.put("UUID", device.uuid);
      (<any>view).loadUrl(url, addedHeaders);
      return true;
    }

    public onPageStarted(view: android.webkit.WebView, url: string, favicon: android.graphics.Bitmap) {
      super.onPageStarted(view, url, favicon);
      if (this._view) {
        this._view._onLoadStarted(url, WebView.navigationTypes[WebView.navigationTypes.indexOf("linkClicked")]);
      }
    }

    public onPageFinished(view: android.webkit.WebView, url: string) {
      super.onPageFinished(view, url);
      if (this._view) {
        this._view._onLoadFinished(url, undefined);
      }
    }

    public onReceivedError() {
      const view = arguments[0];
      if (arguments.length === 4) {
          const errorCode = arguments[1];
          const description = arguments[2];
          const failingUrl = arguments[3];
          super.onReceivedError(view, errorCode, description, failingUrl);
          if (this._view) {
              this._view._onLoadFinished(failingUrl, description + "(" + errorCode + ")");
          }
      }
      else {
          const request = arguments[1];
          const error = arguments[2];
          super.onReceivedError(view, request, error);
          if (this._view) {
              this._view._onLoadFinished(error.getUrl && error.getUrl(), error.getDescription() + "(" + error.getErrorCode() + ")");
          }
      }
    }
}
