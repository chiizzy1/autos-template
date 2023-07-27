import { carIcon, diagnosticIcon, lastIcon, mechanicIcon } from "@/assets";
import { v4 as uuidv4 } from "uuid";
import {
  BadgeCheck,
  Facebook,
  HeartHandshake,
  Instagram,
  Lightbulb,
  Linkedin,
  Twitter,
  UserCheck,
} from "lucide-react";

export const services = [
  {
    title: "Oil Change and Filter Replacement",
    description:
      "Regular oil changes are essential to keep your engine running smoothly.",
    image:
      "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: uuidv4(),
  },
  {
    title: "Brake System Inspection and Repair",
    description:
      "The workshop will inspect and repair any issues with the brake system to ensure optimal braking performance.",
    image:
      "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: uuidv4(),
  },
  {
    title: "Air conditioning system service and repair",
    description:
      "The workshop will inspect and service your vehicle's air conditioning system, including refrigerant recharge, compressor repair, and system leak detection, to keep you cool and comfortable during hot weather.",
    image:
      "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: uuidv4(),
  },
  {
    title: "Suspension system inspection and repair",
    description:
      "The suspension system provides a comfortable ride and stability. The workshop will inspect and repair components such as shocks, struts, control arms, and bushings to ensure optimal handling and ride quality.",
    image:
      "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: uuidv4(),
  },
  {
    title: "Exhaust system inspection and repair",
    description:
      "The exhaust system ensures the proper flow of exhaust gases from the engine. The workshop will inspect and repair components such as mufflers, catalytic converters, and exhaust pipes to maintain performance and minimize emissions.",
    image:
      "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: uuidv4(),
  },
  {
    title: "Cooling system maintenance and repair",
    description:
      "The cooling system keeps the engine at a safe operating temperature. The workshop will inspect and repair components such as radiators, hoses, water pumps, and thermostats to prevent overheating and maintain efficient cooling.",
    image:
      "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: uuidv4(),
  },
  {
    title: "Transmission fluid flush and replacement",
    description:
      "Transmission fluid is crucial for smooth gear shifting and overall transmission performance. The workshop will flush out old fluid and replace it with new fluid to maintain optimal transmission operation.",
    image:
      "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: uuidv4(),
  },
  {
    title: " Electrical system repair",
    description:
      "Electrical issues can cause various problems in your vehicle. The workshop will diagnose and repair electrical system components such as alternators, starters, batteries, and wiring to restore proper functionality.",
    image:
      "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: uuidv4(),
  },
  {
    title: " Battery testing and replacement",
    description:
      "The workshop will test your vehicle's battery to ensure it is functioning properly. If necessary, they will replace the battery with a new one to ensure reliable starting and electrical system performance.",
    image:
      "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: uuidv4(),
  },
  {
    title: "Wheel alignment",
    description:
      "Wheel alignment ensures that all four wheels are properly aligned with each other and the road. This service improves steering stability, tire life, and overall handling.",
    image:
      "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: uuidv4(),
  },
  {
    title: "Tire rotation and balancing",
    description:
      "Tire rotation involves moving tires from one position to another to ensure even wear. Balancing involves adjusting the weight distribution of each tire to avoid vibrations and ensure a smooth ride.",
    image:
      "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: uuidv4(),
  },
  {
    title: "Engine diagnostics and tune-ups",
    description:
      "If your vehicle is experiencing performance issues or check engine light is on, the workshop will perform diagnostics to identify the problem. They will then tune up the engine, including spark plug replacement, fuel system cleaning, and adjusting engine components.",
    image:
      "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: uuidv4(),
  },
];

export const days = [
  {
    day: "Sunday",
    activity: "Closed",
  },
  {
    day: "Monday",
    activity: "08:00am - 06:00pm",
  },
  {
    day: "Tuesday",
    activity: "08:00am - 06:00pm",
  },
  {
    day: "Wednesday",
    activity: "08:00am - 06:00pm",
  },
  {
    day: "Thursday",
    activity: "08:00am - 06:00pm",
  },
  {
    day: "Friday",
    activity: "08:00am - 06:00pm",
  },
  {
    day: "Saturday",
    activity: "08:00am - 06:00pm",
  },
];

export const servicesContent = [
  {
    id: "service-1",
    content:
      "Identifying issues with a vehicle's systems and providing an estimate of repair costs.",
    title: "Diagnostic Services",
    icon: carIcon,
  },
  {
    id: "service-2",
    content:
      "Performing routine services like oil changes, tire rotations, and brake inspections to prevent breakdowns.",
    title: "Regular Maintenance",
    icon: diagnosticIcon,
  },
  {
    id: "service-3",
    content: "Fixing or replacing damaged or worn-out parts of a vehicle.",
    title: "Repair Services",
    icon: mechanicIcon,
  },
  {
    id: "service-4",
    content: "Repairing or replacing damaged exterior components of a vehicle.",
    title: "Bodywork Services",
    icon: lastIcon,
  },
];

export const feedback = [
  {
    id: 1,
    name: "John Smith",
    title: "Software Engineer",
    content:
      "I recently brought my car in for service and was extremely impressed with the quality of work and customer service. The staff was friendly and knowledgeable, and my car was fixed in no time. I highly recommend this auto workshop to anyone in need of reliable and professional service.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Teacher",
    content:
      "I've been taking my car to this workshop for years and have always been satisfied with their service. The staff is always friendly and takes the time to explain the work that needs to be done. I highly recommend this workshop to anyone in need of car maintenance or repairs.",
  },
  {
    id: 3,
    name: "David Lee",
    title: "Accountant",
    content:
      "I recently had my brakes replaced at this workshop and was very happy with the quality of work. The staff was very professional and the pricing was very competitive. I would definitely recommend this workshop to anyone in need of car repairs or maintenance.",
  },
];

