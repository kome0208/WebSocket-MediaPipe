# WebSocket + MediaPipe Hand Tracking Art

## 日本語

このプロジェクトは、MediaPipe の手のトラッキングデータを利用し、p5.js でインタラクティブなデジタルアートを簡単に体験できるコードセットです。

### セットアップ

1. リポジトリをクローン：
   git clone <repository_url>

2. 依存関係をインストール：
   npm install

3. アプリを起動：
   npm start

注意事項

カメラを利用するため、HTTPS でのアクセスが必要です。

無料プランの ngrok を利用すると HTTPS 環境を簡単に作れます。

同じ LAN 内であれば、WebSocket を介して別端末からもアクセス可能です。

WSL2 上では動作しない場合があります。Windows PowerShell での動作を確認しています。

## English
This project is a simple code set that uses hand-tracking data from MediaPipe and renders it in p5.js to create interactive digital art.

Setup

①Clone this repository:

git clone <repository_url>

②Install dependencies:

npm install

③Start the application:

npm start

Notes / Requirements

The application uses your camera, so it must be served over HTTPS.

You can use ngrok free plan to easily create an HTTPS environment.

WebSocket allows access from other devices on the same LAN.

Running in WSL2 may not work properly. Tested with Windows PowerShell.
