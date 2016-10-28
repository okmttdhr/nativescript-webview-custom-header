import {Component, ViewChild, ElementRef} from "@angular/core";
import { Page } from "ui/page";
import { WebView } from "ui/web-view";
import { GridLayout } from "ui/layouts/grid-layout";
import { WebViewHelper } from "nativescript-webview-custom-header";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
  @ViewChild("gridlayout") gridlayoutRef: ElementRef;
  private gridlayout: GridLayout;
  private webview: WebView;
  constructor(page: Page) {
    page.actionBarHidden = true;
  }
  ngOnInit() {
    this.webview = new WebView();
    this.webview.id = "webview";
    this.webview.src = "https://docs.nativescript.org/";
    WebViewHelper.initWithIntercept(this.webview);

    this.gridlayout = this.gridlayoutRef.nativeElement;
    this.gridlayout.addChild(this.webview);
  }
}
