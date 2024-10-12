# Godown-App
## Installation
To install this project, first clone the repository using

```git clone https://github.com/joltcops/Godown-App.git```

Then go to the project directory

```cd warehouse```

Install requirements

```pip install -r requirements.txt```

Run the Dockerfile

```docker-compose up --build```

This will start the app on localhost 300

On the terminal, click on http://localhost:3000 or type in your browser



To run locally,

Go to the project directory

```cd warehouse```

Install requirements

```pip install -r requirements.txt```

Open terminal and type in

```cd backend```

```python3 manage.py runserver``` or if your system uses python 2, type

```python manage.py runserver```

In a new terminal, type

```cd warehouse```

```cd frontend```

```npm start```

This will start the app on localhost 3000

## Conceptualisation

State Management (useState):

The component manages several pieces of state:<br>
godowns: Stores the list of all godowns fetched from the backend.<br>
items: Stores the list of items associated with each godown.<br>
expandedGodowns: Tracks which godowns have been expanded (showing their sub-godowns).<br>
selectedItem: Stores the currently selected item to display its details in the main content area.<br>
Fetching Data (axios & useEffect):<br>
The useEffect hook is used to fetch godowns and items data from the backend API (/api/godowns/ and /api/items/) when the component first renders.<br>
Axios is used to make HTTP GET requests for fetching the data.<br>

Godown Expansion Logic:<br>
The hierarchy of godowns and sub-godowns is displayed using buttons that can expand or collapse sections.<br>
A Set called expandedGodowns is used to track which godowns are expanded.<br>
The function handleExpandClick adds or removes a godown's ID to/from the set to toggle its expanded state.<br>

Recursive Rendering of Sub-Godowns:<br>
The renderSubGodowns function is recursive, meaning it calls itself to render sub-godowns within parent godowns.<br>
It checks if a godown has a parent_godown and recursively renders sub-godowns and their items if they exist.<br>
This allows for dynamically nesting godowns and sub-godowns at any level.<br>

Displaying Items:<br>
Items belonging to a godown are filtered and displayed under the respective godown.<br>
When an item is clicked, its details (e.g., name, quantity, category, etc.) are displayed in the main content section using the selectedItem state.<br>

Example of Hierarchical Rendering:<br>
Godowns and Sub-Godowns: Parent godowns are displayed first. When a user clicks the "+" button next to a godown, it expands to show sub-godowns and the items within that godown.<br>
Recursive Functionality: The renderSubGodowns function recursively processes each godown’s children, allowing for a multi-level hierarchy (e.g., godown → sub-godown → sub-sub-godown).<br>
Dynamic UI: Expanding and collapsing godowns dynamically alters the UI, with only the relevant child godowns and items shown when a parent is expanded.<br>

Frontend Deployment Link:<br>
"https://warehouse-hn7kavbv3-pracheta-sahas-projects.vercel.app" 

Backend Deployment Link:<br>
"https://obscure-badlands-67498-8ccc889a168e.herokuapp.com/api/" (Deployment done, but with errors, so it hasn't been integrated with the deployed frontend)

Demo Video Link:<br>
https://drive.google.com/file/d/1Lbux2_Oc7vdTl4R84WGK26ksIB0gFAJb/view?usp=drive_link# Warehouse
# Warehouse
