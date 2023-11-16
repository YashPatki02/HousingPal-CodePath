# Milestone 5

This document should be completed and submitted during **Unit 9** of this course. You **must** check off all completed tasks in this document in order to receive credit for your work.

## Checklist

This unit, be sure to complete all tasks listed below. To complete a task, place an `x` between the brackets.

- [ ] Deploy your project on Railway
  - [ ] In `readme.md`, add the link to your deployed project
- [x] Update the status of issues in your project board as you complete them
- [x] In `readme.md`, check off the features you have completed in this unit by adding a ✅ emoji in front of their title
  - [x] Under each feature you have completed, **include a GIF** showing feature functionality
- [x] In this document, complete the **Reflection** section below
- [x] 🚩🚩🚩**Complete the Final Project Feature Checklist section below**, detailing each feature you completed in the project (ONLY include features you implemented, not features you planned)
- [x] 🚩🚩🚩**Record a GIF showing a complete run-through of your app** that displays all the components included in the **Final Project Feature Checklist** below
  - [x] Include this GIF in the **Final Demo GIF** section below

## Final Project Feature Checklist

Complete the checklist below detailing each baseline, custom, and stretch feature you completed in your project. This checklist will help graders look for each feature in the GIF you submit.

### Baseline Features

👉🏾👉🏾👉🏾 Check off each completed feature below.

- [x] The project includes an Express backend app and a React frontend app
- [x] The project includes these backend-specific features:
  - [x] At least one of each of the following database relationship in Postgres
    - [x] one-to-many
    - [x] many-to-many with a join table
  - [x] A well-designed RESTful API
    - [x] The API can respond to at least one of each type of request: GET, POST, PATCH, and DELETE
    - [x] Routes follow proper naming conventions
  - [x] The ability to reset the database to its default state
- [x] The project includes these frontend-specific features:
  - [x] At least one redirection
  - [x] At least one interaction that the user can initiate and complete on the same page without navigating to a new page
  - [x] Dynamic frontend routes created with React Router
  - [x] Hierarchically designed React components
    - [x] Components broken down into categories, including Page and Component types
    - [x] Corresponding container components and presenter components as appropriate
- [x] The project includes dynamic routes for both frontend and backend apps
- [x] The project is deployed on Railway with all pages and features working

### Custom Features

👉🏾👉🏾👉🏾 Check off each completed feature below.

- [x] The project gracefully handles errors
- [ ] The project includes a one-to-one database relationship
- [ ] The project includes a slide-out pane or modal as appropriate for your use case
- [ ] The project includes a unique field within the join table
- [ ] The project includes a custom non-RESTful route with corresponding controller actions
- [x] The project allows filtering and/or sorting as appropriate for your use case
- [ ] Data is automatically generated in response to a certain event or user action. Examples include generating a default inventory for a new user starting a game or creating a starter set of tasks for a user creating a new task app account
- [x] Data submitted via a POST or PATCH request is validated before the database is updated

### Stretch Features

👉🏾👉🏾👉🏾 Check off each completed feature below.

- [ ] A subset of pages require the user to log in before accessing the content
  - [ ] Users can log in and log out via GitHub OAuth with Passport.js
- [ ] Restrict available user options dynamically, such as restricting available purchases based on a user's currency
- [x] Show a spinner while a page or page element is loading
- [ ] Disable buttons and inputs during the form submission process
- [ ] Disable buttons after they have been clicked
- [ ] Users can upload images to the app and have them be stored on a cloud service
- [ ] 🍞 [Toast messages](https://www.patternfly.org/v3/pattern-library/communication/toast-notifications/index.html) deliver simple feedback in response to user events

## Final Demo GIF

![Final Demo]('../gits/../../../gifs/final-demo.gif)

## Reflection

### 1. What went well during this unit?

I was able to finalize the features I wanted to implement and was able to complete them in a timely manner. The design also came together as I had envisioned it, so I'm happy with the final product. 

### 2. What were some challenges your group faced in this unit?

Unfortunately, I couldn't figure out how to work the GitHub login for Users, so I had to improvise and abandon that feature. Now, I just have users created on the database and all the other features I have simulated as though the users were created and logged in. I ensured to add different listings and profiles to simulate different users. Additonally, I had some issues with deploying the app on Railway, but I was able to resolve them.

### 3. What were some of the highlights or achievements that you are most proud of in this project?

I was most proud of my backend implementation, as it made it very easy to implement the main features on the frontend. I was also proud of the design, as I was able to implement the design using AntDesign, as I have previous experience with it.

### 4. Reflecting on your web development journey so far, how have you grown since the beginning of the course?

I have certainly grown a lot since the beginning of the course. Before the course, I had minimal experience working with Backend and Databases, but now I feel I have a grasp on how to build a full-stack application from the ground up. I will admit there was a lot to learn and it will be hard to remember everything, but I have a strong foundation of the steps I need to take to build my very own web application.

### 5. Looking ahead, what are your goals related to web development, and what steps do you plan to take to achieve them?

Continuing this journey, I want to actually work on this project further and implement the stretch features that I didn't have time to implement within the span of this course. I would love to actually deploy it and see it help real users. I also would love to get a job as a full-stack developer and continue to learn and grow in this field. I plan to continue to work on my own projects and learn new technologies to help me achieve these goals.
