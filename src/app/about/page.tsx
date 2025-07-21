import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, Sparkles, TrendingUp, Database, Zap, Users, Target, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300/30 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-sky-300/20 via-transparent to-transparent"></div>
      
      {/* 浮遊する装飾要素 */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500/60 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-sky-600/70 rounded-full animate-ping"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400/50 rounded-full animate-bounce"></div>

      <div className="container mx-auto px-4 py-8 lg:py-12 relative z-10">
        {/* ヘッダー */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Cloud className="w-12 h-12 text-blue-700" />
              <Sparkles className="w-6 h-6 text-sky-600 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-blue-900">WeatherBlend</h1>
          </div>
          <p className="text-xl lg:text-2xl text-blue-800 max-w-3xl mx-auto">
            複数の天気予報をブレンドして、最適な予報をお届けします
          </p>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-6xl mx-auto space-y-8">
          {/* サービス概要 */}
          <Card className="bg-white/90 backdrop-blur-xl border-blue-300/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-900">
                <Target className="w-6 h-6" />
                <span>WeatherBlendとは</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-blue-800">
              <p className="text-lg leading-relaxed">
                WeatherBlendは、気象庁とYahoo!天気の予報データを統合し、より精度の高い天気予報を提供するサービスです。
                複数の情報源からのデータを独自のアルゴリズムで分析・統合することで、単一の予報よりも信頼性の高い情報をお届けします。
              </p>
              <p className="leading-relaxed">
                従来の天気予報サービスでは、一つの情報源に依存していたため、予報の精度にばらつきがありました。
                WeatherBlendでは、複数の予報を比較・統合することで、より確実な天気情報を提供し、
                あなたの日常生活や外出計画をサポートします。
              </p>
            </CardContent>
          </Card>

          {/* 特徴 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/85 backdrop-blur-xl border-blue-300/50 hover:bg-white/95 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full flex items-center justify-center">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900">複数データ統合</h3>
                <p className="text-blue-700">
                  気象庁とYahoo!天気のデータを統合し、より精度の高い予報を生成
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/85 backdrop-blur-xl border-blue-300/50 hover:bg-white/95 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900">信頼度表示</h3>
                <p className="text-blue-700">
                  予報の信頼度を数値で表示し、情報の確実性を可視化
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/85 backdrop-blur-xl border-blue-300/50 hover:bg-white/95 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900">リアルタイム更新</h3>
                <p className="text-blue-700">
                  最新の気象データを常に取得し、リアルタイムで予報を更新
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 技術情報 */}
          <Card className="bg-white/90 backdrop-blur-xl border-blue-300/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-900">
                <Award className="w-6 h-6" />
                <span>技術的特徴</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-blue-800">データ統合アルゴリズム</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>複数の気象データソースを重み付け平均で統合</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>過去の予報精度を学習して重み調整</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>地域特性を考慮した補正処理</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-blue-800">ユーザー体験</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>直感的で美しいユーザーインターフェース</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>レスポンシブデザインでモバイル対応</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>天気に応じた動的背景アニメーション</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* チーム情報 */}
          <Card className="bg-white/90 backdrop-blur-xl border-blue-300/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-900">
                <Users className="w-6 h-6" />
                <span>開発チーム</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-800">
              <p className="leading-relaxed">
                WeatherBlendは、気象学の専門知識とソフトウェア開発の技術を組み合わせた
                専門チームによって開発されています。より正確で使いやすい天気予報サービスの
                提供を目指し、継続的な改善と機能追加を行っています。
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 戻るボタン */}
        <div className="text-center mt-12">
          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white px-8 py-3 text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              天気予報を見る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}