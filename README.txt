RabiVie 花言葉診断 Ver.8

【開き方】
index.html をブラウザで開いてください。診断の質問・採点処理は Ver.7 のままです。

【今回追加した画像】
images/rabivie-logo.jpg : トップの丸いロゴ（ご提供画像1枚目）
images/flower-language-hero.jpg : トップの10色のお花（ご提供画像2枚目）

【画像・リンクの編集】
config.js を VS Code で開きます。
logo / heroImage : トップの画像パス
flowerImages : 花の種類別の商品画像（例: "カーネーション": "images/carnation.jpg"）
colorImages : 花と色ごとの画像（例: "カーネーション|グリーン": "images/carnation-green.jpg"）
singleFlowerUrls : 花の種類ごとのBASE商品ページURL
fullOrderUrl : フルオーダー案内ページURL
fallbackShopUrl : 個別URLが空欄のときの一覧ページURL

※ 個別商品URLの正しさは公開前に必ずBASEで確認してください。
※ 商品画像は未登録なので、結果画面には仮の花マークが表示されます。
※ 花の色ごとに異なる商品URLが必要になった場合は、追加実装が必要です。

Ver.9: 診断結果の画像72枚を組み込みました。
・基本の6種×10色は config.js の colorImages に設定済み。
・季節の12種は flowerImages に設定済み（診断対象外のまま）。
・誤登録のUUID名の画像1枚は含めていません。
・商品リンクは config.js の singleFlowerUrls / fullOrderUrl を編集してください。
・診断内容、採点、結果文章はVer.8から変更していません。
