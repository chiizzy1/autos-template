import {
  people01,
  people02,
  people03,
  send,
  shield,
  star,
  carIcon,
  diagnosticIcon,
  lastIcon,
  mechanicIcon,
} from "@/assets";
import { v4 as uuidv4 } from "uuid";

import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

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

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Rewards",
    content:
      "The best credit cards offer some tantalizing combinations of promotions and prizes",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "100% Secured",
    content:
      "We take proactive steps make sure your information and transactions are secure.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Balance Transfer",
    content:
      "A balance transfer credit card can save you a lot of money in interest charges.",
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
    img: people02,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Teacher",
    content:
      "I've been taking my car to this workshop for years and have always been satisfied with their service. The staff is always friendly and takes the time to explain the work that needs to be done. I highly recommend this workshop to anyone in need of car maintenance or repairs.",
    img: people01,
  },
  {
    id: 3,
    name: "David Lee",
    title: "Accountant",
    content:
      "I recently had my brakes replaced at this workshop and was very happy with the quality of work. The staff was very professional and the pricing was very competitive. I would definitely recommend this workshop to anyone in need of car repairs or maintenance.",
    img: people03,
  },
  // {
  //   id: 4,
  //   name: "Jessica Chen",
  //   title: "Marketing Manager",
  //   content: "I brought my car in for an oil change and was very happy with the service I received. The staff was friendly and knowledgeable, and my car was ready in no time. I would definitely recommend this workshop to anyone in need of car maintenance or repairs.",
  //   img: people01
  // }
];

export const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "$230M+",
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
    icon: <FaInstagram className="text-3xl text-dimPurple" />,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: <FaFacebook className="text-3xl text-dimPurple" />,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: <FaTwitter className="text-3xl text-dimPurple" />,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: <FaLinkedin className="text-3xl text-dimPurple" />,
    link: "https://www.linkedin.com/",
  },
];

export const data = [
  {
    id: 1,
    name: {
      first: "John",
      last: "Smith",
    },
    total: 2795.95,
    status: "On Hold",
    method: "PayPal",
    date: "15 Minutes ago",
  },
  {
    id: 2,
    name: {
      first: "Chris",
      last: "Adams",
    },
    total: 1195.95,
    status: "Processing",
    method: "PayPal",
    date: "23 Minutes ago",
  },
  {
    id: 3,
    name: {
      first: "Sarah",
      last: "Smith",
    },
    total: 495.85,
    status: "Completed",
    method: "Visa",
    date: "1 Hour ago",
  },
  {
    id: 4,
    name: {
      first: "Joseph",
      last: "Choo",
    },
    total: 150.45,
    status: "Processing",
    method: "MasterCard",
    date: "1 Hour ago",
  },
  {
    id: 5,
    name: {
      first: "Steve",
      last: "Harding",
    },
    total: 175.25,
    status: "On Hold",
    method: "PayPal",
    date: "2 Hour ago",
  },
  {
    id: 6,
    name: {
      first: "Laura",
      last: "Croft",
    },
    total: 1295.75,
    status: "Completed",
    method: "Check",
    date: "3 Hour ago",
  },
  {
    id: 7,
    name: {
      first: "Michael",
      last: "Jones",
    },
    total: 89.95,
    status: "Completed",
    method: "MasterCard",
    date: "3 Hour ago",
  },
  {
    id: 8,
    name: {
      first: "James",
      last: "Bond",
    },
    total: 689.45,
    status: "Completed",
    method: "Visa",
    date: "7 Hour ago",
  },
  {
    id: 9,
    name: {
      first: "Haley",
      last: "Whiting",
    },
    total: 14.99,
    status: "Completed",
    method: "PayPal",
    date: "1 Day ago",
  },
  {
    id: 10,
    name: {
      first: "Tim",
      last: "Thomas",
    },
    total: 218.99,
    status: "Completed",
    method: "MasterCard",
    date: "1 Day ago",
  },
];
