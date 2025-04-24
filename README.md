# Capstone-Final
Capstone Final Threat Dashboard
# Threat Intelligence Dashboard

A **dark-themed**, **responsive** web application for real-time cybersecurity monitoring and analysis. Built with **Next.js 13** (App Router) and **React**, styled using **Tailwind CSS** and **shadcn/ui**, and backed by **MongoDB** for live data. This dashboard aggregates threat intelligence—such as TTPs, phishing campaigns, vulnerability stats, and news reports—and presents it through interactive charts and widgets, allowing security teams to track **severity trends**, **geographic distributions**, and **incident timelines** at a glance.

## Key Features

- **Modern Dark UI**  
  Sleek, professional look with carefully chosen accent colors for data clarity.
- **Responsive Design**  
  Mobile-first layout that adapts seamlessly from smartphones to large desktops.
- **Interactive Visualizations**  
  - Donut chart for issue-status breakdown  
  - Bar chart for hosts by country  
  - Line chart for severity over time  
  All charts support tooltips, hover states, and dynamic resizing.
- **Real-Time Data**  
  API routes (`/api/threats`, `/api/stats`, `/api/reports`, `/api/news`) fetch live records from MongoDB.
- **Modular Components**  
  Each UI element lives in its own React component, ensuring maintainability and easy extensibility.
- **Accessibility**  
  ARIA attributes and full keyboard navigation support.

## Tech Stack

- **Frontend:** Next.js 13, React, Tailwind CSS, shadcn/ui, Chart.js  
- **Backend:** Next.js API Routes, Node.js  
- **Database:** MongoDB (Atlas)  
- **Deployment:** Vercel (Serverless functions + static build)  

