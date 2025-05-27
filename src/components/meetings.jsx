"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Search, Calendar, MapPin, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllMeetings } from "../store/admin/meetings-slice"
import { Spinner } from "../components/ui/spinner"

// Interactive bubble component with hover effect
const InteractiveBubble = ({ size, delay, x, y, color }) => {
  const controls = useAnimation()

  // Start animation when component mounts
  useEffect(() => {
    controls.start({
      scale: [0, 1, 0.9, 1],
      x: [0, 5, -5, 0],
      y: [0, -5, 5, 0],
      transition: { duration: 8, delay: delay, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
    })
  }, [controls, delay])

  return (
    <motion.div
      className="absolute rounded-full opacity-50 mix-blend-screen cursor-pointer"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
      }}
      initial={{ scale: 0 }}
      animate={controls}
      whileHover={{
        scale: 1.5,
        opacity: 0.8,
        boxShadow: `0 0 20px 5px ${color}`,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => {
        controls.start({
          x: [0, 10, -10, 0],
          y: [0, -10, 10, 0],
          transition: { duration: 1, repeat: 0 },
        })
      }}
      onHoverEnd={() => {
        controls.start({
          scale: [1, 0.9, 1],
          x: [0, 5, -5, 0],
          y: [0, -5, 5, 0],
          transition: { duration: 8, delay: delay, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
        })
      }}
    />
  )
}

export default function MeetingsPage() {
  const dispatch = useDispatch()
  const { meetingsList, isLoading } = useSelector((state) => state.meetings)
  
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("date-asc")
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const scrollContainerRef = useRef(null)
  const autoScrollIntervalRef = useRef(null)
  
  // Fetch meetings from MongoDB when component mounts
  useEffect(() => {
    dispatch(fetchAllMeetings())
  }, [])

  // Scroll implementation for meeting cards
  const scrollLeft = () => {
    if (!scrollContainerRef.current) return

    // Get all meeting cards
    const meetingCards = scrollContainerRef.current.querySelectorAll(".meeting-card")
    if (meetingCards.length === 0) return

    // Calculate visible width
    const containerWidth = scrollContainerRef.current.clientWidth
    const cardWidth = meetingCards[0].offsetWidth + 24 // width + margin
    const visibleCards = Math.floor(containerWidth / cardWidth)

    // Calculate scroll amount (2 cards or at least 300px)
    const scrollAmount = Math.max(cardWidth * 2, 300)

    // Animate scroll
    const currentScroll = scrollContainerRef.current.scrollLeft
    const targetScroll = Math.max(0, currentScroll - scrollAmount)

    animateScroll(targetScroll)
  }

  const scrollRight = () => {
    if (!scrollContainerRef.current) return

    // Get all meeting cards
    const meetingCards = scrollContainerRef.current.querySelectorAll(".meeting-card")
    if (meetingCards.length === 0) return

    // Calculate visible width
    const containerWidth = scrollContainerRef.current.clientWidth
    const cardWidth = meetingCards[0].offsetWidth + 24 // width + margin
    const visibleCards = Math.floor(containerWidth / cardWidth)

    // Calculate scroll amount (2 cards or at least 300px)
    const scrollAmount = Math.max(cardWidth * 2, 300)

    // Calculate max scroll
    const maxScroll = scrollContainerRef.current.scrollWidth - containerWidth

    // Animate scroll
    const currentScroll = scrollContainerRef.current.scrollLeft
    const targetScroll = Math.min(maxScroll, currentScroll + scrollAmount)

    animateScroll(targetScroll)
  }

  // Smooth scroll animation function
  const animateScroll = (targetPosition) => {
    if (!scrollContainerRef.current) return

    const startPosition = scrollContainerRef.current.scrollLeft
    const distance = targetPosition - startPosition
    const duration = 500 // ms
    let startTime = null

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      // Easing function for smooth animation
      const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

      const newPosition = startPosition + distance * easeInOutQuad(progress)
      scrollContainerRef.current.scrollLeft = newPosition

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  // Auto-scroll functionality
  useEffect(() => {
    startAutoScroll()
    
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
    }
  }, [meetingsList])

  const startAutoScroll = () => {
    if (isAutoScrolling && scrollContainerRef.current) {
      // Clear any existing interval
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }

      // Only start auto-scroll if we have enough items to scroll
      if (scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth) {
        autoScrollIntervalRef.current = setInterval(() => {
          const container = scrollContainerRef.current
          const maxScroll = container.scrollWidth - container.clientWidth

          if (container.scrollLeft >= maxScroll - 5) {
            // Reset to start
            animateScroll(0)
          } else {
            // Scroll by small amount
            scrollRight()
          }
        }, 5000) // Scroll every 5 seconds
      }
    }
  }

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    setIsAutoScrolling(false)
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
    }
  }

  const handleMouseLeave = () => {
    setIsAutoScrolling(true)
    startAutoScroll()
  }

  // Filter meetings based on search and sort
  const filteredMeetings = meetingsList
    .filter((meeting) => {
      // Search filter
      const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.forWhom.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesSearch
    })
    .sort((a, b) => {
      // Sort based on option
      if (sortOption === "date-asc") return new Date(a.date) - new Date(b.date)
      if (sortOption === "date-desc") return new Date(b.date) - new Date(a.date)
      if (sortOption === "title-asc") return a.title.localeCompare(b.title)
      if (sortOption === "title-desc") return b.title.localeCompare(a.title)
      return 0
    })

  // Generate bubble data
  const bubbles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    delay: Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: `hsl(${210 + Math.random() * 60}, ${70 + Math.random() * 30}%, ${70 + Math.random() * 30}%)`,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pb-20">
      {/* Interactive background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {bubbles.map((bubble) => (
          <InteractiveBubble
            key={bubble.id}
            size={bubble.size}
            delay={bubble.delay}
            x={bubble.x}
            y={bubble.y}
            color={bubble.color}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-gray-900/70 backdrop-blur-sm"></div>
      </div>

      {/* Header */}
      <div className="pt-36 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-600">
            Upcoming Meetings
          </h1>
          <p className="mt-4 text-xl text-center text-blue-200 max-w-3xl mx-auto">
            Stay informed about all upcoming meetings, sessions, and gatherings
          </p>
        </motion.div>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search meetings by title, description or audience..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400"
          />
        </div>
      </motion.div>

      {/* Upcoming meetings carousel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-200">Upcoming Meetings</h2>
          <div className="flex gap-2">
            <Button
              onClick={scrollLeft}
              size="sm"
              variant="outline"
              className="rounded-full p-2 h-auto w-auto border-blue-500 text-blue-300 hover:bg-blue-900/30"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Scroll Left</span>
            </Button>
            <Button
              onClick={scrollRight}
              size="sm"
              variant="outline"
              className="rounded-full p-2 h-auto w-auto border-blue-500 text-blue-300 hover:bg-blue-900/30"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Scroll Right</span>
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Consistent padding with the rest of the page */}
            <div className="flex px-4 sm:px-6 lg:px-8 space-x-6 min-w-max">
              {isLoading ? (
                <div className="flex justify-center items-center py-12 w-full">
                  <Spinner size="lg" className="text-blue-500" />
                  <span className="ml-3 text-blue-300">Loading meetings...</span>
                </div>
              ) : filteredMeetings.length > 0 ? (
                filteredMeetings.map((meeting, index) => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index % 5) }}
                    className="meeting-card w-80 flex-shrink-0"
                  >
                    <Card className="overflow-hidden bg-gray-800/70 border-blue-800 backdrop-blur-sm hover:border-blue-500 transition-all h-full">
                      <CardHeader>
                        <CardTitle className="text-xl text-blue-300 truncate">{meeting.title}</CardTitle>
                        <CardDescription className="text-gray-300 line-clamp-2">{meeting.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-blue-200">
                            <Calendar className="mr-2 h-4 w-4 text-blue-400 flex-shrink-0" />
                            <span className="truncate">
                              {new Date(meeting.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center text-blue-200">
                            <Clock className="mr-2 h-4 w-4 text-blue-400 flex-shrink-0" />
                            <span className="truncate">{meeting.time}</span>
                          </div>
                          <div className="flex items-center text-blue-200">
                            <MapPin className="mr-2 h-4 w-4 text-blue-400 flex-shrink-0" />
                            <span className="truncate">{meeting.location}</span>
                          </div>
                          <div className="flex items-center text-blue-200">
                            <Users className="mr-2 h-4 w-4 text-blue-400 flex-shrink-0" />
                            <span className="truncate">For: {meeting.forWhom}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-blue-700 hover:bg-blue-600 text-white">
                          Register Now
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 w-full">
                  <p className="text-lg text-gray-400">No meetings found matching your search criteria.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Sort options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end"
      >
        <div className="w-48">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="date-asc">Date (Upcoming first)</SelectItem>
              <SelectItem value="date-desc">Date (Later first)</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* All meetings */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-blue-200 mb-8">All Meetings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Loading state */}
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <Spinner size="lg" className="text-blue-500" />
                <span className="ml-3 text-blue-300">Loading meetings...</span>
              </div>
            ) : filteredMeetings.length > 0 ? (
              filteredMeetings.map((meeting, index) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index % 9) }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.5)",
                  }}
                  className="h-full group"
                >
                  <Card className="h-full overflow-hidden bg-black/40 border-blue-800 backdrop-blur-sm hover:border-blue-500 transition-all relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"></div>

                    <CardHeader>
                      <CardTitle className="text-xl text-blue-300 group-hover:text-blue-200 transition-colors truncate">
                        {meeting.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 line-clamp-2">{meeting.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-blue-200">
                          <Calendar className="mr-2 h-4 w-4 text-blue-400 flex-shrink-0" />
                          <span className="truncate">
                            {new Date(meeting.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-blue-200">
                          <Clock className="mr-2 h-4 w-4 text-blue-400 flex-shrink-0" />
                          <span className="truncate">{meeting.time}</span>
                        </div>
                        <div className="flex items-center text-blue-200">
                          <MapPin className="mr-2 h-4 w-4 text-blue-400 flex-shrink-0" />
                          <span className="truncate">{meeting.location}</span>
                        </div>
                        <div className="flex items-center text-blue-200">
                          <Users className="mr-2 h-4 w-4 text-blue-400 flex-shrink-0" />
                          <span className="truncate">For: {meeting.forWhom}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-blue-700 hover:bg-blue-600 text-white group-hover:bg-blue-600">
                        Register Now
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-400">No meetings found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 border-blue-500 text-blue-300 hover:bg-blue-900/30"
                  onClick={() => {
                    setSearchTerm("")
                    setSortOption("date-asc")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
