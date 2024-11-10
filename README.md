# Tasteful Tales
![Tasteful Tales](assets/icon.png)
## App Store Description

Discover and share your culinary adventures with Tasteful Tales - your personal food diary and social companion. Create beautiful food memories by capturing dishes, sharing recipes, and exploring local dining spots. Connect with fellow food enthusiasts, discover hidden gems on our interactive food map, and build your own digital cookbook.

Whether you're a home chef experimenting with new recipes or a food explorer hunting for your next favorite restaurant, Tasteful Tales helps you document and share your gastronomic journey. Take photos of your creations, mark your favorite spots on the map, and set reminders for upcoming food events or restaurant openings.

Key Features:
• Create and share food stories with photos, recipes, and location tags
• Explore an interactive map showing nearby restaurants and food recommendations
• Schedule reminders for food events, restaurant openings, or cooking plans
• browse the posts of other food enthusiasts and discover their culinary adventures

## Slogan

"Every meal tells a story - Share yours with Tasteful Tales"

## Target Users

Primary users are urban food enthusiasts aged 25-40 who:

- Regularly dine out and try new restaurants
- Enjoy cooking and experimenting with recipes
- Are active on social media and like sharing food experiences
- Have disposable income for dining and cooking
- Are comfortable using mobile apps for social networking and discovery

## UI Sketches

1. Main Page Feed:
    - Top: Header
    - Middle: Scrollable photo card stream
    - Bottom: Navigation bar (Feed, Map, Post, Events, Profile)
2. Map Page:
    - Interactive map displaying nearby food locations
    - Markers show:
        - Red: Popular restaurants
        - Blue: My location
        - Fetch restaurant information using external API (Yelp)
3. Post Page:
    - Camera viewfinder/photo preview
    - Location selector
    - Text description input box
4. Events Page:
    - Calendar view
    - Add event button
    - Edit event button
    - Event list display
    - Reminder setting options
