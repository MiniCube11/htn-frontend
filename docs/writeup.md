# Hack the North Frontend Developer Challenge
## Overview

Tech Stack:
- Next.js
- TypeScript
- Tailwind

Used `lucide-react` for icons, including Heart and Search icon. Used `js-cookie` for storing cookies locally.

Features:
- Display events fetched from the HackerAPI
- Sort events by start time
- Private events can only be seen by authenticated users
- Click into each event to learn more and view related events

Extra features:
- Like button
- Filter (by event type, liked)
- Search

The "liking" feature allows the user to save events that they're interested in attending. The user can filter by events they've liked.
## Q1. Development Process

> Walk us through your development process as you worked on this project. How did you plan out the structure and design of it? How did decide on the tools you've used? Did you encounter any problems? And if so, how did you solve them? Are there any areas of your code that you're particularly proud of or want to point out?
### Planning

Before jumping into development, I first took time to plan out the features, layout, and user flow of the website. Taking inspiration from existing event-finding and calendar websites, I came up with a few ideas for the website design. I drew an initial sketch on paper, consisting of the general layout and where each component would be placed. I also considered what the website would look like on mobile vs. larger screens. While I usually prefer working off a Figma design, I decided not to create a detailed design due to time constraints.
### Design

The main focus of the website design was to ensure the interface was intuitive to use. Since the main purpose of this website is for users to find events, I prioritized features that would improve a user's experience for finding events they're interested in, while keeping the website design simple. In particular, events were colour-coded by event type, which not only adds a splash of colour to the website, but makes it easier for users to find a specific event type. Additional features were implemented to help the user find and save events they're interested in, including the search, filter, and like feature.

The website design follows a consistent colour scheme, typography, and spacing. Icons were taken from `lucide-react` to ensure consistent styling across the website.

Examples of design choices include:
- links that users should actively use are in blue (such as an event url), while links that are less important are dark gray
- consistent light gray border on different components, including event cards and search bar
- larger font sizes for important information (like event name), and smaller font sizes for details
- consistent colours for each event type
### Development

With a two-week deadline, I focused on building a minimum viable product first, which meant prioritizing core features before adding enhancements. The core features I tackled first were: displaying events fetched from the API and authentication system.

Displaying events fetched from the API
- Events are fetched with the `useEffect` hook and `fetch` api
- Events are sorted and filtered
- Events are checked for user permissions, before being displayed to the user

Authentication system
- A user enters their credentials, which are checked against the test values {username: hacker, password: htn2025}
- If the user enters invalid credentials, an error message is shown
- If the user enters valid credentials, their username is saved as a cookie locally, which persists across screen refreshes
- The user is then redirected to the events page, where they'll be able to see private events

After the main features were complete, I had time to add three extra features:
- like, filter, search.

A user can "like" an event, which allows them to easily view events they're interested in, through filtering by "liked" events. When a user clicks the like button, it toggles the liked status based on the current state. Liked events are stored using their event id mapped to a boolean in a dictionary with `useState`.

Searching for an event matches the user-inputted string with event names. Filtering an event by event type matches the selected option with the event type, while filtering by liked posts checks if an event has been liked. Searching and filtering is implemented in `lib/utils.ts`.

Throughout development, I made sure to make small Git commits, with meaningful commit messages. I developed the website with a mobile-first approach to responsive design, ensuring a seamless user experience across all screen sizes.
### Structure of the website

The website is split into modular components with descriptive names, allowing for readability and reusability of features. Functionality, like filtering and authentication, was also split into a separate file away from its respective components. This allows for features to be easily extended, such as adding a new event type or event. Moreover, developers can easily navigate the codebase, since each feature is in its own file.
### Tech Stack

Technologies: Next.js, TypeScript, Tailwind

Using a frontend framework allows components to be broken down into modular pieces and reused across the website. I chose Next.js since I was most familiar with React/Next.js and Next.js has built-in file routing. TypeScript was chosen since it allows for type-checking, preventing silent errors. Tailwind allows me to apply styling faster, and overall speed up the development process.
### Challenges

A challenge I ran into was deploying the website on Vercel. When deploying on Vercel, I ran into a few errors with the build process.

- Some build errors I had were: packages weren't properly installed, linking to images incorrectly
- I fixed the errors by following the instructions given in the Next.js error, and searching up solutions if the initial troubleshooting did not work
- Before deploying again, I ran `npm run build` locally, to check the build process could complete successfully
## Q2. Next steps

> Given additional time, how would you extend your application to become a fully functional product that thousands of hackers and the general public would use at Hackathon Global Inc.™'s next event? Would you add more features and performance metrics? If so, what would they be?

Given additional time, here are the features or improvements I would add to the website.

To make the website fully functional, I would integrate the frontend with a fully-functional backend, complete with user authentication and a database for storing a user's "liked" events.

To improve the performance of the website, I would:
- Implement efficient searching and filtering queries, especially when loading hundreds of events.
- Cache API calls, to avoid making new calls every time a user filters events.
- Upgrade the deployment of the website. The website is currently run on Vercel's free plan, which would not support thousands of users.

Additional features:
- Tracking the number of views for each event, to see which events have been viewed most. This would help event organizers determine what type of events attendees are most interested in.
- Adding or syncing events with the user's Google calendar.
- Display the number of users that have signed up or are interested in an event.
- Filter option for event day.
- Smooth animations when opening/closing event modal.