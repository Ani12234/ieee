import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Search, Calendar, MapPin, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents } from "../store/admin/events-slice";
import { fetchAllMeetings } from "../store/admin/meetings-slice";

// Interactive bubble component with hover effect
const InteractiveBubble = ({ size, delay, x, y, color }) => {
  const controls = useAnimation();

  // Start animation when component mounts
  useEffect(() => {
    controls.start({
      scale: [0, 1, 0.9, 1],
      x: [0, 5, -5, 0],
      y: [0, -5, 5, 0],
      transition: { duration: 8, delay: delay, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
    });
  }, [controls, delay]);

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
        });
      }}
      onHoverEnd={() => {
        controls.start({
          scale: [1, 0.9, 1],
          x: [0, 5, -5, 0],
          y: [0, -5, 5, 0],
          transition: { duration: 8, delay: delay, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
        });
      }}
    />
  );
};

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

export default function EventsPage() {
  const dispatch = useDispatch();
  const { eventsList, isLoading: eventsLoading } = useSelector((state) => state.events);
  const { meetingsList, isLoading: meetingsLoading } = useSelector((state) => state.meetings);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOption, setSortOption] = useState("date-asc");
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  // Fetch data from backend when component mounts
  useEffect(() => {
    dispatch(fetchAllEvents());
    dispatch(fetchAllMeetings());
  }, [dispatch]);

  // Completely new scroll implementation using direct DOM manipulation
  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;

    // Get all meeting cards
    const meetingCards = scrollContainerRef.current.querySelectorAll(".meeting-card");
    if (meetingCards.length === 0) return;

    // Calculate visible width
    const containerWidth = scrollContainerRef.current.clientWidth;
    const cardWidth = meetingCards[0].offsetWidth + 24; // width + margin
    const visibleCards = Math.floor(containerWidth / cardWidth);

    // Calculate scroll amount (2 cards or at least 300px)
    const scrollAmount = Math.max(cardWidth * 2, 300);

    // Animate scroll
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const targetScroll = Math.max(0, currentScroll - scrollAmount);

    animateScroll(targetScroll);
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;

    // Get all meeting cards
    const meetingCards = scrollContainerRef.current.querySelectorAll(".meeting-card");
    if (meetingCards.length === 0) return;

    // Calculate visible width
    const containerWidth = scrollContainerRef.current.clientWidth;
    const cardWidth = meetingCards[0].offsetWidth + 24; // width + margin
    const visibleCards = Math.floor(containerWidth / cardWidth);

    // Calculate scroll amount (2 cards or at least 300px)
    const scrollAmount = Math.max(cardWidth * 2, 300);

    // Calculate max scroll
    const maxScroll = scrollContainerRef.current.scrollWidth - containerWidth;

    // Animate scroll
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const targetScroll = Math.min(maxScroll, currentScroll + scrollAmount);

    animateScroll(targetScroll);
  };

  // Smooth scroll animation function
  const animateScroll = (targetPosition) => {
    if (!scrollContainerRef.current) return;

    // Stop auto-scrolling during manual scroll
    setIsAutoScrolling(false);

    const startPosition = scrollContainerRef.current.scrollLeft;
    const distance = targetPosition - startPosition;
    const duration = 500; // ms
    let startTime = null;

    const animation = (currentTime) => {
      if (!scrollContainerRef.current) return;

      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function for smooth animation
      const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

      const newPosition = startPosition + distance * easeInOutQuad(progress);
      scrollContainerRef.current.scrollLeft = newPosition;

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        // Resume auto-scrolling after manual scroll completes
        setTimeout(() => setIsAutoScrolling(true), 2000);
      }
    };

    requestAnimationFrame(animation);
  };

  // Auto-scroll functionality with improved implementation
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const startAutoScroll = () => {
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);

      autoScrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current && isAutoScrolling) {
          const container = scrollContainerRef.current;
          const maxScroll = container.scrollWidth - container.clientWidth;

          // Get current scroll position
          let newScrollPos = container.scrollLeft + 1;

          // Reset to beginning if we reach the end
          if (newScrollPos >= maxScroll) {
            newScrollPos = 0;
          }

          container.scrollLeft = newScrollPos;
        }
      }, 30); // Smooth scrolling with small increments
    };

    if (isAutoScrolling) {
      startAutoScroll();
    }

    // Cleanup
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  // Filter events based on search term and active category
  const filteredEvents = eventsList?.filter((event) => {
    if (!event) return false;
    const matchesSearch =
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.forWhom?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  // Sort events based on selected option
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortOption) {
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      case "title-asc":
        return a.title?.localeCompare(b.title);
      case "title-desc":
        return b.title?.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // Get unique categories for filter tabs
  const categories = ["all", ...new Set(eventsList?.map((event) => event?.category).filter(Boolean))];

  // Generate bubble data
  const bubbles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20, // Smaller bubbles between 20px and 80px
    delay: Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(
      Math.random() * 100 + 150,
    )}, ${Math.random() * 0.2 + 0.1})`, // Violet-ish colors with low opacity
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-violet-950 text-white overflow-x-hidden relative pt-36" style={{ zIndex: 0 }}>
      {/* Background Bubbles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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
      </div>

      {/* Header - Fixed padding for consistency with extra top padding to prevent navbar overlap */}
      <motion.header
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-36 pb-12 text-center relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl py-6 md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-200">
          Upcoming Events
        </h1>
        <p className="mt-4 text-lg text-violet-300 max-w-2xl mx-auto">
          Stay updated with our latest happenings and never miss an opportunity to connect
        </p>
      </motion.header>

      {/* Meetings Section - Full Width with Improved Scrolling */}
      <section className="py-12 relative z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          {/* Section header with consistent padding */}
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex justify-between items-center mb-20">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center text-white drop-shadow-lg">
              <Users className="mr-2 text-blue-400" />
              <span className="bg-black/30 px-3 py-1 rounded-md">Upcoming Meetings</span>
            </h2>

            <div className="flex space-x-3">
              <button
                onClick={scrollLeft}
                className="bg-transparent border border-violet-700 text-violet-300 hover:bg-violet-900/30 hover:border-violet-500 transition-colors px-2 py-2 rounded-md"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollRight}
                className="bg-transparent border border-violet-700 text-violet-300 hover:bg-violet-900/30 hover:border-violet-500 transition-colors px-2 py-2 rounded-md"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Full-width scrollable container with improved scroll behavior */}
          {meetingsLoading ? (
            <div className="flex justify-center items-center py-12 w-full">
              <Spinner />
              <span className="ml-3 text-blue-300">Loading meetings...</span>
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="w-full overflow-x-auto pb-8 hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Consistent padding with the rest of the page */}
              <div className="flex px-4 sm:px-6 lg:px-8 space-x-6 min-w-max">
                {meetingsList && meetingsList.length > 0 ? (
                  meetingsList.map((meeting, index) => (
                    <motion.div
                      key={meeting._id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * Math.min(index, 5), duration: 0.5 }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                        transition: { duration: 0.2 },
                      }}
                      className="meeting-card w-80 flex-shrink-0"
                    >
                      <div className="bg-black/40 border border-violet-800 backdrop-blur-sm hover:border-violet-500 transition-all flex flex-col h-full rounded-lg overflow-hidden">
                        <div className="p-4 pb-2">
                          <h3 className="text-blue-300 truncate text-xl font-bold bg-black/50 px-2 py-1 rounded shadow-md">{meeting.title}</h3>
                          <p className="text-white line-clamp-2 text-sm mt-2">{meeting.description}</p>
                        </div>
                        <div className="p-4 pt-2 flex-grow">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center text-violet-200">
                              <Calendar className="mr-2 h-4 w-4 text-violet-400 flex-shrink-0" />
                              <span className="truncate">
                                {new Date(meeting.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center text-violet-200">
                              <Clock className="mr-2 h-4 w-4 text-violet-400 flex-shrink-0" />
                              <span className="truncate">{meeting.time}</span>
                            </div>
                            <div className="flex items-center text-violet-200">
                              <MapPin className="mr-2 h-4 w-4 text-violet-400 flex-shrink-0" />
                              <span className="truncate">{meeting.location}</span>
                            </div>
                            <div className="flex items-center text-violet-200">
                              <Users className="mr-2 h-4 w-4 text-violet-400 flex-shrink-0" />
                              <span className="truncate">For: {meeting.forWhom}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="w-full text-center py-8">
                    <p className="text-gray-400">No upcoming meetings</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Events Section with Enhanced Filtering - Consistent padding */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 mb-20 relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center">
              <Calendar className="mr-2 text-violet-400" />
              <span>Events Calendar</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="pl-10 bg-black/30 border border-violet-800 text-white rounded-md w-full py-2 px-3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-black/30 border border-violet-800 text-white rounded-md py-2 px-3"
              >
                <option value="date-asc">Date (Earliest first)</option>
                <option value="date-desc">Date (Latest first)</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </select>
            </div>
          </div>

          <div className="mb-8 bg-black/30 border border-violet-800 p-1 rounded-md inline-flex">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-sm transition-colors ${activeCategory === category ? 'bg-violet-900 text-white' : 'text-violet-300 hover:bg-violet-900/50'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {eventsLoading ? (
            <div className="flex justify-center items-center py-12 w-full">
              <Spinner />
              <span className="ml-3 text-violet-300">Loading events...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedEvents.length > 0 ? (
                sortedEvents.map((event, index) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.5)",
                    }}
                    className="h-full group"
                  >
                    <div className="h-full overflow-hidden bg-black/40 border border-violet-800 backdrop-blur-sm hover:border-violet-500 transition-all relative rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"></div>

                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3 bg-violet-700 text-white text-xs px-2 py-1 rounded-full">
                          {event.category}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl text-violet-300 group-hover:text-violet-200 transition-colors truncate font-medium">
                          {event.title}
                        </h3>
                        <p className="text-gray-300 line-clamp-2 text-sm mt-1">{event.description}</p>
                      </div>
                      <div className="p-4 pt-0">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-violet-200">
                            <Calendar className="mr-2 h-4 w-4 text-violet-400 flex-shrink-0" />
                            <span className="truncate">
                              {new Date(event.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center text-violet-200">
                            <Clock className="mr-2 h-4 w-4 text-violet-400 flex-shrink-0" />
                            <span className="truncate">{event.time}</span>
                          </div>
                          <div className="flex items-center text-violet-200">
                            <MapPin className="mr-2 h-4 w-4 text-violet-400 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                          <div className="flex items-center text-violet-200">
                            <Users className="mr-2 h-4 w-4 text-violet-400 flex-shrink-0" />
                            <span className="truncate">For: {event.forWhom}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 pt-2">
                        <button className="w-full bg-violet-700 hover:bg-violet-600 text-white group-hover:bg-violet-600 transition-colors py-2 px-4 rounded-md">
                          Register Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-gray-400">No events found matching your criteria.</p>
                  <button
                    className="mt-4 border border-violet-500 text-violet-300 hover:bg-violet-900/30 transition-colors py-2 px-4 rounded-md"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("all");
                      setSortOption("date-asc");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}