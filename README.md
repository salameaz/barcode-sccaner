# Barcode Scanner Web App

This is a simple, client-side web application for scanning barcodes using your device's camera. It stores scanned codes locally in your browser's `localStorage` and provides options to manage and export your scanned data.

## Use Case

This app is ideal for personal use or small-scale inventory management where a simple, free, and offline-capable barcode scanning solution is needed.

-**Personal Inventory:** Quickly scan items around your home to create a digital list.

-**Small Business Stock Check:** Keep track of incoming or outgoing products without complex software.


## Features

- Scan barcodes using [`html5-qrcode`](https://github.com/mebjas/html5-qrcode).
- Select from available cameras.
- Store scanned codes in `localStorage`.
- Download scanned codes as JSON.
- Copy scanned codes to clipboard.
- Delete individual scanned codes.

## Deployment

This application is a static HTML, CSS, and JavaScript file, making it easy to deploy. You can host it on **GitHub Pages**. Simply upload the `index.html` file and the necessary `html5-qrcode` library will be loaded from a CDN.
