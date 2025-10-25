# 🌍 Batutta Board — The Traveler’s Connection Hub

**Batutta Board** is a sleek, minimal web app that connects travelers, explorers, and adventure-seekers in one simple interface.
Create, share, and discover travel plans effortlessly — all in one dashboard.

---

## ✨ Features

![First page](https://raw.githubusercontent.com/aditi21paul/BatuttaBoard/054c3c0006f5553a9cd7b62f29741b7101f3766a/images/p1.jpg)

* 🔐 **Login / Sign Up System** – Users can securely register and log in to manage their travel cards.

![Login page](https://raw.githubusercontent.com/aditi21paul/BatuttaBoard/604a10931d8b5b0d08b2dcb7a46ff43671097d87/images/p2.jpg)

and if signing up for the first time

![Sign up page](https://raw.githubusercontent.com/aditi21paul/BatuttaBoard/8559ea307c41a1c0d119b73ba55dff22b0e30516/images/p12.jpg)

* 🧭 **Dashboard View** – Displays all existing travel cards with trip details like source, destination, date, and contact info.

![Dashboard](https://raw.githubusercontent.com/aditi21paul/BatuttaBoard/054c3c0006f5553a9cd7b62f29741b7101f3766a/images/p3.jpg)

* 🪄 **Create Card Modal** – Add new trips with an elegant pop-up modal form.

![Create travel card](https://raw.githubusercontent.com/aditi21paul/BatuttaBoard/054c3c0006f5553a9cd7b62f29741b7101f3766a/images/p9.jpg)

![View travel card in dashboard](https://raw.githubusercontent.com/aditi21paul/BatuttaBoard/054c3c0006f5553a9cd7b62f29741b7101f3766a/images/p10.jpg)

* 🧹 **Filter Cards** – Instantly filter trips by *source* or *destination* for easy discovery.

![No filter](https://raw.githubusercontent.com/aditi21paul/BatuttaBoard/054c3c0006f5553a9cd7b62f29741b7101f3766a/images/p4.jpg)

![Filter source](https://raw.githubusercontent.com/aditi21paul/BatuttaBoard/054c3c0006f5553a9cd7b62f29741b7101f3766a/images/p5.jpg)

![Filter destination](https://raw.githubusercontent.com/aditi21paul/BatuttaBoard/054c3c0006f5553a9cd7b62f29741b7101f3766a/images/p6.jpg)

Both filters can be applied simultaneously as well.

* 🧑‍💻 **Edit / Delete** – Modify or remove your own travel cards anytime.

When we click on edit,
![Edit card](https://raw.githubusercontent.com/aditi21paul/BatuttaBoard/054c3c0006f5553a9cd7b62f29741b7101f3766a/images/p7.jpg)

* 🎨 **Clean UI** – Styled with a calm, adventure-inspired color palette:
  `#22577A`, `#38A3A5`, `#57CC99`, `#B6FFD7`


* 🚪 **Logout Functionality** – Securely sign out once done exploring.
 ![Menu](https://raw.githubusercontent.com/aditi21paul/BatuttaBoard/054c3c0006f5553a9cd7b62f29741b7101f3766a/images/p11.jpg)

From the menu we can choose logout to logout, it redirects to the sign in page.

---

## 🧰 Tech Stack

* **Frontend:** ReactJS
* **Styling:** CSS3
* **Backend:** MongoDB , NodeJS
* **State Management:** React Hooks (`useState`, `useEffect`,..)
* **Icons & UI Enhancements:** FontAwesome / React Icons

---

## 📁 Folder Structure

```
public/
├── index.html
src/
├── components/
│   ├── Dashboard.jsx
│   ├── Header.jsx        
│   ├── Modal.jsx
│   └── TravelCard.jsx
├── pagess/
│   ├── Home.jsx
│   ├── Login.jsx     
│   ├── PersonalDashboard.jsx
│   └── SignUp.jsx
├── App.jsx
├── index.js
├── style.css
package.json
```

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1️ Clone the repository

```bash
git clone https://github.com/your-username/batutta-board.git
cd batutta-board
```

### 2️ Install dependencies in frontend and backend folder separately 

```bash
npm install
```

### 3️ Configure the environment in backend folder by adding a process.env file

### 4 Start frontend in one terminal and consequently start backend in another terminal using 

```bash
npm start
```

### 5 Open the app

Visit  [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ How It Works

1. **Sign up or log in** with your details.
2. **Create a travel card** by entering source, destination, date, time, and contact.
3. View other user all trips on your **Dashboard**.
4. View all your trips on your **Personal Dashboard**.
5. Use the **filter bar** to find matching trips.
6. **Edit or delete** your cards when needed.
7. **Log out** once done — your data stays safe.

---

## 💡 Inspiration

> “Traveling – it leaves you speechless, then turns you into a storyteller.” – *Ibn Battuta*

Batutta Board brings that spirit online — a space where journeys start not with maps, but with connections.

---

## 🧑‍🎨 Authors

**Aditi Paul**
📍 Computer Science B.Tech Student at NIT Warangal 
✔️ Frontend, look and feel

**Nahad Bin Noushad**
📍 Computer Science B.Tech Student at NIT Warangal 
✔️ Backend and deployment

---

