import { device } from "platform";
import { WebView } from "ui/web-view";

export class WebViewHelper extends NSObject implements UIWebViewDelegate {
  public static ObjCProtocols = [UIWebViewDelegate];

  private _owner: WeakRef<WebView>;
  private _originalDelegate: any; // UIWebViewDelegateImpl

  constructor() {
    super();
  }

  public static initWithIntercept(wv: WebView) {
    (<any>wv)._delegate = WebViewHelper.initWithOwner(new WeakRef(wv));
  }

  private static initWithOwner(owner: WeakRef<WebView>): WebViewHelper {
    let delegate = new WebViewHelper();
    delegate._owner = owner;
    delegate._originalDelegate = (<any>owner.get())._delegate;
    return delegate;
  }

  // You can customize your http header here.
  public webViewShouldStartLoadWithRequestNavigationType(webView: UIWebView, request: NSURLRequest, navigationType: number) {
    const isNavigationTypeBackForward = navigationType === UIWebViewNavigationType.BackForward;
    const isUUIDAdded = request.valueForHTTPHeaderField("UUID") === device.uuid;

    if (isNavigationTypeBackForward || isUUIDAdded) {
      return this._originalDelegate.webViewShouldStartLoadWithRequestNavigationType(webView, request, navigationType);
    }

    const nsMutableURLRequest = new NSMutableURLRequest(request.URL, 0, 60);
    nsMutableURLRequest.setValueForHTTPHeaderField(device.uuid, "UUID");
    webView.loadRequest(nsMutableURLRequest);
    return false;
  }

  public webViewDidStartLoad(webView: UIWebView) {
    this._originalDelegate.webViewDidStartLoad(webView);
  }

  public webViewDidFinishLoad(webView: UIWebView) {
    this._originalDelegate.webViewDidFinishLoad(webView);
  }

  public webViewDidFailLoadWithError(webView: UIWebView, error: NSError) {
    this._originalDelegate.webViewDidFailLoadWithError(webView, error);
  }
}
