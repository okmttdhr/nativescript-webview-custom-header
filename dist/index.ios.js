"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var platform_1 = require("platform");
var WebViewHelper = (function (_super) {
    __extends(WebViewHelper, _super);
    function WebViewHelper() {
        _super.call(this);
    }
    WebViewHelper.initWithIntercept = function (wv) {
        wv._delegate = WebViewHelper.initWithOwner(new WeakRef(wv));
    };
    WebViewHelper.initWithOwner = function (owner) {
        var delegate = new WebViewHelper();
        delegate._owner = owner;
        delegate._originalDelegate = owner.get()._delegate;
        return delegate;
    };
    // You can customize your http header here.
    WebViewHelper.prototype.webViewShouldStartLoadWithRequestNavigationType = function (webView, request, navigationType) {
        var isNavigationTypeBackForward = navigationType === UIWebViewNavigationType.BackForward;
        var isUUIDAdded = request.valueForHTTPHeaderField("UUID") === platform_1.device.uuid;
        if (isNavigationTypeBackForward || isUUIDAdded) {
            return this._originalDelegate.webViewShouldStartLoadWithRequestNavigationType(webView, request, navigationType);
        }
        var nsMutableURLRequest = new NSMutableURLRequest(request.URL, 0, 60);
        nsMutableURLRequest.setValueForHTTPHeaderField(platform_1.device.uuid, "UUID");
        webView.loadRequest(nsMutableURLRequest);
        return false;
    };
    WebViewHelper.prototype.webViewDidStartLoad = function (webView) {
        this._originalDelegate.webViewDidStartLoad(webView);
    };
    WebViewHelper.prototype.webViewDidFinishLoad = function (webView) {
        this._originalDelegate.webViewDidFinishLoad(webView);
    };
    WebViewHelper.prototype.webViewDidFailLoadWithError = function (webView, error) {
        this._originalDelegate.webViewDidFailLoadWithError(webView, error);
    };
    WebViewHelper.ObjCProtocols = [UIWebViewDelegate];
    return WebViewHelper;
}(NSObject));
exports.WebViewHelper = WebViewHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW5kZXguaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlCQUF1QixVQUFVLENBQUMsQ0FBQTtBQUdsQztJQUFtQyxpQ0FBUTtJQU16QztRQUNFLGlCQUFPLENBQUM7SUFDVixDQUFDO0lBRWEsK0JBQWlCLEdBQS9CLFVBQWdDLEVBQVc7UUFDbkMsRUFBRyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVjLDJCQUFhLEdBQTVCLFVBQTZCLEtBQXVCO1FBQ2xELElBQUksUUFBUSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDbkMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsUUFBUSxDQUFDLGlCQUFpQixHQUFTLEtBQUssQ0FBQyxHQUFHLEVBQUcsQ0FBQyxTQUFTLENBQUM7UUFDMUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQsMkNBQTJDO0lBQ3BDLHVFQUErQyxHQUF0RCxVQUF1RCxPQUFrQixFQUFFLE9BQXFCLEVBQUUsY0FBc0I7UUFDdEgsSUFBTSwyQkFBMkIsR0FBRyxjQUFjLEtBQUssdUJBQXVCLENBQUMsV0FBVyxDQUFDO1FBQzNGLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxpQkFBTSxDQUFDLElBQUksQ0FBQztRQUU1RSxFQUFFLENBQUMsQ0FBQywyQkFBMkIsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsK0NBQStDLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNsSCxDQUFDO1FBRUQsSUFBTSxtQkFBbUIsR0FBRyxJQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLG1CQUFtQixDQUFDLDBCQUEwQixDQUFDLGlCQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BFLE9BQU8sQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVNLDJDQUFtQixHQUExQixVQUEyQixPQUFrQjtRQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLDRDQUFvQixHQUEzQixVQUE0QixPQUFrQjtRQUM1QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLG1EQUEyQixHQUFsQyxVQUFtQyxPQUFrQixFQUFFLEtBQWM7UUFDbkUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLDJCQUEyQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBN0NhLDJCQUFhLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBOENwRCxvQkFBQztBQUFELENBQUMsQUEvQ0QsQ0FBbUMsUUFBUSxHQStDMUM7QUEvQ1kscUJBQWEsZ0JBK0N6QixDQUFBIn0=