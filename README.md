# Wedding and Event Planner
My goal for this project is to be an all-in-one self hosted event planner for major events such as weddings, bridal showers and engagement parties. Users will be able to spin this up as a single Docker container which will create the database and frontend.

## Table of Contents
- [Planned Features](#planned-features)
- [Getting Started](#getting-started)
- [Built With](#built-with)

## Planned Features
- [x] Account Creation
    - [x] First time setup to create the admin user
    - [ ] Invite partner and or "Planner" via email (smtp)
- [ ] Creating custom events
    - [ ] Information about each event
        - Date/Time
        - Event type
        - Details
        - Location
- [ ] Managing RSVP lists
- [ ] Guest accounts
- [ ] Gift Registries
    - [ ] Ability for guests to mark an item as purchased
- [ ] Task Management
- [ ] Custom Theming

### Possible Features
- Budget Tracking
- Vendor Tracking
- Seating Charts
- Calendar/Timeline Builder

## Getting Started
This is very much a work in progress but this `README` will stay up to date on working features and steps to get it running **in its current state**. That being said if you're interested in starting it as is, you can follow these instructions.

1. Clone the repo
```
git clone https://github.com/briannelson95/wedding-planner.git
```

2. Set your enviorment variables
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/wedding_planner
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

3. Start the database
```
docker compose up -d
```

4. Install dependencies and start the front end with `npm i && npm run dev` or `bun i && bun dev`

## Built With
- NextJS 15
- NextAuth
- Prisma
- TailwindCSS
- PostgresDB
- Docker