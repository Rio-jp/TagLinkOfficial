"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FolderIcon,
  TagIcon,
  SearchIcon,
  EyeIcon,
  ArrowUpDownIcon,
  DownloadIcon,
  ChevronDownIcon,
  StarIcon,
  ZapIcon,
  ShieldIcon,
} from "lucide-react"

export default function TagLinkPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      observerRef.current?.disconnect()
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }

  const getCardTransform = (index: number) => {
    if (typeof window === "undefined") {
      return `perspective(1000px) translateZ(${Math.sin(scrollY * 0.01 + index) * 10}px)`
    }
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const rotateX = (mousePosition.y - centerY) / 50
    const rotateY = (mousePosition.x - centerX) / 50
    const translateZ = Math.sin(scrollY * 0.01 + index) * 10

    return `perspective(1000px) rotateX(${rotateX * 0.1}deg) rotateY(${rotateY * 0.1}deg) translateZ(${translateZ}px)`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 px-4">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary), 0.1) 0%, transparent 50%)`,
          }}
        />
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="mb-8 flex justify-center">
              <div
                className="h-24 w-24 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                style={{
                  transform: `${getCardTransform(0)} scale(1.05)`,
                  boxShadow:
                    typeof window !== "undefined"
                      ? `${(mousePosition.x - window.innerWidth / 2) / 50}px ${(mousePosition.y - window.innerHeight / 2) / 50}px 20px rgba(0,0,0,0.1)`
                      : "none",
                }}
              >
                <img src="/icon.png" alt="TagLink アプリアイコン" className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TagLink
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto">
              フォルダとタグで、お気に入りのURLを効率的に管理する
              <br />
              <span className="text-primary font-semibold">デスクトップアプリケーション</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={scrollToFeatures}
              >
                機能を見る
                <ChevronDownIcon className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary/5 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
                asChild
              >
                <a href="https://booth.pm/ja/items/YOUR_BOOTH_ID" target="_blank" rel="noopener noreferrer">
                  <DownloadIcon className="mr-2 h-5 w-5" />
                  Boothで購入
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">価格: ¥500（税込）</p>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl mt-16 animate-on-scroll">
          <div
            className="relative transition-transform duration-500"
            style={{
              transform: `${getCardTransform(1)} translateY(${scrollY * 0.2}px)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
            <img
              src="/screenshot.png"
              alt="TagLink アプリケーション画面"
              className="w-full rounded-lg shadow-2xl border border-border hover:shadow-3xl transition-shadow duration-500"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">なぜTagLinkを選ぶのか？</h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              URLの管理を革新する6つの強力な機能で、あなたの生産性を向上させます
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FolderIcon,
                title: "階層フォルダ管理",
                description: "直感的な階層構造でURLを分類・整理。プロジェクトごと、カテゴリごとに自由に管理できます。",
                color: "text-primary",
              },
              {
                icon: TagIcon,
                title: "柔軟なタグ付け",
                description:
                  "複数のタグを付けて横断的な検索を実現。フォルダを超えた関連性でURLをグルーピングできます。",
                color: "text-accent",
              },
              {
                icon: EyeIcon,
                title: "ライブプレビュー",
                description: "アプリ内でウェブサイトを直接プレビュー表示。外部ブラウザを開かずに内容を確認できます。",
                color: "text-chart-3",
              },
              {
                icon: SearchIcon,
                title: "強力な検索機能",
                description: "タイトル、URL、メモ、タグなど、あらゆる情報から目的のURLを瞬時に見つけ出します。",
                color: "text-chart-2",
              },
              {
                icon: ArrowUpDownIcon,
                title: "ドラッグ＆ドロップ",
                description:
                  "URLやフォルダを直感的にドラッグ＆ドロップで移動・並び替え。思い通りの整理が簡単にできます。",
                color: "text-chart-4",
              },
              {
                icon: DownloadIcon,
                title: "インポート/エクスポート",
                description:
                  "ブラウザのブックマークをインポートしたり、データをエクスポートして他の環境でも利用できます。",
                color: "text-chart-5",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="animate-on-scroll hover:shadow-lg transition-all duration-500 border-border/50 hover:border-primary/20 group cursor-pointer"
                style={{
                  transform: getCardTransform(index + 2),
                  transformStyle: "preserve-3d",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `${getCardTransform(index + 2)} scale(1.05) rotateY(5deg)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = getCardTransform(index + 2)
                }}
              >
                <CardHeader>
                  <div
                    className={`h-12 w-12 rounded-lg bg-card flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-balance">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">TagLinkがもたらす価値</h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              単なるブックマーク管理を超えた、新しいURL管理体験
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ZapIcon,
                title: "生産性の向上",
                description: "必要なURLを瞬時に見つけ出し、作業効率を大幅に改善します。",
                stats: "検索時間を90%短縮",
              },
              {
                icon: StarIcon,
                title: "整理された環境",
                description: "散らかったブックマークから解放され、クリーンな作業環境を実現します。",
                stats: "管理効率3倍向上",
              },
              {
                icon: ShieldIcon,
                title: "データの安全性",
                description: "ローカルストレージでデータを保護し、プライバシーを確保します。",
                stats: "100%プライベート",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="text-center animate-on-scroll group cursor-pointer transition-transform duration-500 hover:scale-105"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.01 + index) * 5}px)`,
                }}
              >
                <div
                  className={`h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110`}
                >
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-balance">{benefit.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{benefit.description}</p>
                <Badge
                  variant="secondary"
                  className="text-sm font-semibold group-hover:scale-105 transition-transform duration-300"
                >
                  {benefit.stats}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">今すぐTagLinkを始めよう</h2>
            <p className="text-xl mb-8 text-balance opacity-90 max-w-2xl mx-auto">
              URL管理の新しいスタンダードを体験してください。 あなたの生産性を次のレベルへ押し上げます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                asChild
              >
                <a href="https://booth.pm/ja/items/YOUR_BOOTH_ID" target="_blank" rel="noopener noreferrer">
                  <DownloadIcon className="mr-2 h-5 w-5" />
                  Boothで購入 - ¥500
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-white text-white hover:bg-white/10 bg-transparent transition-all duration-300 hover:scale-105"
                onClick={scrollToFeatures}
              >
                詳細を見る
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card/50 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                <img src="/icon.png" alt="TagLink" className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-primary">TagLink</span>
            </div>
            <div className="text-sm text-muted-foreground">© 2024 TagLink. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
