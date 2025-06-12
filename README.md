# Medium Content Engine: A Node.js Application

This Node.js application serves as a powerful backend engine to fetch, parse, and deliver curated content from Medium. Stop wrestling with unreliable RSS feeds and complex parsing—deploy this service to power your frontend applications with a clean, structured stream of articles.

It's designed to be the content backend for your custom-built widgets, article sections, or news feeds on any website or application.

<br>

<p align="center">
  <em>The final result: A beautiful, content-rich component on your frontend, powered by this Node.js app.</em>
    <img width="549" alt="Medium Widget landing page example" src="https://github.com/user-attachments/assets/2c4687a7-221a-4004-a9ae-e924c070aaf0" />
</p>

<br>

## ⚙️ How It Works

This application runs as a standalone Node.js service. You configure it with the Medium topics you want to track, and it exposes a simple API endpoint. Your frontend (built with React, Vue, Svelte, Angular, or anything else) can then fetch data from this endpoint to receive a consistently formatted JSON payload, ready for rendering.

It effectively acts as your personal, self-hosted "Medium Content API."

## Core Features for Developers

This project is built to save you development time and provide a reliable data source for your projects.

* **🔧 Configurable Content Curation:** In the configuration, specify the exact Medium topics you need (e.g., `ai`, `javascript`, `cybersecurity`). The application handles all the aggregation logic.
* **📡 Robust Data Fetching:** It reliably fetches and processes multiple articles, ensuring your application always has a fresh stream of content to display.
* **✨ Frontend-Ready JSON Response:** The API delivers pre-formatted data, saving you valuable parsing and data-cleaning time on the client side. The structured response for each article includes:
    * `title`
    * `featuredImageUrl`
    * `introduction`
    * `articleUrl`
* **🚀 Built to Be Deployed:** A lightweight Node application, perfect for deploying on services like Heroku, Vercel, or any standard server environment.

---

## Example Use Cases

Use this Node.js application to:

* Power the "Latest Articles" section of a corporate website or portfolio.
* Create a dedicated content feed for a niche topic browser.
* Build a dynamic news widget inside your web application's dashboard.

<br>

<p align="center">
  <em>Example of the data rendered in a list-style view.</em>
  <img width="879" alt="Medium Widget in action" src="https://github.com/user-attachments/assets/4aa2aa9e-6ac7-488a-9281-04e939952b21" />
</p>

<br>

---

## Getting Started

To get your own Medium Content Engine running:

1.  **Clone the repository.**
    ```sh
    git clone https://github.com/RishabhRai2202/MediumWidget.git
    ```
2.  **Install dependencies.**
    ```sh
    cd MediumWidget
    npm install
    ```
3.  **Configure.**
    Update the configuration file with your desired topics.

4.  **Run the application.**
    ```sh
    npm start
    ```
Your local content API is now live and ready to be used by your frontend projects!
