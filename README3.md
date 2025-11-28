# Hospital Staff Hierarchy Diagram

A simple project to generate a visual hierarchy diagram of hospital staff from a PostgreSQL database.

## Prerequisites

- Node.js (v14+)
- PostgreSQL
- npm

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

Run the SQL script in pgAdmin or via command line:

```bash
psql -U postgres -d postgres -f schema.sql
```

Or open pgAdmin, connect to your database, and execute `schema.sql` in the Query Tool.

### 3. Configure Database Connection

Edit `generate_diagram.js` if needed (default settings work for most installations):

```javascript
const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres'  // Change if needed
};
```

## Run

Generate the Mermaid diagram file:

```bash
node generate_diagram.js
```

This creates `hospital_hierarchy.mmd`.

## Generate PNG/SVG

### Option 1: Online (Recommended)

1. Copy contents of `hospital_hierarchy.mmd`
2. Go to https://mermaid.live/
3. Paste and download as PNG and SVG

### Option 2: Command Line

```bash
npx mmdc -i hospital_hierarchy.mmd -o image.png
npx mmdc -i hospital_hierarchy.mmd -o hospital_SVG.svg
```

*Note: Requires Chromium installed in your system.*

## Project Structure

```
.
├── hospital_Riley_Lana.sql              # Database schema
├── hospital_source code.zip   
├── generate_diagram.js     # Main script
├── package.json            # Dependencies
├── package-lock.json 
├── image.png  # Generated diagram (PNG)
└── hospital_SVG.svg  # Generated diagram (SVG)
```

## Hierarchy Structure

The database contains a simple staff hierarchy:
- Medical Director (top level)
- Head of Department
- Attending Physician
- Residents/Interns
- Nursing Staff
- Physician Assistants
- Medical Assistants

Each staff member has an `id`, `name`, and `parent_id` (references their supervisor).
