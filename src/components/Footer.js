import React from "react";
import { Box } from "@mui/material"; // Material-UIのBoxコンポーネントをインポート
import { styled } from "@mui/material/styles"; // Material-UIのスタイル付け機能をインポート

// Material-UIのスタイリングを適用したBoxコンポーネントを作成
const FooterBox = styled(Box)({
  width: "100%", // 幅100%
  height: 56, // 高さ56px
  display: "flex", // フレックスレイアウトを使用して要素を並べる
  justifyContent: "center", // 中央寄せ
  alignItems: "center", // 中央寄せ
  color: "#FFF", // テキストカラーを白に設定
  backgroundColor: "#1976d2", // 背景色を青に設定
  position: "fixed", // 固定位置に配置
  bottom: 0, // 画面下部に配置
  fontWeight: "bold", // 太字のフォント
  fontSize: "22px", // フォントサイズ22px
});

// Footerコンポーネントの定義
const Footer = () => {
  return <FooterBox>copyright こーら</FooterBox>; // コピーライトを含んだFooterBoxを返す
};

export default Footer; // Footerコンポーネントをエクスポートする

// このコードは、Material-UIのBoxコンポーネントを使用してフッターを作成しています。
// styledを使用してFooterBoxというスタイル付きのBoxコンポーネントを作成し、
// フッターのデザインを指定しています。そして、
// Footerコンポーネント内でこのスタイル付きのBoxコンポーネントを使用して、
// コピーライトを含んだフッターをレンダリングしています。
