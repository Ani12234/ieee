import ProductImageUpload from "../components/admin-view/image-upload";
import CommonForm from "../components/common/form";
import { Button } from "../components/ui/button";
import { Calendar, Clock, MapPin, Users, Plus, Search, Edit, Trash2, Filter } from "lucide-react";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import { useToast } from "../components/ui/use-toast";
import { meetingsFormElements } from "../components/config/index";
import {
  addNewMeeting,
  deleteMeeting,
  editMeeting,
  fetchAllMeetings,
} from "../store/admin/meetings-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  forWhom: "",
};

function MeetingsManager() {
  // Form and state management
  const [openCreateMeetingDialog, setOpenCreateMeetingDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  
  // Filtering and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date-asc");

  const { meetingsList, isLoading } = useSelector((state) => state.meetings);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchAllMeetings());
  }, [dispatch]);

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editMeeting({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit meeting");

          if (data?.payload?.success) {
            dispatch(fetchAllMeetings());
            setFormData(initialFormData);
            setOpenCreateMeetingDialog(false);
            setCurrentEditedId(null);
            toast({
              title: "Meeting updated successfully",
            });
          }
        })
      : dispatch(
          addNewMeeting({
            ...formData,
            image: uploadedImageUrl || "/placeholder.svg?height=200&width=400",
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllMeetings());
            setOpenCreateMeetingDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Meeting added successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentMeetingId) {
    dispatch(deleteMeeting(getCurrentMeetingId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllMeetings());
        toast({
          title: "Meeting deleted successfully",
        });
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  // Filter meetings based on search term
  const getFilteredMeetings = () => {
    if (!meetingsList) return [];
    
    return meetingsList.filter(meeting => {
      return (
        (meeting.title && meeting.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (meeting.description && meeting.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (meeting.location && meeting.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (meeting.forWhom && meeting.forWhom.toLowerCase().includes(searchTerm.toLowerCase()))
      );
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
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSortOption("date-asc");
  };

  const sortedFilteredMeetings = getSortedMeetings();

  return (
    <Fragment>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Meetings Management</h1>
            <p className="text-gray-500">Manage all your IEEE chapter meetings</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setOpenCreateMeetingDialog(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add New Meeting
          </Button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search meetings..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 whitespace-nowrap">Sort by:</span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-asc">Date (Upcoming first)</SelectItem>
                <SelectItem value="date-desc">Date (Later first)</SelectItem>
                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Meetings Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full border-b-2 border-current border-blue-600 h-8 w-8 mr-2"></div>
            <p className="mt-2 text-gray-600">Loading meetings...</p>
          </div>
        ) : sortedFilteredMeetings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFilteredMeetings.map((meetingItem, idx) => (
              <motion.div
                key={meetingItem.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="h-full"
              >
                <Card className="h-full border-blue-200 hover:border-blue-400 transition-colors">
                  {meetingItem.image && (
                    <div className="relative h-40 overflow-hidden rounded-t-lg">
                      <img
                        src={meetingItem.image}
                        alt={meetingItem.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span className="text-blue-800">{meetingItem.title}</span>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {meetingItem.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {meetingItem.date && (
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="truncate">
                            {new Date(meetingItem.date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {meetingItem.time && (
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="truncate">{meetingItem.time}</span>
                        </div>
                      )}
                      {meetingItem.location && (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="truncate">{meetingItem.location}</span>
                        </div>
                      )}
                      {meetingItem.forWhom && (
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="truncate">For: {meetingItem.forWhom}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-blue-500 text-blue-700 hover:bg-blue-50"
                      onClick={() => {
                        setFormData(meetingItem);
                        setCurrentEditedId(meetingItem.id);
                        setOpenCreateMeetingDialog(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-red-500 text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(meetingItem.id)}
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
            <p className="text-gray-600 mb-4">No meetings found matching your criteria.</p>
            <Button onClick={resetFilters} variant="outline" className="border-blue-500 text-blue-600">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
      <Sheet
        open={openCreateMeetingDialog}
        onOpenChange={() => {
          setOpenCreateMeetingDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto bg-white p-0 max-w-md w-full text-black">
          <SheetHeader className="bg-blue-600 text-white p-6 sticky top-0 z-10">
            <SheetTitle className="text-white text-xl font-bold">
              {currentEditedId !== null ? "Edit Meeting" : "Add New Meeting"}
            </SheetTitle>
          </SheetHeader>
          
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Upload Image</h3>
              <p className="text-sm text-gray-500">Upload an image for this meeting</p>
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
                buttonText={currentEditedId !== null ? "Save Changes" : "Create Meeting"}
                formControls={meetingsFormElements}
                isBtnDisabled={!isFormValid()}
                customButtonClass="bg-blue-600 hover:bg-blue-700 w-full mt-4"
                textColor="text-black"
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default MeetingsManager;
