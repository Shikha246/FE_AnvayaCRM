# 🚀 Customer Relationship Management (LeadFlow CRM)

A full-stack CRM (Customer Relationship Management) application built using the MERN stack.
This application helps businesses manage leads, sales agents, customer interactions, and workflows efficiently in one place.

---

## 🔗 Live Demo

[View Live Demo](https://fe-anvaya-crm.vercel.app/)

---

## ⚡ Quick Start

Clone the repository and run the project locally.

```bash
git clone https://github.com/Shikha246/FE_AnvayaCRM.git

cd CRM_FE

npm install

npm run dev
```
---
## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Bootstrap
* Axios
* React Icons
* React Toastify
* React ChartJS 2

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Development Tools

* Vite
* Git & GitHub
* Postman

### Additional Libraries Used

| Library          | Purpose                                                                         |
| ---------------- | ------------------------------------------------------------------------------- |
| Axios            | Used for making API requests between the frontend and backend                   |
| Bootstrap        | Provides responsive and reusable UI components                                  |
| React Router DOM | Handles navigation and routing within the application                           |
| React Icons      | Adds icons to improve the user interface                                        |
| React Toastify   | Displays success, error, and warning notifications                              |
| React ChartJS 2  | Creates charts and visualizations for reports and analytics                     |
| Mongoose         | Simplifies MongoDB database operations and schema management                    |
| dotenv           | Manages environment variables securely                                          |
| cors             | Enables communication between frontend and backend running on different origins |
| nodemon          | Automatically restarts the server during development                            |



---
## 🎥 Demo Video

Watch a walkthrough of all major features of the application:

[Watch Demo Video](https://drive.google.com/file/d/1rFAa8O_2LYcFtmOx1moZbP04VuSSfkzp/view?usp=sharing)

---

## ✨ Features

### 📌 Lead Management

* Add new leads
* Edit lead information
* Delete leads
* Assign leads to sales agents
* Update lead status throughout the sales process
* Set lead priority and add tags

### 👨‍💼 Sales Agent Management

* Add, update, and delete sales agents
* View leads assigned to each sales agent
* Unassign leads when required

### 📝 Comments & Notes

* Add comments and notes to leads
* Keep track of customer interactions and follow-ups
* View comment history for each lead

### 🔍 Filtering & Sorting

* Filter leads by status, source, priority, and assigned agent
* Sort leads for easier management
* Quickly search and find specific leads

### 📊 Dashboard & Reports

* View lead statistics and status distribution
* Track lead performance using charts
* Monitor overall sales pipeline activity

### 📱 Responsive User Interface

* Mobile-friendly design
* Responsive layout for desktop, tablet, and mobile devices

### 🔗 REST API Integration

* Connected frontend and backend using REST APIs
* Supports complete CRUD operations

### ⚡ Additional Features

* Form validation
* Real-time data updates
* Clean and easy-to-use interface


---

## 🔐 Environment Variables

Create a `.env` file in the backend directory and add:

```env
MONGODB=your_mongodb_atlas_connection_string
PORT=5000
```

Replace `your_mongodb_atlas_connection_string` with your own MongoDB Atlas connection string.

---

## 📡 API Reference

### Lead Routes

| Method | Endpoint | Description |
|---------|------------|-------------|
| POST | `/leads` | Create a new lead |
| GET | `/leads` | Get all leads |
| GET | `/leads/stats` | Get lead statistics |
| GET | `/leads/:id` | Get a single lead by ID |
| PUT | `/leads/:id` | Update lead details |
| DELETE | `/leads/:id` | Delete a lead |
| PUT | `/leads/unassign/:agentId` | Unassign all leads from a sales agent |

---

## Create Lead

### Request

`POST /leads`

```json
{
  "name": "John Doe",
  "source": "Website",
  "salesAgent": "6842f3b9d1a4f12ab345678",
  "status": "new",
  "tags": ["High Value", "Follow-up"],
  "timeToClose": 30,
  "priority": 1
}
```

### Response

```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "6846e6b9f5c8b71234567890",
    "name": "John Doe",
    "source": "Website",
    "status": "new",
    "priority": 1,
    "createdAt": "2026-05-29T10:30:15.123Z"
  }
}
```

---

## Get All Leads

### Request

`GET /leads`

### Response

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "6846e6b9f5c8b71234567890",
      "name": "John Doe",
      "status": "qualified"
    },
    {
      "_id": "6846e7a2f5c8b71234567891",
      "name": "Sarah Smith",
      "status": "contacted"
    }
  ]
}
```

---

## Lead Statistics

### Request

`GET /leads/stats`

### Response

```json
{
  "success": true,
  "data": {
    "totalLeads": 120,
    "new": 35,
    "contacted": 28,
    "qualified": 22,
    "proposalSent": 15,
    "closed": 20
  }
}
```
---

## 👨‍💼 Sales Agent API Reference

### Agent Routes

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| POST   | `/agents`     | Create a new sales agent   |
| GET    | `/agents`     | Get all sales agents       |
| PUT    | `/agents/:id` | Update sales agent details |
| DELETE | `/agents/:id` | Delete a sales agent       |

---

## Create Sales Agent

### Request

`POST /agents`

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com"
}
```

### Response

```json
{
  "success": true,
  "message": "Sales agent created successfully",
  "data": {
    "_id": "6846e6b9f5c8b71234567890",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "createdAt": "2026-05-29T10:30:15.123Z"
  }
}
```

---

## Get All Sales Agents

### Request

`GET /agents`

### Response

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "6846e6b9f5c8b71234567890",
      "name": "Rahul Sharma",
      "email": "rahul@example.com"
    },
    {
      "_id": "6846e7a2f5c8b71234567891",
      "name": "Priya Verma",
      "email": "priya@example.com"
    }
  ]
}
```

---

## Update Sales Agent

### Request

`PUT /agents/:id`

```json
{
  "name": "Rahul Kumar",
  "email": "rahulkumar@example.com"
}
```

### Response

```json
{
  "success": true,
  "message": "Sales agent updated successfully",
  "data": {
    "_id": "6846e6b9f5c8b71234567890",
    "name": "Rahul Kumar",
    "email": "rahulkumar@example.com"
  }
}
```

---

## Delete Sales Agent

### Request

`DELETE /agents/:id`

### Response

```json
{
  "success": true,
  "message": "Sales agent deleted successfully"
}
```

---

## 📬 Contact

For bugs, issues, or feature requests, feel free to reach out:

📧 **[ramrakhyani.shikha@gmail.com](mailto:ramrakhyani.shikha@gmail.com)**

---

## 👩‍💻 Author

Built with ❤️ by **Shikha Ramrakhyani**
