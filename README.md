MenuPage Component:

Displays a list of menu items fetched from an API.
Users can add items to their order by clicking the "Add to Order" button.
The order summary, table number, and contact number are displayed at the top.
Orders are saved to localStorage, which allows order history persistence.
If the API request fails, an error message is displayed.
OrderHistoryPage Component:

Displays a list of past orders retrieved from localStorage.
Shows the table number, contact number (if provided), items ordered, and the total price for each order.
If there are no orders in the history, it shows a "No orders found" message.
App Component:

Implements routing between the MenuPage and OrderHistoryPage using React Router.
Includes a simple navigation menu with links to both pages.
Uses Link for navigation between the pages and Routes to handle different routes.
CSS Styles:

MenuPage Styles:
Styled the menu layout, images, order form, and buttons to make the menu visually appealing and organized.
The current order section and the "Add to Order" buttons are styled for better user experience.
OrderHistoryPage Styles:
Styled the order history list, making each order block clear and separating it with borders for easy readability.
Ensured the layout is clean with a minimalist design for the order details and totals.
App Component Styles:
The navigation bar has been styled with a green background and white text, creating a simple and effective header.
Added hover effects to the links, making them more interactive.
Made the navigation responsive, so it works well on both desktop and mobile devices.
Key Features:
Order Placement: Users can select items from the menu and place an order by entering their table number. Orders are stored locally for persistence.
Order History: Displays past orders with details such as time, date, table number, and total price. This history is retrieved from local storage.
Navigation: Easy access to the menu and order history through a responsive navigation bar.
This structure provides a complete menu and order management system, allowing users to place orders, review them, and view their order history. The routing and state management ensure a smooth experience.
