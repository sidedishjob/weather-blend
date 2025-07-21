import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Cloud, Sparkles, Mail, Phone, MapPin, Send, MessageCircle, HelpCircle, Bug } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold text-blue-900">お問い合わせ</h1>
          </div>
          <p className="text-xl lg:text-2xl text-blue-800 max-w-3xl mx-auto">
            WeatherBlendに関するご質問やご要望をお聞かせください
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* お問い合わせフォーム */}
          <Card className="bg-white/90 backdrop-blur-xl border-blue-300/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-900">
                <MessageCircle className="w-6 h-6" />
                <span>お問い合わせフォーム</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-800">お名前</label>
                  <Input 
                    placeholder="山田太郎" 
                    className="bg-white/80 border-blue-300/60 focus:border-blue-500/80"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-800">メールアドレス</label>
                  <Input 
                    type="email" 
                    placeholder="example@email.com" 
                    className="bg-white/80 border-blue-300/60 focus:border-blue-500/80"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-800">お問い合わせ種別</label>
                <select className="w-full h-10 px-3 py-2 bg-white/80 border border-blue-300/60 rounded-md focus:border-blue-500/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-blue-900">
                  <option value="">選択してください</option>
                  <option value="general">一般的なお問い合わせ</option>
                  <option value="bug">バグ報告</option>
                  <option value="feature">機能要望</option>
                  <option value="business">ビジネス関連</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-800">メッセージ</label>
                <textarea 
                  rows={6}
                  placeholder="お問い合わせ内容をご記入ください..."
                  className="w-full px-3 py-2 bg-white/80 border border-blue-300/60 rounded-md focus:border-blue-500/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-blue-900 resize-none"
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white py-3 shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                <Send className="w-4 h-4 mr-2" />
                送信する
              </Button>
            </CardContent>
          </Card>

          {/* よくある質問 */}
          <Card className="bg-white/90 backdrop-blur-xl border-blue-300/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-900">
                <HelpCircle className="w-6 h-6" />
                <span>よくある質問</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Q. WeatherBlendの予報はどのくらい正確ですか？</h4>
                  <p className="text-blue-700">
                    複数の気象データを統合することで、単一の予報よりも高い精度を実現しています。
                    信頼度も表示されるため、予報の確実性を判断できます。
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Q. 利用料金はかかりますか？</h4>
                  <p className="text-blue-700">
                    基本的な天気予報機能は無料でご利用いただけます。
                    将来的にプレミアム機能を追加する可能性がありますが、現在は全て無料です。
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Q. 対応地域はどこまでですか？</h4>
                  <p className="text-blue-700">
                    現在は日本全国の主要都市に対応しています。
                    今後、より詳細な地域や海外都市への対応も検討しています。
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Q. データの更新頻度はどのくらいですか？</h4>
                  <p className="text-blue-700">
                    気象データは1時間ごとに更新され、常に最新の情報を提供しています。
                    緊急時には更に頻繁に更新される場合があります。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 連絡先情報 */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/85 backdrop-blur-xl border-blue-300/50 hover:bg-white/95 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-blue-900">メール</h3>
                <p className="text-blue-700 text-sm">
                  support@weatherblend.com
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/85 backdrop-blur-xl border-blue-300/50 hover:bg-white/95 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-blue-900">電話</h3>
                <p className="text-blue-700 text-sm">
                  03-1234-5678<br />
                  <span className="text-xs">平日 9:00-18:00</span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/85 backdrop-blur-xl border-blue-300/50 hover:bg-white/95 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Bug className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-blue-900">バグ報告</h3>
                <p className="text-blue-700 text-sm">
                  bugs@weatherblend.com
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
    </div>
  )
}