5. Profile Page:
    - Personal profile
    - Account information
    
    ## Detail Sketches
    
    - **Main Feed Screen**: A scrollable feed displaying food stories shared by users, with a navigation bar at the bottom for accessing different sections of the app.
        - **Top Section**:
            - A header at the very top with the label "Feeds" in a hand-drawn, casual font style.
        - **Middle Section**:
            - Contains a vertical list of scrollable photo cards representing individual food stories or posts.
            - Each photo card has:
                - A large placeholder "X" symbol, representing an image.
                - Below the image placeholder, there is a space for text, likely meant for a short description or caption. This is indicated by wavy lines mimicking text lines.
            - Two such photo cards are visible in the sketch, suggesting that this section can scroll vertically to reveal more posts.
        - **Right Side of Feed Cards**:
            - A vertical scroll bar on the right side of the feed cards, indicating that this section is scrollable to view more content.
        - **Bottom Navigation Bar**:
            - A fixed navigation bar at the bottom with five icon buttons, each equally spaced and stylized with simple line drawings:
                1. **Home Icon** (leftmost): Resembles a house, likely for the main feed.
                2. **Map Icon**: Represents a location pin, presumably to access the Map page.
                3. **Plus (+) Icon**: Likely for adding a new post or creating new content.
                4. **Calendar Icon**: Probably represents the Events page.
                5. **User Icon** (rightmost): Likely for accessing the Profile page.
    - **Map Screen**: An interactive map that displays restaurant locations and user-generated pins, allowing users to mark locations as favorites.
        - **Top Section**:
            - A header at the very top with the label "Map" in a hand-drawn font.
            - A button labeled "ADD" in a rounded rectangle is located on the top right, suggesting a feature to add a new marker or location.
        - **Main Map Area**:
            - The map displays a section with buildings or area blocks, represented by rectangular shapes in various sizes.
            - There is a river or road running vertically through the map, depicted by a winding line.
        - **Markers on the Map**:
            - **Red Location Pins**: Represent popular or significant restaurant locations. There are two visible on the map.
            - **Blue Location Pin**: Represents the user's current location. It is positioned closer to the center of the map.
            - **Selected Marker**: One red location pin is labeled "Selected," indicating it has been tapped or chosen by the user. This pin has a detailed pop-up box next to it.
        - **Pop-up Information Box**:
            - When the "Selected" marker is chosen, an information box appears, connected to the marker by a line.
            - This pop-up box has placeholder text indicating "Restaurant Name" and additional details, represented by wavy lines to signify descriptive text.
        - **Bottom Navigation Bar**:
            - The same navigation bar as on the Feeds page is present here, with five icon buttons:
                1. **Home Icon**: For the main feed.
                2. **Map Icon**: For the current map page.
                3. **Plus (+) Icon**: Likely for adding a new post or creating new content.
                4. **Calendar Icon**: For accessing the Events page.
                5. **User Icon**: For the Profile page.
    - **New Post Screen**: A screen for creating a food story, including photo uploading, description input, and location tagging.
        - **Top Section**:
            - A header at the very top with the label "New Post" in a casual font style.
            - A back arrow icon is to the left of the "New Post" title, likely for navigating back to the previous screen.
        - **Photo and Input Fields**:
            - At the top, there are two square icon buttons side by side:
                1. **Camera Icon**: On the left, representing the option to take a photo or select an image.
                2. **Pin Icon**: On the right, indicating location selection or tagging.
            - Below the icons are three labeled input fields for creating a new post:
                1. **Title**: A rectangular input box labeled "Title" for entering a short title or caption for the post.
                2. **Location**: A box below "Title," labeled "Location," for specifying the post’s location.
                3. **Description**: A larger rectangular box labeled "Description," allowing the user to add a detailed description of the post.
        - **Bottom Button**:
            - Below the description box, there is a "Post" button in a rounded rectangle, for submitting and publishing the new post.
        - **Bottom Navigation Bar**:
            - The same navigation bar as in other sketches is present here, with five icon buttons
    - **New Event Scree:** A screen for creating a food event, including set an schedule, description input, and location tagging.
        - **Top Section**:
            - A header at the very top with the label "New Event" in a hand-drawn, casual font style.
            - To the left of the "New Event" title, there is a back arrow icon, suggesting a way to navigate back to the previous screen.
        - **Form Fields**:
            - A series of labeled input fields for creating a new event:
                1. **Title**: An empty rectangular box labeled "Title," likely for entering the event's name.
                2. **Location**: A similar box below "Title," labeled "Location," for specifying the event’s location.
                3. **Description**: Another box labeled "Description" for adding details about the event.
                4. **Schedule**: A labeled section "Schedule," followed by a calendar.
        - **Calendar Section**:
            - A horizontal calendar is shown with the month "Oct 2024" labeled on the left side.
            - Days of the week (Sun, Mon, Tue, etc.) are displayed as headers above numbered dates.
            - A small left arrow ("<") and right arrow (">") surround the month label, allowing users to navigate between months.
            - Specific dates (1 to 12) are displayed, with one date (likely today's date) highlighted by a circle.
        - **Bottom Button**:
            - Below the calendar, there is an "ADD" button in a rounded rectangle, allowing users to finalize and save the new event.
        - **Bottom Navigation Bar**:
            - The same navigation bar as on the previous sketches is present here, with five icon buttons
    - **User Profile Screen:** A screen for displaying basic account and user profile information.
        - **Top Section**:
            - A header at the top labeled "XX's Profile" in a hand-drawn, casual font style. The "XX" part seems to be a placeholder for the user's name.
        - **Profile Icon**:
            - Below the header, there is a circular icon representing the user’s profile picture. Inside the circle, a simple profile avatar is depicted.
        - **Profile Information Section**:
            - Beneath the profile icon, there is a section for displaying basic profile information or bio.
            - Three wavy lines are drawn, symbolizing text lines, likely representing a short bio or personal information about the user.
        - **Bottom Navigation Bar**:
            - The same bottom navigation bar as in other sketches is present here, with five icon buttons
    - **Events Screen:** A screen for viewing current events, adding and delete the existing events.
        - **Top Section**:
            - A header at the top labeled "Events" in a casual, hand-drawn font.
            - To the right of the "Events" title, there is an "ADD" button in a rounded rectangle, allowing users to add a new event.
        - **Events List**:
            - This section displays a vertical list of events, each represented by a rectangular card.
            - Each event card includes:
                - The event name (e.g., "Event 1" and "Event 2") at the top.
                - A few wavy lines under the event name, likely representing a brief description or additional details about the event.
                - Two buttons within each event card:
                    - **Delete** (in red) for removing the event.
                    - **Edit** (in blue) for modifying event details.
            - There are multiple events shown (two visible), with dots below the cards indicating that more events can be scrolled through.
        - **Bottom Navigation Bar**:
            - The same bottom navigation bar as in other sketches is present here, with five icon buttons
        - **Reminder Popup :**
            - **Popup Window**:
                - This smaller pop-up window has a header labeled "Reminder" in a casual font.
                - Below the header, it displays the name of the event being reminded about (e.g., "Event 1").
                - A few wavy lines under the event name represent a brief description or details of the reminder.
            - **Confirmation Button**:
                - At the bottom of the popup, there is an "OK" button in a rounded rectangle, allowing the user to acknowledge and dismiss the reminder.
            - **Reminder Note**:
                - To the right of the events list, there is a small handwritten note that says "reminds at the day," indicating that this reminder popup will appear on the day of the event.

**CRUD operations for each page:**

### **1. Main Page (Feed)**

- **Read:**
    - Users can browse the feed to see food stories shared by themselves and others.
    - Users can view details of individual posts, including photos, descriptions, locations, and comments.

### **2. Map Page**

- **Read:**
    - Users can view restaurant locations on the interactive map, including user-generated pins and restaurant info fetched from external APIs.
    - Users can tap on map markers to read details about restaurants, reviews, and ratings.
- **Create:**
    - Users can directly create new food post or event of selected restaurant on the map.

### **3. Post Page**

- **Create:**
    - Users can create new food posts by uploading photos, adding descriptions, and selecting the location of the meal.
    - Users can tag recipes, restaurants, or events related to the post.

### **4. Events Page**

- **Create:**
    - Users can create new events, such as food festivals, restaurant openings, or cooking plans.
    - Users can add event details, set reminders.
- **Read:**
    - Users can browse upcoming events in a calendar view or list format, seeing details like dates, descriptions, and locations.
- **Update:**
    - Users can edit their events, changing dates, times, descriptions, or reminders.
- **Delete:**
    - Users can delete their events, removing them from the calendar and reminders.

### **5. Profile Page**

- **Create:**
    - Users can add personal details during initial setup or add new information (e.g., bio, profile photo).
- **Read:**
    - Users can view their own profile, including their profile photo and account infomation.
- **Update:**
    - Users can edit their profiles, updating details like their bio, profile photo, preferences, or saved collections.
    

**Notification feature integrated into the event system:**

- Events reminders

**Camera usage scenario:**

- Post a new post with a photo or taking a photo

**Location services usage:**

- Display nearby food spots on the map
- Mark current location

## Database Collections

1. Users Collection

```
Copy
users/{userId}
- email: string
- displayName: string
- bio: string
- profileImage: string
- dietaryPreferences: array
- favoriteRestaurants: array
- savedRecipes: array
- following: array
- followers: array
- createdAt: timestamp
- lastActive: timestamp

```

1. Posts Collection

```
Copy
posts/{postId}
- userId: string
- type: string (recipe/restaurant/general)
- images: array
- caption: string
- location: geopoint
- placeName: string
- tags: array
- likes: array
- comments: subcollection
- createdAt: timestamp
- updatedAt: timestamp

```

1. Events Collection

```
Copy
events/{eventId}
- userId: string
- title: string
- description: string
- type: string (opening/tasting/cooking)
- date: timestamp
- location: geopoint
- placeName: string
- reminder: boolean
- reminderTime: timestamp
- attendees: array
- status: string
- createdAt: timestamp

```