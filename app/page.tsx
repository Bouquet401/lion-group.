"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Phone, Mail, MapPin, ExternalLink, Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { TikTok } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const tabsRef = useRef<HTMLDivElement>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")

      let currentSection = "hero"
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop <= 100) {
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const handleTabClick = (tabValue: string) => {
    // まずスクロールして店舗情報セクションに移動
    const storesSection = document.getElementById("stores")
    if (storesSection) {
      // スムーズスクロールではなく即座に移動して、その後タブを選択
      storesSection.scrollIntoView({ behavior: "auto" })

      // スクロール後すぐにタブを選択
      setTimeout(() => {
        if (tabsRef.current) {
          const tabTrigger = tabsRef.current.querySelector(`[data-value="${tabValue}"]`) as HTMLButtonElement
          if (tabTrigger) {
            tabTrigger.click()

            // タブが選択された後、少し上にスクロールして見やすくする
            window.scrollBy(0, -80)
          }
        }
      }, 100) // タイミングを短くして確実に実行
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const age = formData.get("age") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const position = formData.get("position") as string
    const message = formData.get("message") as string

    // 簡易的なバリデーション
    if (!name || !email || !phone || !position) {
      setFormError("必須項目を入力してください")
      return
    }

    try {
      // メール送信のためのAPIエンドポイントを呼び出す代わりに、
      // mailto:リンクを使用してメールクライアントを開く
      const subject = encodeURIComponent(`求人応募: ${position}`)
      const body = encodeURIComponent(
        `名前: ${name}\n年齢: ${age}\nメール: ${email}\n電話番号: ${phone}\n希望職種: ${position}\nメッセージ:\n${message}`,
      )

      window.location.href = `mailto:lgokinawa25@gmail.com?subject=${subject}&body=${body}`

      // フォームをリセット
      e.currentTarget.reset()
      setFormSubmitted(true)
    } catch (error) {
      setFormError("送信中にエラーが発生しました。後でもう一度お試しください。")
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header - 背景を白に変更 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="h-10 w-auto mr-3">
              <Image src="/images/new-logo.png" alt="LION GROUP" width={100} height={40} className="h-full w-auto" />
            </div>
            {/* LionGroupのテキストをより太く */}
            <h1 className="text-2xl font-black tracking-tight font-sans">Lion Group</h1>
          </motion.div>

          <nav
            className={cn(
              "fixed md:relative top-0 right-0 h-screen md:h-auto w-full md:w-auto bg-white md:bg-transparent z-50 transition-transform duration-300 ease-in-out",
              "md:translate-x-0 md:opacity-100 md:pointer-events-auto",
              isMenuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
            )}
          >
            <div className="flex md:hidden justify-end p-4">
              <button onClick={closeMenu} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="flex flex-col md:flex-row items-center justify-center h-full md:h-auto space-y-8 md:space-y-0 md:space-x-8">
              <li>
                <a
                  href="#philosophy"
                  onClick={closeMenu}
                  className={cn(
                    "text-lg md:text-base hover:text-gray-600 transition-colors relative",
                    activeSection === "philosophy" && "font-medium",
                  )}
                >
                  会社理念
                  {activeSection === "philosophy" && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                    />
                  )}
                </a>
              </li>
              <li>
                <a
                  href="#message"
                  onClick={closeMenu}
                  className={cn(
                    "text-lg md:text-base hover:text-gray-600 transition-colors relative",
                    activeSection === "message" && "font-medium",
                  )}
                >
                  代表挨拶
                  {activeSection === "message" && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                    />
                  )}
                </a>
              </li>
              <li>
                <a
                  href="#stores"
                  onClick={closeMenu}
                  className={cn(
                    "text-lg md:text-base hover:text-gray-600 transition-colors relative",
                    activeSection === "stores" && "font-medium",
                  )}
                >
                  店舗情報
                  {activeSection === "stores" && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                    />
                  )}
                </a>
              </li>
              <li>
                <a
                  href="#recruitment"
                  onClick={closeMenu}
                  className={cn(
                    "text-lg md:text-base hover:text-gray-600 transition-colors relative",
                    activeSection === "recruitment" && "font-medium",
                  )}
                >
                  求人情報
                  {activeSection === "recruitment" && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                    />
                  )}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className={cn(
                    "text-lg md:text-base hover:text-gray-600 transition-colors relative",
                    activeSection === "contact" && "font-medium",
                  )}
                >
                  お問い合わせ
                  {activeSection === "contact" && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                    />
                  )}
                </a>
              </li>
            </ul>
          </nav>

          <button onClick={toggleMenu} className="md:hidden z-50" aria-label="Toggle menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Hero Section - 背景画像を変更 */}
      <section id="hero" className="relative h-screen">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="absolute inset-0">
          <Image src="/images/hero-bg-new.png" alt="スタッフ集合写真" fill className="object-cover" priority />
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">最大限の楽しさを非日常空間で</h2>
            <div className="max-w-2xl space-y-6">
              {/* フォントサイズを小さくする */}
              <p className="text-base md:text-lg">
                那覇市松山を中心に、シーシャBAR、CONCEPT BAR、サパー、
                <br />
                会員制BAR、ガールズバー、夜カフェなど7店舗を運営。
              </p>
              <p className="text-base md:text-lg">
                平均年齢22歳の若手グループが、
                <br />
                最大限の楽しさを感じる非日常空間を作り上げています。
              </p>
              <p className="text-base md:text-lg">
                日頃の疲れを吹き飛ばす居心地の良い空間で、
                <br />
                全てのお客様に快適なひとときを。
              </p>
            </div>
            <div className="mt-10">
              <Button asChild size="lg" className="rounded-full px-8 bg-white text-black hover:bg-white/90">
                <a href="#stores">店舗を見る</a>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <a href="#philosophy" className="flex flex-col items-center text-white">
              <span className="text-sm mb-2">Scroll</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 5L12 19M12 19L19 12M12 19L5 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-12 inline-block relative">
              会社理念
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-black"></span>
            </h2>
            <p className="text-2xl font-medium mb-8">
              「デジタル化が進む現代だからこそ、
              <br className="hidden md:block" />
              人と人とのつながりを大切にした社交場を提供する」
            </p>
            <div className="space-y-6 text-lg">
              <p>
                テクノロジーの進化で身の回りがデジタル化されており、人との関係が希薄になっている時代。
                だからこそ、僕らは人と人のつながりを大切にしております。
              </p>
              <p>
                人と人がつながる社交場を作っていく。お客様の笑顔、スタッフの笑顔、だけじゃなく、全ての人を笑顔に。そして快適に。
                そして非日常現実を。そんな社交場空間を作り上げていく。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto"
          >
            <div className="text-center md:text-left">
              <h3 className="text-6xl font-bold mb-8 tracking-tighter">Lion Group</h3>
              <div className="text-2xl font-light tracking-wide">
                <p>ESTABLISHED 2025</p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/company-logo.png"
                alt="リオングループロゴ"
                fill
                className="object-contain bg-white p-4"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CEO Message */}
      <section id="message" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center inline-block relative">
              代表挨拶
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-black"></span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-8 text-center">「人材は人財である」</h3>
              <div className="space-y-6 text-lg">
                <p>
                  人材不足の時代の中、リオングループには約60名のスタッフがいます。
                  リオングループはZ世代と言われる若手メンバーです。
                </p>
                <p>
                  学生時代にコロナでの学校封鎖やオンライン授業、体育祭や学園祭、卒業式の中止などを経験したメンバーが多く、学生時代は、人とのつながりがあまり多くなかった。
                </p>
                <p>
                  また、僕らは、インターネットが普及し、SNSがあたりまえに生き、画面越しで人と関わる時代を生きてきております。
                </p>
                <p>だからこそ、アナログの人と人がつながる社交場に価値があると思います。</p>
                <p>
                  スタッフ1人1人が、今の若者とは思えない程、やる気に満ち溢れており、人との繋がりを楽しく思ってます。
                </p>
                <p>
                  僕はこれからも、スタッフだけではなく周りの若者達に、普通じゃ見れない景色を見せていきたいとおもってます。
                </p>
                <p>若者の知らない「楽しい」を僕が伝えていきます。</p>
                <div className="mt-12 text-right">
                  <p>CEO Rikiya Nakandakari</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stores Section */}
      <section id="stores" className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center inline-block relative">
              店舗情報
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-white"></span>
            </h2>

            <Tabs defaultValue="neos" className="max-w-5xl mx-auto" ref={tabsRef}>
              <TabsList className="grid grid-cols-7 mb-8 bg-transparent">
                <TabsTrigger value="neos" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Neos
                </TabsTrigger>
                <TabsTrigger value="ruby" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Ruby
                </TabsTrigger>
                <TabsTrigger value="piace" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  PIACE
                </TabsTrigger>
                <TabsTrigger value="best" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  BH
                </TabsTrigger>
                <TabsTrigger value="leone" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Leone
                </TabsTrigger>
                <TabsTrigger value="shisha" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  白煙
                </TabsTrigger>
                <TabsTrigger value="fratto" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  ふらっと
                </TabsTrigger>
              </TabsList>

              {/* NEOS */}
              <TabsContent value="neos" className="mt-0">
                <Card className="border-0 bg-transparent">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-3xl font-bold mb-6">CONCEPT BAR Neos</h3>
                        <div className="space-y-6 mb-8">
                          <div className="flex items-start">
                            <MapPin className="mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                            <p className="text-white">
                              〒900-0032
                              <br />
                              那覇市松山2丁目1-15 松山RJビル403
                            </p>
                          </div>
                          <div>
                            <p className="text-white mb-1">収容人数</p>
                            <p className="text-white">BOX席 4 カウンター席 6 最大収容人数 40名</p>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <Button
                            asChild
                            className="bg-white text-black hover:bg-black hover:text-white border border-white"
                          >
                            <Link
                              href="https://www.instagram.com/neos_okinawa?igsh=dWd6cWk3eXR2eHN4"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Instagram className="mr-2 h-5 w-5" />
                              <span>Instagram</span>
                            </Link>
                          </Button>
                          <Button
                            asChild
                            className="bg-white text-black hover:bg-black hover:text-white border border-white"
                          >
                            <Link
                              href="https://www.tiktok.com/@neos_okinawa?_t=ZS-8v56OYFjMtL&_r=1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <TikTok className="mr-2 h-5 w-5" />
                              <span>TikTok</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/neos-1.png"
                            alt="NEOS ロゴ"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/neos-2.png"
                            alt="NEOS スタッフ"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/neos-3.png"
                            alt="NEOS 店内"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/neos-4.png"
                            alt="NEOS カウンター"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* RUBY */}
              <TabsContent value="ruby" className="mt-0">
                <Card className="border-0 bg-transparent">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-3xl font-bold mb-6">Girl's Bar -Ruby-</h3>
                        <div className="space-y-6 mb-8">
                          <div className="flex items-start">
                            <MapPin className="mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                            <p className="text-white">
                              〒900-0006
                              <br />
                              沖縄県那覇市おもろまち4丁目17-14 クイーンヒルズ3-A
                            </p>
                          </div>
                          <div>
                            <p className="text-white mb-1">収容人数</p>
                            <p className="text-white">BOX席 3 カウンター席 5 最大収容人数 25名</p>
                          </div>
                          <div>
                            <p className="text-white mb-1">特徴</p>
                            <p className="text-white">カラオケあり</p>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <Button
                            asChild
                            className="bg-white text-black hover:bg-black hover:text-white border border-white"
                          >
                            <Link
                              href="https://www.instagram.com/ruby.girlsbar?igsh=MXJqczZsZDdjeXNwcA=="
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Instagram className="mr-2 h-5 w-5" />
                              <span>Instagram</span>
                            </Link>
                          </Button>
                          <Button
                            asChild
                            className="bg-white text-black hover:bg-black hover:text-white border border-white"
                          >
                            <Link
                              href="https://www.tiktok.com/@ruby_okinawa?_t=ZS-8v56KhNkTzk&_r=1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <TikTok className="mr-2 h-5 w-5" />
                              <span>TikTok</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/ruby-1.png"
                            alt="Ruby ロゴ"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/ruby-2.png"
                            alt="Ruby スタッフ"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/ruby-3.png"
                            alt="Ruby 店内"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/ruby-4.png"
                            alt="Ruby カウンター"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* PIACE - 余分な画像枠を非表示に */}
              <TabsContent value="piace" className="mt-0">
                <Card className="border-0 bg-transparent">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-3xl font-bold mb-6">BAR PIACE</h3>
                        <div className="space-y-6 mb-8">
                          <div className="flex items-start">
                            <MapPin className="mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                            <p className="text-white">
                              〒900-0032
                              <br />
                              沖縄県那覇市松山1丁目28-11 1階
                            </p>
                          </div>
                          <div>
                            <p className="text-white mb-1">収容人数</p>
                            <p className="text-white">BOX席 4つ カウンター席 7つ 最大収容人数 50名</p>
                          </div>
                          <div>
                            <p className="text-white mb-1">特徴</p>
                            <p className="text-white">カラオケ、ダーツあり</p>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <Button
                            asChild
                            className="bg-white text-black hover:bg-black hover:text-white border border-white"
                          >
                            <Link
                              href="https://www.instagram.com/piace_okinawa?igsh=NHNxZ3M3cHh6amF1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Instagram className="mr-2 h-5 w-5" />
                              <span>Instagram</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/piace-1.png"
                            alt="PIACE ロゴ"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/piace-2.png"
                            alt="PIACE スタッフ"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/piace-3.jpg"
                            alt="PIACE 外観"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/piace-4.jpg"
                            alt="PIACE 店内"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* BEST HOUSE */}
              <TabsContent value="best" className="mt-0">
                <Card className="border-0 bg-transparent">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-3xl font-bold mb-6">BEST HOUSE</h3>
                        <div className="space-y-6 mb-8">
                          <div className="flex items-start">
                            <MapPin className="mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                            <p className="text-white">
                              〒900-0032
                              <br />
                              沖縄県那覇市松山2丁目16-1 キングスアレイ松山2階A号室
                            </p>
                          </div>
                          <div>
                            <p className="text-white mb-1">収容人数</p>
                            <p className="text-white">BOX席 3つ カウンター 4つ</p>
                          </div>
                          <div>
                            <p className="text-white mb-1">特徴</p>
                            <p className="text-white">カラオケ、ダーツあり</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/best-1.png"
                            alt="BEST HOUSE ロゴ"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/best-2.png"
                            alt="BEST HOUSE 内装"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/best-3.png"
                            alt="BEST HOUSE カウンター"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/best-4.png"
                            alt="BEST HOUSE 店内"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* LEONE - 画像枠を追加 */}
              <TabsContent value="leone" className="mt-0">
                <Card className="border-0 bg-transparent">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-3xl font-bold mb-6">SERENITY BAR Leone (レオーネ)</h3>
                        <div className="space-y-6 mb-8">
                          <div className="flex items-start">
                            <MapPin className="mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                            <p className="text-white">
                              〒900-0032
                              <br />
                              沖縄県那覇市松山1丁目28-11 2階
                            </p>
                          </div>
                          <div>
                            <p className="text-white mb-1">収容人数</p>
                            <p className="text-white">BOX 2つ カウンター 4つ 最大収容人数 20名</p>
                          </div>
                          <div>
                            <p className="text-white mb-1">特徴</p>
                            <p className="text-white">カラオケ、ダーツあり</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/leone-1.png"
                            alt="Leone ロゴ"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/leone-2.jpg"
                            alt="Leone カウンター"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/leone-3.jpg"
                            alt="Leone 店内"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/leone-4.jpg"
                            alt="Leone バックバー"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SHISHA */}
              <TabsContent value="shisha" className="mt-0">
                <Card className="border-0 bg-transparent">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-3xl font-bold mb-6">ShiSha&Bar白煙</h3>
                        <div className="space-y-6 mb-8">
                          <div className="flex items-start">
                            <MapPin className="mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                            <p className="text-white">
                              〒901-1303
                              <br />
                              沖縄県与那原町字与那原3178-4 ハーモニービル503
                            </p>
                          </div>
                          <div>
                            <p className="text-white mb-1">収容人数</p>
                            <p className="text-white">BOX席 4つ カウンター席 4つ 最大収容人数 30名</p>
                          </div>
                          <div>
                            <p className="text-white mb-1">特徴</p>
                            <p className="text-white">与那原初のシーシャBAR</p>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <Button
                            asChild
                            className="bg-white text-black hover:bg-black hover:text-white border border-white"
                          >
                            <Link
                              href="https://www.instagram.com/shisha_hakuen.okinawa?igsh=MWtpemxrdWp0cTZscg=="
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Instagram className="mr-2 h-5 w-5" />
                              <span>Instagram</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/shisha-1.png"
                            alt="白煙 ロゴ"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/shisha-2.png"
                            alt="白煙 案内"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/shisha-3.png"
                            alt="白煙 壁画"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/shisha-4.png"
                            alt="白煙 内装"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* FRATTO */}
              <TabsContent value="fratto" className="mt-0">
                <Card className="border-0 bg-transparent">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-3xl font-bold mb-6">夜カフェ ふらっと</h3>
                        <div className="space-y-6 mb-8">
                          <div className="flex items-start">
                            <MapPin className="mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                            <p className="text-white">
                              〒526-0033
                              <br />
                              滋賀県長浜市平方町588-2
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <Button
                            asChild
                            className="bg-white text-black hover:bg-black hover:text-white border border-white"
                          >
                            <Link
                              href="https://www.instagram.com/fratto_acai_nagahama?igsh=MWd1MnVnMDg5cTV1aA=="
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Instagram className="mr-2 h-5 w-5" />
                              <span>Instagram</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/fratto-1.png"
                            alt="ふらっと ロゴ"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src="/images/fratto-2.png"
                            alt="ふらっと 外観"
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        {/* 残りの2枠は非表示にする */}
                        <div className="hidden"></div>
                        <div className="hidden"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Recruitment Section */}
      <section id="recruitment" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center inline-block relative">
              求人情報
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-black"></span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-4">BARスタッフ/ガールズバーキャスト募集中</h3>
                <p className="text-lg">あなたも私たちのチームに加わりませんか？</p>
              </div>

              {/* 福利厚生セクションを上下配置に変更 */}
              <div className="flex flex-col gap-12 mb-16 items-center">
                <div className="bg-black text-white p-8 rounded-xl max-w-2xl w-full">
                  <h4 className="text-xl font-bold mb-6">福利厚生</h4>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">ホワイトニング</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">脱毛</span>
                    </li>
                  </ul>

                  <div className="mt-8">
                    <p className="text-lg mb-2">若手中心の活気ある職場</p>
                    <p className="text-lg">未経験者歓迎</p>
                  </div>
                </div>

                {/* 背景写真セクションを横に大きく、テキストを変更 */}
                <div className="relative w-full rounded-xl overflow-hidden" style={{ height: "600px" }}>
                  <Image src="/images/staff-photo.png" alt="スタッフ集合写真" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <div className="text-white w-full max-w-4xl px-10 py-6">
                      <p className="text-sm leading-normal">
                        大人になっても、夢をわすれ、努力をわすれ、言い訳を探し、頑張ることをわすれる。
                        <br />
                        <br />
                        大人になって、そんなに頑張らなくたってそこそこ満足して生きていく事はできる。
                        <br />
                        <br />
                        でも、頑張らないと得られないもの。頑張ったからこそ得られる、沢山の感情がある。
                        <br />
                        <br />
                        頑張ったからこそ　悔しくて頑張ったからこそ　嬉しくて頑張ったからこそ　涙が溢れる。
                        <br />
                        <br />
                        そんな瞬間が何度もあった。夜職は世間的にも評価が低い。でも、とてもやりがいのある志事。
                        <br />
                        <br />
                        年齢は関係ない。学生だろうが、大人だろうが、関係ない。いつだって、何歳だって、本気になった時が青春だ。
                        <br />
                        <br />
                        大人が本気で青春をし、夢を追いかける。
                        <br />
                        <br />
                        そんな僕らと働いてくれる仲間を募集いたします。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black text-white p-8 rounded-xl">
                <h4 className="text-xl font-bold mb-6 text-center">応募フォーム</h4>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium">
                        お名前
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full p-3 border border-gray-700 bg-gray-900 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="age" className="block mb-2 font-medium">
                        年齢
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        className="w-full p-3 border border-gray-700 bg-gray-900 rounded-md text-white"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">
                        メールアドレス
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full p-3 border border-gray-700 bg-gray-900 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-2 font-medium">
                        電話番号
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full p-3 border border-gray-700 bg-gray-900 rounded-md text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="position" className="block mb-2 font-medium">
                      希望職種
                    </label>
                    <select
                      id="position"
                      name="position"
                      required
                      className="w-full p-3 border border-gray-700 bg-gray-900 rounded-md text-white"
                    >
                      <option value="">選択してください</option>
                      <option value="bar-staff">BARスタッフ</option>
                      <option value="girls-bar-cast">ガールズバーキャスト</option>
                      <option value="other">その他</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">
                      メッセージ
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full p-3 border border-gray-700 bg-gray-900 rounded-md text-white"
                    ></textarea>
                  </div>

                  {formError && <div className="text-red-500 text-center">{formError}</div>}

                  {formSubmitted ? (
                    <div className="text-green-400 text-center">
                      送信が完了しました。お問い合わせありがとうございます。
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full bg-white text-black hover:bg-white/90 py-3 rounded-md font-medium"
                    >
                      送信する
                    </Button>
                  )}
                </form>

                <div className="mt-8 text-center">
                  <p className="mb-4">または公式LINEからお問い合わせください</p>
                  <Button asChild className="bg-white text-black hover:bg-black hover:text-white border border-white">
                    <Link
                      href="https://lin.ee/DZ1gYMFL"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3"
                    >
                      <span>公式LINE</span>
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold mb-12 text-center inline-block relative">
              会社情報
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-white"></span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-2">リオングループ</h3>
                <p className="text-xl">運営会社</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-400 mb-1">会社名</p>
                    <p className="text-xl">株式会社LG沖縄</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">所在地</p>
                    <p className="text-xl">〒900-0024 那覇市古波蔵3丁目17番4号 栄アパート303号</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">電話番号</p>
                    <p className="text-xl">080-6483-1633</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">メール</p>
                    <p className="text-xl">lgokinawa25@gmail.com</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-gray-400 mb-1">設立</p>
                    <p className="text-xl">2025年2月</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">業務内容</p>
                    <p className="text-xl">飲食店経営運営、飲食店経営運営コンサル</p>
                  </div>
                  <div className="pt-4">
                    <p className="text-xl font-medium mb-4">店舗経営運営でお悩みの方相談もぜひ。</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        asChild
                        className="bg-white text-black hover:bg-black hover:text-white border border-white"
                      >
                        <Link href="tel:08064831633" className="flex items-center justify-center">
                          <Phone className="mr-2 h-5 w-5" />
                          <span>電話する</span>
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="bg-white text-black hover:bg-black hover:text-white border border-white"
                      >
                        <Link href="mailto:lgokinawa25@gmail.com" className="flex items-center justify-center">
                          <Mail className="mr-2 h-5 w-5" />
                          <span>メールする</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xl mb-6">お気軽にお問い合わせください</p>
                <Button asChild className="bg-white text-black hover:bg-black hover:text-white border border-white">
                  <Link href="https://lin.ee/DZ1gYMFL" target="_blank" rel="noopener noreferrer">
                    公式LINEで問い合わせる
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - 店舗詳細リンクを削除 */}
      <footer className="bg-black text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-8 md:mb-0">
              <h2 className="text-3xl font-bold">Lion Group</h2>
              <p className="mt-2 text-gray-400">最大限の楽しさを非日常空間で</p>
            </div>
            <div className="flex space-x-6">
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <TikTok className="h-6 w-6" />
              </Link>
              <Link
                href="https://lin.ee/DZ1gYMFL"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-4">CONCEPT BAR Neos</h3>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Girl's Bar -Ruby-</h3>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">BAR PIACE</h3>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">BEST HOUSE</h3>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">SERENITY BAR Leone</h3>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">ShiSha&Bar白煙</h3>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">夜カフェ ふらっと</h3>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">お問い合わせ</h3>
              <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                詳細を見る
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">
              &copy; {new Date().getFullYear()} 株式会社LG沖縄. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
