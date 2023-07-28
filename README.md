
# AUTOS TEMPLATE

Experience the power of a fully functional, sleek, and responsive auto workshop template designed to cater to the needs of modern workshops seamlessly. Elevate your day-to-day transactions with ease and efficiency, enhancing productivity and customer satisfaction to drive greater sales and profitability.
## Features

- **Tracking:** A tracking ID is given to the customer to keep track and get real-time updates about the their car.
- **Appointment Booking:** Schedule appointments with ease by selecting available dates and 30-minute sessions. All sessions are verified and stored in the database, so no incidence of more than one customer selecting a  session.
- **Towing & Roadside Assistance:** Get prompt and reliable towing and roadside assistance services 24/7.
- **Car Repair Services:** A comprehensive range of top-notch car repair and maintenance services.
- **Customer Profile:** Admins can create and manage customer profiles with vehicle details.
- **Gallery:** Showcase images of our services and satisfied customers.
- **Admin Dashboard:** Admins can manage contents displayed on the homepage, create and manage customers data and update info about car repair process.


## Installation


```bash
  Clone the repository:
  https://github.com/chiizzy1/autos-template.git
```
    
```bash
  cd autos-template
  npm install
```
```bash
  Set up environment variables:
  add .env.local to your configuration details.
```
```bash
  Set up Prisma:
  add prisma connection to .env and configure.
```
```bash
  Start the development server:
  npm run dev
```
```bash
  Visit http://localhost:3000 in your browser to access the application.
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


` NEXTAUTH_SECRET `
` NEXTAUTH_URL `
` GOOGLE_CLIENT_ID `
` GOOGLE_CLIENT_SECRET `
` DATABASE_URL `
` NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL `
` NEXT_PUBLIC_CLOUDINARY_CLOUDNAME `
` NEXT_PUBLIC_CLOUDINARY_API_KEY `
` CLOUDINARY_API_SECRET `
## Technologies



- **Next.js**: For building fast and efficient fullstack applications.
- **Tailwind CSS**: A utility-first CSS framework for quick and responsive styling.
- **Prisma**: For interacting with the database and managing data models.
- **Cloudinary**: For storing and managing images in the cloud.
- **NextAuth.js**: For authentication and user management.
- **React-hook-form, Zod Tanstack DataTable and Tanstack React Query**: made working with forms, tables and api calls very easy and seamless.
## Optimizations

I used the power of next 13 server side rendering to reduce the workload of the browser, thereby improving the website speed and overall lead to an improved user experience






## Major Challenges & Solutions

### Challenge 1:  Implementing Appointment Booking Feature

**Description:** Managing appointment booking feature from just the frontend wasn't feasible as it led to overlapping time slots and meant that more than one user could book the same session.

**Solution:** 
After investing considerable effort in researching a solution for this issue, I encountered more challenges than anticipated. However, thanks to invaluable insights from fellow developers who had encountered similar situations, I was able to identify a suitable resolution.

The approach I adopted involved creating a dedicated database to store individual dates, accompanied by an array to record the selected sessions within each specific date. Initially, I attempted to store the date as an object, but this approach posed difficulties, as direct comparisons between objects are not feasible. Consequently, I modified my approach by storing the date as the number of milliseconds, which significantly facilitated the implementation of this feature.



```javascript
//  date as the number of milliseconds
const date = new Date().getTime();
console.log(date);
```


### Challenge 2: Implementing Tracking Feature

**Description:** The aim was to create a real-time tracking system, allowing customers to monitor their vehicle repairs seamlessly. The challenge was managing multiple repair processes concurrently while ensuring accurate and up-to-date information for each car repair.

**Solution:**
- **Database Design:** Designed a robust database schema to efficiently store and manage repair tracking information. Each repair request was assigned a unique Tracking ID, linking it to the relevant customer and their vehicle details.

- **Real-Time Updates:** Developed API routes that facilitate Admins in updating repair details at various stages. These routes empower the Admin to make necessary modifications to repair information with ease and precision.
- **User-Friendly Interface:** Crafted an intuitive and user-friendly interface that allows customers to effortlessly access their repair tracking details and empowers Admins to seamlessly update repair information from the dashboard.
## Acknowledgements

 - [JoshTriedCoding ](https://github.com/joschan21)
 - [Leon Noel and the 100DEVS community](https://github.com/leonnoel)

## Contributing

Contributions are always welcome!
If you would like to contribute to Car Clinic, please follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them with descriptive messages.
- Push your changes to your fork.
- Submit a pull request to the main repository.
- Please ensure your code follows the project's coding standards and includes relevant tests.
## License

[MIT](https://choosealicense.com/licenses/mit/)

