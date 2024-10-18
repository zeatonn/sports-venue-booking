# Sports Booking App(Game Theory)

**College ID**: IEC2021034

## Project Overview

This project is a booking management system for a sports technology company, designed to manage operations across multiple centres. Each centre offers various sports with multiple courts/resources. The application allows customers to book 60-minute slots for their preferred sports and provides centre managers with the ability to view and manage all bookings.

## Prerequisites

- **Node.js** (v14.x or higher)
- **MySQL**
- **React.js** (v17.x or higher)
- **npm** (v6.x or higher)
- **dotenv** (For managing environment variables)
- **cors**, **body-parser**, **express** (for the backend)

## Deployed Links

- **Frontend**: [https://sports-venue-booking.vercel.app/](https://sports-venue-booking.vercel.app/)
- **Backend**: [https://sports-venue-booking.onrender.com](https://sports-venue-booking.onrender.com)

## Assumptions & Limitations

- Only authorized users (centre managers) can manage bookings and access sensitive data.
- The application assumes that the user has an active internet connection.
- Each booking slot is precisely 60 minutes long.
- Currently the backend is hosted on a free plan on Render, so it takes abweout 1-2 mins to boot up the machine after some rest period.

## Future Improvements
- A payment gateway could be added.
- A authenticator for whenever someone access the application for added security.
