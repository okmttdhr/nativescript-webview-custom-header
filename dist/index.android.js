"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var platform_1 = require("platform");
var web_view_1 = require("ui/web-view");
var WebViewHelper = (function (_super) {
    __extends(WebViewHelper, _super);
    function WebViewHelper() {
        _super.call(this);
        return global.__native(this);
    }
    WebViewHelper.initWithIntercept = function (wv) {
        wv._webViewClient = WebViewHelper.initWithView(wv);
    };
    WebViewHelper.initWithView = function (view) {
        var client = new WebViewHelper();
        client._view = view;
        client._origClient = view._webViewClient;
        return client;
    };
    // You can customize your http header here.
    WebViewHelper.prototype.shouldOverrideUrlLoading = function (view, url) {
        var addedHeaders = new java.util.HashMap();
        addedHeaders.put("UUID", platform_1.device.uuid);
        view.loadUrl(url, addedHeaders);
        return true;
    };
    WebViewHelper.prototype.onPageStarted = function (view, url, favicon) {
        _super.prototype.onPageStarted.call(this, view, url, favicon);
        if (this._view) {
            this._view._onLoadStarted(url, web_view_1.WebView.navigationTypes[web_view_1.WebView.navigationTypes.indexOf("linkClicked")]);
        }
    };
    WebViewHelper.prototype.onPageFinished = function (view, url) {
        _super.prototype.onPageFinished.call(this, view, url);
        if (this._view) {
            this._view._onLoadFinished(url, undefined);
        }
    };
    WebViewHelper.prototype.onReceivedError = function () {
        var view = arguments[0];
        if (arguments.length === 4) {
            var errorCode = arguments[1];
            var description = arguments[2];
            var failingUrl = arguments[3];
            _super.prototype.onReceivedError.call(this, view, errorCode, description, failingUrl);
            if (this._view) {
                this._view._onLoadFinished(failingUrl, description + "(" + errorCode + ")");
            }
        }
        else {
            var request = arguments[1];
            var error = arguments[2];
            _super.prototype.onReceivedError.call(this, view, request, error);
            if (this._view) {
                this._view._onLoadFinished(error.getUrl && error.getUrl(), error.getDescription() + "(" + error.getErrorCode() + ")");
            }
        }
    };
    return WebViewHelper;
}(android.webkit.WebViewClient));
exports.WebViewHelper = WebViewHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUJBQXVCLFVBQVUsQ0FBQyxDQUFBO0FBQ2xDLHlCQUF3QixhQUFhLENBQUMsQ0FBQTtBQUV0QztJQUFtQyxpQ0FBNEI7SUFJM0Q7UUFDRSxpQkFBTyxDQUFDO1FBQ1IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVhLCtCQUFpQixHQUEvQixVQUFnQyxFQUFXO1FBQ25DLEVBQUcsQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRWMsMEJBQVksR0FBM0IsVUFBNEIsSUFBYTtRQUN2QyxJQUFJLE1BQU0sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxXQUFXLEdBQVMsSUFBSyxDQUFDLGNBQWMsQ0FBQztRQUNoRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwyQ0FBMkM7SUFDcEMsZ0RBQXdCLEdBQS9CLFVBQWdDLElBQTRCLEVBQUUsR0FBVztRQUN2RSxJQUFNLFlBQVksR0FBa0MsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBa0IsQ0FBQztRQUM1RixZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxpQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0scUNBQWEsR0FBcEIsVUFBcUIsSUFBNEIsRUFBRSxHQUFXLEVBQUUsT0FBZ0M7UUFDOUYsZ0JBQUssQ0FBQyxhQUFhLFlBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN4QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxrQkFBTyxDQUFDLGVBQWUsQ0FBQyxrQkFBTyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFHLENBQUM7SUFDSCxDQUFDO0lBRU0sc0NBQWMsR0FBckIsVUFBc0IsSUFBNEIsRUFBRSxHQUFXO1FBQzdELGdCQUFLLENBQUMsY0FBYyxZQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3QyxDQUFDO0lBQ0gsQ0FBQztJQUVNLHVDQUFlLEdBQXRCO1FBQ0UsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxnQkFBSyxDQUFDLGVBQWUsWUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNoRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDaEYsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsZ0JBQUssQ0FBQyxlQUFlLFlBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLENBQUMsY0FBYyxFQUFFLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxZQUFZLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUMxSCxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUE5REQsQ0FBbUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBOEQ5RDtBQTlEWSxxQkFBYSxnQkE4RHpCLENBQUEifQ==