# Hospital Staff Hierarchy Diagram

A simple project to generate a visual hierarchy diagram of hospital staff from a PostgreSQL database.

## Prerequisites

- Node.js (v14+)
- PostgreSQL
- npm

## Setup

### 1. Install Dependencies

bash
npm install


### 2. Configure Environment Variables

Copy the example environment file and add your credentials:

bash
cp .env.example .env


Then edit .env with your actual database credentials:

env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_actual_password


*Important:* The .env file is in .gitignore and will NOT be committed to git.

### 3. Setup Database

Run the SQL script in pgAdmin or via command line:

bash
psql -U postgres -d postgres -f hospital_Riley_Lana.sql


Or open pgAdmin, connect to your database, and execute hospital_Riley_Lana.sql in the Query Tool.

## Run

Generate the Mermaid diagram file:

bash
node generate_diagram.js


This creates hospital_hierarchy.mmd.

## Generate PNG/SVG

### Option 1: Online (Recommended)

1. Copy contents of hospital_hierarchy.mmd
2. Go to https://mermaid.live/
3. Paste and download as PNG and SVG

### Option 2: Command Line

bash
npx mmdc -i hospital_hierarchy.mmd -o image.png
npx mmdc -i hospital_hierarchy.mmd -o hospital_SVG.svg


Note: Requires Chromium installed in your system.

## Project Structure


.
├── .env                       # Your credentials (NOT in git)
├── .env.example               # Example credentials (IN git)
├── .gitignore                 # Excludes sensitive files
├── hospital_Riley_Lana.sql    # Database schema
├── generate_diagram.js        # Main script
├── package.json               # Dependencies
├── package-lock.json          # Dependency lock file
├── README.md                  # This file
├── hospital_hierarchy.mmd     # Generated Mermaid file
├── image.png                  # Generated diagram (PNG)
└── hospital_SVG.svg           # Generated diagram (SVG)


## Submission Files

The following files were handed in:
- hospital_Riley_Lana.sql - Database schema with data
- hospital_source code.zip - Source code package
- image.png - PNG hierarchy diagram
- hospital_SVG.svg - SVG hierarchy diagram
- README.md - This documentation

## Security Note

The .env file contains sensitive database credentials and is excluded from version control via .gitignore. Use .env.example as a template to create your own .env file locally.

## Hierarchy Structure

The database contains a simple staff hierarchy:
- Medical Director (top level)
- Head of Department
- Attending Physician
- Residents/Interns
- Nursing Staff
- Physician Assistants
- Medical Assistants

Each staff member has an id, name, and parent_id (references their supervisor).