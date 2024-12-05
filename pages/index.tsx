"use client"

import React, { useEffect, useRef } from 'react'
import { motion, HTMLMotionProps } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import Link from "next/link"
import { FaJava, FaPython, FaLinux, FaGitAlt, FaDocker } from 'react-icons/fa6'
import { SiCplusplus } from 'react-icons/si'

type MotionDivProps = HTMLMotionProps<"div">;

// Particle Effect Component
const ParticleEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
    }> = []
    const particleCount = 100
    let mouse = { x: 0, y: 0 }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > canvas.width) particle.x = 0
        else if (particle.x < 0) particle.x = canvas.width

        if (particle.y > canvas.height) particle.y = 0
        else if (particle.y < 0) particle.y = canvas.height

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (100 - distance) / 100
          particle.speedX += forceDirectionX * force * 0.6
          particle.speedY += forceDirectionY * force * 0.6
        }
      })
    }

    const animate = () => {
      drawParticles()
      requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />
}

// Main Component
export default function Home() {
  const skills = [
    { icon: <FaJava />, name: "Java" },
    { icon: <FaPython />, name: "Python" },
    { icon: <SiCplusplus />, name: "C++" },
    { icon: <FaLinux />, name: "Linux" },
    { icon: <FaGitAlt />, name: "Git" },
    { icon: <FaDocker />, name: "Docker" },
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const ScrollProgressBar = () => {
    const [scrollProgress, setScrollProgress] = React.useState(0)

    React.useEffect(() => {
      const updateScrollProgress = () => {
        const scrollPx = document.documentElement.scrollTop
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrolled = (scrollPx / winHeightPx) * 100
        setScrollProgress(scrolled)
      }
      window.addEventListener('scroll', updateScrollProgress)
      return () => window.removeEventListener('scroll', updateScrollProgress)
    }, [])

    return (
      <div className="fixed top-0 left-0 w-full h-1 bg-purple-900 z-50">
        <div
          className="h-full bg-purple-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    )
  }

  const ScrollIndicator = () => (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      initial={{ y: 0 }}
      animate={{
        y: [0, 24, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      <ArrowDown className="w-6 h-6 text-purple-300" />
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-gray-100">
      <ScrollProgressBar />
      <ParticleEffect />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 z-10"
        >
          <h1 className="text-6xl font-bold mb-4 text-purple-300 glow">Ian Bailey</h1>
          <p className="text-2xl text-gray-300">Computer Science Undergraduate @ Colorado State University | Fort Collins, CO</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="z-10"
        >
          <a href="#about" 
             className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors">
            Explore My Work
            <ArrowDown className="ml-2" />
          </a>
        </motion.div>
        <ScrollIndicator />
      </section>

      {/* Navigation Tabs */}
      <nav className="sticky top-0 bg-gray-900 bg-opacity-90 z-40 py-4">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-6">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item, index) => (
              <li key={`nav-${item}-${index}`}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-purple-300 hover:text-purple-100 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-24">
        {/* About Section */}
        <motion.div
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={fadeInUp.transition}
          id="about"
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-purple-300">About Me</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Hello! I'm Ian Bailey, an undergraduate Computer Science major at Colorado State University. My interests span across cybersecurity, software development, and solving real-world problems with innovative solutions. When I'm not coding or studying, I enjoy spending my free time exploring Colorado's beautiful outdoors, skiing, or watching football and basketball. I'm always excited to meet others who share a love for technology, learning, and creativity.
          </p>
          <div className="flex justify-center space-x-4 mt-8">
            <a href="https://github.com/IanBailey1415" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center px-4 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-md transition-colors">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
            <a href="https://linkedin.com/in/ian-bailey1415" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center px-4 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-md transition-colors">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
            <a href="mailto:ian.bailey4117@gmail.com"
               className="inline-flex items-center px-4 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-md transition-colors">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </a>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.section id="skills" {...fadeInUp}>
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">Technical Skills</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {skills.map((skill) => (
              <span 
                key={skill.name} 
                className="text-3xl py-3 px-3 bg-purple-800 text-purple-200 rounded-full hover:bg-purple-700 transition-colors duration-300" 
                title={skill.name}
              >
                {skill.icon}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section id="projects" {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-8 text-center text-purple-300">Featured Project</h2>
          <div className="bg-gray-800 border border-purple-600 rounded-lg p-6">
            <h3 className="text-2xl text-purple-300 mb-4">SIEM System with NIDS and HIDS Integration</h3>
            <p className="text-gray-300 mb-4">
              Developed a comprehensive Security Information and Event Management system integrating both Network-based and Host-based Intrusion Detection Systems.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>Real-time security event logging and analysis</li>
              <li>Automated threat pattern detection and alerting</li>
              <li>Interactive dashboard for event monitoring</li>
              <li>Modular Java-based architecture</li>
            </ul>
            <a href="#" className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Project
            </a>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section id="experience" {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-8 text-center text-purple-300">Experience</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 border border-purple-600 rounded-lg p-6">
              <h3 className="text-2xl text-purple-300 mb-2">Lifetime Fitness</h3>
              <p className="text-gray-400 mb-4">Summers of 2021, 2022, 2023</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Managed over 300 campers</li>
                <li>Implemented safety protocols</li>
                <li>Coordinated team activities</li>
                <li>Completed 25+ training courses</li>
              </ul>
            </div>
            <div className="bg-gray-800 border border-purple-600 rounded-lg p-6">
              <h3 className="text-2xl text-purple-300 mb-2">Pine Creek Golf Club</h3>
              <p className="text-gray-400 mb-4">2021 - 2023</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Promoted from barback to bartender</li>
                <li>Managed high-pressure service periods</li>
                <li>Handled customer service responsibilities</li>
                <li>Maintained inventory management</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section id="contact" className="text-center" {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-6 text-purple-300">Get In Touch</h2>
          <p className="mb-8 text-gray-300">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="flex justify-center space-x-8">
            <a href="mailto:ian.bailey4117@gmail.com" className="text-3xl text-purple-300 hover:text-purple-400 transition-colors">
              <Mail />
            </a>
            <a href="https://github.com/IanBailey1415" target="_blank" rel="noopener noreferrer" className="text-3xl text-purple-300 hover:text-purple-400 transition-colors">
              <Github />
            </a>
            <a href="https://linkedin.com/in/ian-bailey1415" target="_blank" rel="noopener noreferrer" className="text-3xl text-purple-300 hover:text-purple-400 transition-colors">
              <Linkedin />
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  )
}