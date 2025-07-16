import ProductImageUpload from "../components/admin-view/image-upload";
import CommonForm from "../components/common/form";
import { Button } from "../components/ui/button";
import { Calendar, Clock, MapPin, Users, Plus, Search, Edit, Trash2, Filter } from "lucide-react";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import { useToast } from "../components/ui/use-toast";
import { eventsFormElements, meetingsFormElements } from "../../src/components/config/index";
import {
  addNewEvent,
  deleteEvent,
  editEvent,
  fetchAllEvents,
} from "../store/admin/events-slice";
import {
  addNewMeeting,
  deleteMeeting,
  editMeeting,
  fetchAllMeetings,
} from "../store/admin/meetings-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const initialEventFormData = {
  image: null,
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  category: "",
  forWhom: "",
};

const initialMeetingFormData = {
  image: null,
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  forWhom: "",
};

function EventsManager() {
  // Tabs state
  const [activeTab, setActiveTab] = useState("events");
  
  // Events form and state management
  const [openCreateEventDialog, setOpenCreateEventDialog] = useState(false);
  const [eventFormData, setEventFormData] = useState(initialEventFormData);
  const [eventImageFile, setEventImageFile] = useState(null);
  const [eventUploadedImageUrl, setEventUploadedImageUrl] = useState("");
  const [eventImageLoadingState, setEventImageLoadingState] = useState(false);
  const [currentEditedEventId, setCurrentEditedEventId] = useState(null);
  
  // Meetings form and state management
  const [openCreateMeetingDialog, setOpenCreateMeetingDialog] = useState(false);
  const [meetingFormData, setMeetingFormData] = useState(initialMeetingFormData);
  const [meetingImageFile, setMeetingImageFile] = useState(null);
  const [meetingUploadedImageUrl, setMeetingUploadedImageUrl] = useState("");
  const [meetingImageLoadingState, setMeetingImageLoadingState] = useState(false);
  const [currentEditedMeetingId, setCurrentEditedMeetingId] = useState(null);
  
  // Common filtering and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOption, setSortOption] = useState("date-asc");

  // Redux state
  const { eventsList, isLoading: eventsLoading } = useSelector((state) => state.events);
  const { meetingsList, isLoading: meetingsLoading } = useSelector((state) => state.meetings);
  const dispatch = useDispatch();
  const { toast } = useToast();



  // Events submission handler
  function onEventSubmit(event) {
    event.preventDefault();

    currentEditedEventId !== null
      ? dispatch(
          editEvent({
            id: currentEditedEventId,
            formData: eventFormData,
          })
        ).then((data) => {
          console.log(data, "edit event");

          if (data?.payload?.success) {
            dispatch(fetchAllEvents());
            setEventFormData(initialEventFormData);
            setOpenCreateEventDialog(false);
            setCurrentEditedEventId(null);
            toast({
              title: "Event updated successfully",
            });
          }
        })
      : dispatch(
          addNewEvent({
            ...eventFormData,
            image: eventUploadedImageUrl || "/placeholder.svg?height=200&width=400",
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllEvents());
            setOpenCreateEventDialog(false);
            setEventImageFile(null);
            setEventFormData(initialEventFormData);
            toast({
              title: "Event added successfully",
            });
          }
        });
  }
  
  // Meetings submission handler
  function onMeetingSubmit(event) {
    event.preventDefault();

    currentEditedMeetingId !== null
      ? dispatch(
          editMeeting({
            id: currentEditedMeetingId,
            formData: meetingFormData,
          })
        ).then((data) => {
          console.log(data, "edit meeting");

          if (data?.payload?.success) {
            dispatch(fetchAllMeetings());
            setMeetingFormData(initialMeetingFormData);
            setOpenCreateMeetingDialog(false);
            setCurrentEditedMeetingId(null);
            toast({
              title: "Meeting updated successfully",
            });
          }
        })
      : dispatch(
          addNewMeeting({
            ...meetingFormData,
            image: meetingUploadedImageUrl || "/placeholder.svg?height=200&width=400",
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllMeetings());
            setOpenCreateMeetingDialog(false);
            setMeetingImageFile(null);
            setMeetingFormData(initialMeetingFormData);
            toast({
              title: "Meeting added successfully",
            });
          }
        });
  }

  // Events delete handler
  function handleEventDelete(getCurrentEventId) {
    dispatch(deleteEvent(getCurrentEventId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllEvents());
        toast({
          title: "Event deleted successfully",
        });
      }
    });
  }
  
  // Meetings delete handler
  function handleMeetingDelete(getCurrentMeetingId) {
    dispatch(deleteMeeting(getCurrentMeetingId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllMeetings());
        toast({
          title: "Meeting deleted successfully",
        });
      }
    });
  }

  // Event form validation
  function isEventFormValid() {
    return Object.keys(eventFormData)
      .filter((currentKey) => currentKey !== "averageReview" && currentKey !== "image")
      .map((key) => eventFormData[key] !== "")
      .every((item) => item);
  }
  
  // Meeting form validation
  function isMeetingFormValid() {
    return Object.keys(meetingFormData)
      .filter((currentKey) => currentKey !== "averageReview" && currentKey !== "image")
      .map((key) => meetingFormData[key] !== "")
      .every((item) => item);
  }

  // Get unique event categories for filter tabs  
  const getEventCategories = () => {
    const categories = eventsList ? [...new Set(eventsList.map(event => event.category))] : [];
    return ["all", ...categories.filter(c => c)];
  };

  // Filter events based on search term and active category
  const getFilteredEvents = () => {
    return eventsList?.filter(event => {
      if (!event) return false;
      const matchesSearch = 
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        event.forWhom?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "all" || event.category === activeCategory;
      return matchesSearch && matchesCategory;
    }) || [];
  };

  // Filter meetings based on search term
  const getFilteredMeetings = () => {
    return meetingsList?.filter(meeting => {
      if (!meeting) return false;
      const matchesSearch = 
        meeting.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        meeting.description?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        meeting.forWhom?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    }) || [];
  };

  // Sort events based on selected option
  const getSortedEvents = () => {
    const filteredEvents = getFilteredEvents();
    return [...filteredEvents].sort((a, b) => {
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
  };

  // Sort meetings based on selected option
  const getSortedMeetings = () => {
    const filteredMeetings = getFilteredMeetings();
    return [...filteredMeetings].sort((a, b) => {
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
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setActiveCategory("all");
    setSortOption("date-asc");
  };

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  const categories = getCategories();
  const sortedEvents = getSortedEvents();

  return (
    <Fragment>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Events Management</h1>

          <Button 
            onClick={() => setOpenCreateProductsDialog(true)}
            className="bg-violet-600 hover:bg-violet-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Event
          </Button>
        </div>

        {/* Filtering and sorting */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search events..."
                className="pl-10 border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full sm:w-[180px] border-gray-300">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-asc">Date (Earliest first)</SelectItem>
                <SelectItem value="date-desc">Date (Latest first)</SelectItem>
                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue={activeCategory} className="w-full overflow-x-auto">
            <TabsList className="mb-2 bg-gray-100 border border-gray-200 p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="capitalize data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                >
                  {category === "all" ? "All" : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Events grid */}
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-violet-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        ) : sortedEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {sortedEvents.map((eventItem, index) => (
              <motion.div
                key={eventItem.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="group h-full"
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all border-gray-200 hover:border-violet-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={eventItem.image || "/placeholder.svg?height=200&width=400"} 
                      alt={eventItem.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {eventItem.category && (
                      <Badge className="absolute top-3 right-3 bg-violet-600 hover:bg-violet-700 capitalize">
                        {eventItem.category}
                      </Badge>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold truncate">{eventItem.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{eventItem.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {eventItem.date && (
                        <div className="flex items-center text-gray-700">
                          <Calendar className="mr-2 h-4 w-4 text-violet-500 flex-shrink-0" />
                          <span>{eventItem.date}</span>
                        </div>
                      )}
                      {eventItem.time && (
                        <div className="flex items-center text-gray-700">
                          <Clock className="mr-2 h-4 w-4 text-violet-500 flex-shrink-0" />
                          <span>{eventItem.time}</span>
                        </div>
                      )}
                      {eventItem.location && (
                        <div className="flex items-center text-gray-700">
                          <MapPin className="mr-2 h-4 w-4 text-violet-500 flex-shrink-0" />
                          <span className="truncate">{eventItem.location}</span>
                        </div>
                      )}
                      {eventItem.forWhom && (
                        <div className="flex items-center text-gray-700">
                          <Users className="mr-2 h-4 w-4 text-violet-500 flex-shrink-0" />
                          <span className="truncate">For: {eventItem.forWhom}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-violet-500 text-violet-700 hover:bg-violet-50"
                      onClick={() => {
                        setFormData(eventItem);
                        setCurrentEditedId(eventItem.id);
                        setOpenCreateProductsDialog(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-red-500 text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(eventItem.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-600 mb-4">No events found matching your criteria.</p>
            <Button onClick={resetFilters} variant="outline" className="border-violet-500 text-violet-600">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto bg-white p-0 max-w-md w-full text-black">
          <SheetHeader className="bg-violet-600 text-white p-6 sticky top-0 z-10">
            <SheetTitle className="text-white text-xl font-bold">
              {currentEditedId !== null ? "Edit Event" : "Add New Event"}
            </SheetTitle>
          </SheetHeader>
          
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Upload Image</h3>
              <p className="text-sm text-gray-500">Upload an image for this event</p>
              <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isCustomStyling={true}
              />
              {uploadedImageUrl && (
                <div className="mt-2 relative rounded-md overflow-hidden border border-gray-200">
                  <img 
                    src={uploadedImageUrl} 
                    alt="Preview" 
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="py-2">
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? "Save Changes" : "Create Event"}
                formControls={eventsFormElements}
                isBtnDisabled={!isFormValid()}
                customButtonClass="bg-violet-600 hover:bg-violet-700 w-full mt-4"
                textColor="text-black"
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default EventsManager;
