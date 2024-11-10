'use client'

import { useEffect, useRef, useState } from 'react'
import { Github, Mail } from 'lucide-react'

export default function PersonalWebsite() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [text, setText] = useState('')
  const fullText = "Hi, I'm Creeper. Welcome to my website!"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Star {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2
        this.speedX = -Math.random() * 3
        this.speedY = Math.random() * 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0) {
          this.x = canvas.width
          this.y = Math.random() * canvas.height
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const stars = Array.from({ length: 100 }, () => new Star())

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach((star) => {
        star.update()
        star.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (text.length < fullText.length) {
      const timer = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1))
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [text, fullText])

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <header className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            苦力怕Creeper
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl max-w-2xl mx-auto px-4 h-20 flex items-center justify-center">
            {text}
            <span className="animate-blink">|</span>
          </p>
        </header>
        <div className="mt-12 flex justify-center space-x-8">
          <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
            <span className="sr-only">Github</span>
            <Github className="h-10 w-10" />
          </a>
          <a href="mailto:your.email@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-200">
            <span className="sr-only">Email</span>
            <Mail className="h-10 w-10" />
          </a>
        </div>
      </div>
    </div>
  )
}