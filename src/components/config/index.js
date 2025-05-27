export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];
export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const eventsFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter event title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter event description",
  },
  {
    label: "Date",
    name: "date",
    componentType: "input",
    type: "date",
    placeholder: "Select event date",
  },
  {
    label: "Time",
    name: "time",
    componentType: "input",
    type: "text",
    placeholder: "Enter event time (e.g., 9:00 AM - 5:00 PM)",
  },
  {
    label: "Location",
    name: "location",
    componentType: "input",
    type: "text",
    placeholder: "Enter event location",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "conference", label: "Conference" },
      { id: "networking", label: "Networking" },
      { id: "workshop", label: "Workshop" },
      { id: "launch", label: "Product Launch" },
      { id: "charity", label: "Charity" },
      { id: "talk", label: "Tech Talk" },
    ],
  },
  {
    label: "Image URL",
    name: "image",
    componentType: "input",
    type: "text",
    placeholder: "Enter image URL",
  },
  {
    label: "Target Audience",
    name: "forWhom",
    componentType: "input",
    type: "text",
    placeholder: "Enter target audience",
  },
];

export const meetingsFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter meeting title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter meeting description",
  },
  {
    label: "Date",
    name: "date",
    componentType: "input",
    type: "date",
    placeholder: "Select meeting date",
  },
  {
    label: "Time",
    name: "time",
    componentType: "input",
    type: "text",
    placeholder: "Enter meeting time (e.g., 9:00 AM - 5:00 PM)",
  },
  {
    label: "Location",
    name: "location",
    componentType: "input",
    type: "text",
    placeholder: "Enter meeting location",
  },
  {
    label: "Image URL",
    name: "image",
    componentType: "input",
    type: "text",
    placeholder: "Enter image URL",
  },
  {
    label: "Target Audience",
    name: "forWhom",
    componentType: "input",
    type: "text",
    placeholder: "Enter target audience",
  },
];