export const footerLinks = [
  {
    title: "Services",
    links: [
      {
        name: "Repair Services",
        link: "/",
      },
      {
        name: "Regular Maintenance",
        link: "/",
      },
      {
        name: "Diagnostic Services",
        link: "/",
      },
      {
        name: "Bodywork Services",
        link: "/",
      },
      {
        name: "AC Repair Services",
        link: "/",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        name: "About Us",
        link: "/",
      },
      {
        name: "Contact",
        link: "/",
      },
      {
        name: "Help Center",
        link: "/",
      },
      {
        name: "Blog",
        link: "/",
      },
      {
        name: "Newsletters",
        link: "/",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        name: "Terms of use",
        link: "/",
      },
      {
        name: "Privacy policy",
        link: "/",
      },
      {
        name: "Cookie policy",
        link: "/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: <Instagram className="text-dimPurple" size={32} strokeWidth={2} />,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: <Facebook className="text-dimPurple" size={32} strokeWidth={2} />,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: <Twitter className="text-dimPurple" size={32} strokeWidth={2} />,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: <Linkedin className="text-dimPurple" size={32} strokeWidth={2} />,
    link: "https://www.linkedin.com/",
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "Active Customers",
    value: "3,807",
  },
  {
    id: "stats-2",
    title: "Completed Repairs",
    value: "23,230",
  },
  {
    id: "stats-3",
    title: "Average Customer Rating",
    value: "98%",
  },
];

export const coreValues = [
  {
    id: uuidv4(),
    title: "Innovation",
    icon: <Lightbulb className="text-dimPurple" strokeWidth={1.5} />,
    content:
      "We embrace innovation and embrace new technologies to enhance our services and deliver greater value to our customers.",
  },
  {
    id: uuidv4(),
    title: "Quality Excellence",
    icon: <BadgeCheck className="text-dimPurple" strokeWidth={1.5} />,
    content:
      "We are dedicated to delivering the highest quality of workmanship and service.",
  },
  {
    id: uuidv4(),
    title: "Customer-Centric",
    icon: <UserCheck className="text-dimPurple" strokeWidth={1.5} />,
    content: "Our customers are at the heart of everything we do.",
  },
  {
    id: uuidv4(),
    title: "Integrity",
    icon: <HeartHandshake className="text-dimPurple" strokeWidth={1.5} />,
    content:
      "We uphold the highest standards of honesty, transparency, and ethical conduct in all our dealings. ",
  },
];

export const whyChooseUs = [
  {
    id: uuidv4(),
    index: 0,
    title: "Expert Team",
    content:
      "Our team of skilled and certified technicians is the backbone of Car Clinic. They are not only experts in their field but also passionate about what they do. With their extensive knowledge and state-of-the-art equipment, they can handle all your automotive needs with precision and care.",
    image:
      "https://images.pexels.com/photos/6285158/pexels-photo-6285158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: uuidv4(),
    index: 1,
    title: "Quality Parts",
    content:
      "We use only high-quality parts and components to ensure the best performance and longevity for your vehicle. Your safety and the reliability of your car are of utmost importance to us.",
    image:
      "https://images.pexels.com/photos/14165725/pexels-photo-14165725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: uuidv4(),
    index: 2,
    title: "State-of-the-Art Facility",
    content:
      " Our modern facility is equipped with the latest technology and tools to deliver superior automotive services. We continually invest in upgrading our facility and training our team to stay up-to-date with the latest advancements in the automotive industry.",
    image:
      "https://images.pexels.com/photos/8985660/pexels-photo-8985660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export const appointmentForm = [
  {
    label: "First Name",
    element: "input",
    type: "text",
    width: "sm:w-1/2",
    placeholder: "type your first name here...",
    register: "firstName",
    errorMessage: "first name is required.",
  },
  {
    label: "Last Name",
    element: "input",
    type: "text",
    width: "sm:w-1/2",
    placeholder: "type your last name here...",
    register: "lastName",
    errorMessage: "last name is required.",
  },
  {
    label: "Phone",
    element: "input",
    type: "tel",
    width: "sm:w-1/2",
    placeholder: "type your phone here...",
    register: "phone",
    errorMessage: "phone is required.",
  },
  {
    label: "Email",
    element: "input",
    type: "email",
    width: "sm:w-1/2",
    placeholder: "type your email here...",
    register: "email",
    errorMessage: "email is required.",
  },
  {
    label: "Vehicle Make",
    element: "input",
    type: "text",
    width: "sm:w-1/3",
    placeholder: "e.g Mercedes Benz...",
    register: "carMake",
    errorMessage: "car manufacturer is required.",
  },
  {
    label: "Car Model",
    element: "input",
    type: "text",
    width: "sm:w-1/3",
    placeholder: "e.g GLE 63...",
    register: "carModel",
    errorMessage: "car model is required.",
  },
  {
    label: "Year Manufactured",
    element: "input",
    type: "number",
    width: "sm:w-1/3",
    placeholder: "e.g 2023...",
    register: "carYear",
    errorMessage: "year is required.",
  },
  {
    label: "Reason for appointment",
    element: "textarea",
    placeholder: "Share any additional information with us.",
    register: "message",
    errorMessage: "cannot be blank!",
  },
];
