# Wedding and Event Planner
My goal for this project is to be an all-in-one self hosted event planner for major events such as weddings, bridal showers and engagement parties. Users will be able to spin this up as a single Docker container which will create the database and frontend.

## Table of Contents
- [Planned Features](#planned-features)
- [Updates](#updates)
- [Getting Started](#getting-started)
- [Built With](#built-with)

## Planned Features
- [x] Account Creation
    - [x] First time setup to create the admin user
    - [x] Invite users via email (smtp) users can be COUPLE, PLANNER, GUEST
    - [x] Create local accounts (no use of SMTP)
- [x] Creating and Editing custom events
    - [x] Information about each event
        - Date/Time
        - Event type
        - Details
        - Location
    - [x] Markdown supported notes
- [x] Guest book (contact information)
    - [x] Ability to switch between table or card view
    - [x] Add Guests to events
    - [ ] Invite guests via email
    - [ ] Create local account for guest
    - [x] Bulk upload
        - Creates GuestBookEntry
        - Skips dupicates
        - Updates entries if uploaded more than once
- [x] Managing RSVP lists
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

## Updates
#### 6.24.25
- added ability to invite users via email making use of a smtp server and nodemailer
    - inviteTokens added to db which are used to sign up and expire onDate and after use
- added ability to create local users if you don't want to use smtp `/admin/create-user`
- created user pages
- added usernames to `Users` table
- updated first time setup to include username creation

#### 6.25.25
- now able to see and edit event data from the individual event page

#### 6.26.25
### The Guest Book
- added guest-book page, viewable by PLANNER and COUPLE accounts
    - db query is secure behind PLANNER and COUPLE auth sessions
- added ability to add and edit guests to guest book
- save guest infomation (name, email, phone, address, side (which side of the couple), notes)

#### 6.28.25
### RSVP List
- add guests from GuestBook to any event
- search GuestBook to add guests
- change status of RSVP

#### 6.29.25 – Notes and Tasks
- Markdown note field per event
- Inline editing with live preview
- Task list per event with due dates & completion toggle

## Getting Started
This app is fully deployable with Docker or runnable in development with Node.

### Development Mode

1. Clone the repo
```
git clone https://github.com/briannelson95/wedding-planner.git
```

2. Set your enviorment variables
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/wedding_planner
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=yourpassword
SMTP_FROM_NAME=Wedding Planner
SMTP_FROM_EMAIL=your@email.com
```

3. Start the database
```
docker compose up -d db
```

4. Migrate and Generate the Prima files
```
npx prisma migrate dev --name init
npx prisma generate
```

5. Install dependencies and start app
```
npm install
npm run dev
```

### Self-Hosted (Production) via Docker
1. Copy `.env.production`
Make a copy of your .env as .env.production and customize values.

2. Update `docker-compose.yml`
Already included in the repo – here's what it does:
- Runs a postgres:15 container
- Builds the app from the Dockerfile
- Runs migrations before starting the frontend

3. Run the app
```
docker compose up --build
```
This will expose your instance at http://localhost:3000

### Advanced Features

#### Bulk Uploading Guests to the Guest Book
You can quickly populate your Guest Book by uploading a `.csv` file with your guest data. This is useful for importing lists from spreadsheets or other planning tools.
##### Required Format
The CSV file must contain the following column headers:
| Column Name | Required | Description |
|-------------|----------|-------------|
|`first` | ✅ Yes | First name of guest|
|`last` | ✅ Yes | Last name of guest|
|`side` | ✅ Yes | The side of the couple they are on (e.g., "Bride", "Groom")|
|`email` | ❌ No | Guest's email address|
|`phone` | ❌ No | Guest's phone number|
|`address` | ❌ No | Street address|
|`notes` | ❌ No | Any special notes or details|

> Only `first`, `last`, and `side` are required — the rest are optional.
###### Download Example CSV
To helo you get started, you can download a sample CSV file here:
[Download sample_guest_upload.csv](public/sample_guest_upload.csv)
This example includes 2 entries:
- John Smith (side: Groom)
- Jane Dow (side: Bride)
Feel free to use this as a template for formatting your own guest lsit before uploading.

##### Example CSV Content
```
first,last,side,email,phone,address,notes
Alice,Smith,Brian,alice@example.com,555-1234,"123 Main St","Vegetarian"
Bob,Jones,Kate,bob@example.com,,,
```
##### Duplicates
- Uploads skip exact duplicates (based on first and last name).
- If a match is found and new information is available (e.g. a phone number), the guest record will be updated automatically.

##### Uploading a File
1. Navigate to the **Guest Book** page.
2. Click the "**Upload CSV**" button next to the "**Add Guest**" button.
3. Select a `.csv` file from your computer.
4. Confirm the filename is displayed.
5. Click "**Upload**" — a confirmation will be shown with the number of guests added or updated.

## Built With
- NextJS 15
- NextAuth
- Prisma
- TailwindCSS
- PostgresDB
- Docker

### Ready to start planning your wedding or big event? Try it now or contribute ideas via [GitHub Issues](https://github.com/briannelson95/wedding-planner/issues).

