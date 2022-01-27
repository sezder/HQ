
# Headquarters (HQ)

Headquarters is a loose clone of Basecamp, a team project management software. Users can collaborate with their teams and organize themselves via projects. Every project has a message board where team members can share their thoughts and sollicit feedback. Each project also includes todo lists.

Because the project is highly team-oriented and geared toward collaboraion, teammates can modify todos, lists, and projects that they're assigned to. Although Basecamp has distinctions for admin vs. regular user access when it comes to modifying content that is not your own, that's a layer of complexity I chose not to pursue. 

This project has been a testament to the fact that I am a quick and accurate developer. Only two full-CRUD features were required to pass given a two-week sprint, and I was able to complete that within a few days. In about half of the time allotted, I was able to achieve not only my minimally viable product, but most of my stretch goals as well. I was able to knock out so many features that the rubric didn't accomodate grading all of it.

TODO: Challenges I faced: 
- accessibility concerns 
- conditionally rendering forms in palce of content
- nesting doll navigation
- information-heavy-based design: prev. relied on photos to liven it up, looked very empty for brand new project


## Features
- Create an account, sign in, or log in as a demo user
- Create, view, edit, and delete
   - Projects
   - Messages
   - Comments
   - Todo lists
   - Todos  
- Project assignments
- Todo assignments

Upcoming features: 
- Users can view their assigned todos on a user dashboard

## Technologies Used
- React
- Redux 
- Python
- PostgreSQL
- Flask SQLAlchemy


# Splash page
From the splash page, one of the only pages accessible without authentication, allows users to choose to create an account, log into an existing account, or log in as a demo user. It features previews of the site to entice users to sign up. 
TODO: INSERT PHOTO

# Projects
Users can organize their teams into projects, assigning only the individuals who are stakeholders in the project.
TODO: INSERT PHOTO

# Message Board
The message board is comprised of messages on which people can leave comments. It's intended to help solve the issue of emails on various subjects all coming to the same place. 
TODO: PHOTO OF /messages
TODO: PHOTO OF /messages/:id
TODO: PHOTO OF /messages/new

# Todo Lists
Todos for a project can be categorized into lists and assigned to particular individuals so that nothing falls through the cracks. 
TODO: PHOTO OF /lists
TODO: PHOTO OF /lists/:id
