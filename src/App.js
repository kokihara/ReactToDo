import React from "react";
import { AuthProvider } from "./providers/Authprovider"; // 認証プロバイダーをインポート
import "./App.css";
import "./service/firebase"; // Firebaseの設定を読み込む
import Header from "./components/Header"; // ヘッダーコンポーネントをインポート
import Footer from "./components/Footer"; // フッターコンポーネントをインポート
import Dashboard from "./components/Dashboard"; // ダッシュボードコンポーネントをインポート

function App() {
  return (
    // 認証プロバイダーでアプリ全体を包む
    <AuthProvider>
      {/* ヘッダーコンポーネント */}
      <Header />
      {/* ダッシュボードコンポーネント */}
      <Dashboard />
      {/* フッターコンポーネント */}
      <Footer />
    </AuthProvider>
  );
}

export default App;

// このコードは、ReactアプリケーションのエントリーポイントであるAppコンポーネントです。
// AuthProviderでアプリ全体を包んで認証情報を提供しています。
// Header、Dashboard、Footerコンポーネントをレンダリングしてアプリケーションを構築しています。
