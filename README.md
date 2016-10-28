# nativescript-webview-custom-header

This is the example implementing custom headers for WebView requests.

(I used [alexziskind1/nativescript-oauth](https://github.com/alexziskind1/nativescript-oauth) as reference).

## Structure

```
├── dist // built files
├── index.d.ts // type definition
├── index.ios.ts
├── index.android.js
└── sample // sample application
```

## Sample App

```
cd sample
tns install
tns platform add [ios | android]
tns run [ios | android]
```

Now, you can see your customized headers using Safari on iOS, Chrome on Android.
