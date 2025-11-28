const { Client } = require('pg');
const fs = require('fs');
const { exec } = require('child_process');


const dbConfig = {
    host: process.argv[2],
    port: 5432,
    database: 'postgres',
    user: 'hospital_user',
    password: '123'
};


async function generateMermaidDiagram() {
    const client = new Client(dbConfig);

    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');

        const query = 'SELECT id, name, parent_id FROM hospital_staff ORDER BY id';
        const result = await client.query(query);

        console.log(`Found ${result.rows.length} staff members`);

        let mermaidContent = 'graph BT\n';
        mermaidContent += '  subgraph Hospital_Staff_Hierarchy\n';

        result.rows.forEach(row => {
            const nodeId = `node${row.id}`;
            const nodeName = row.name.replace(/"/g, '\\"');

            mermaidContent += `    ${nodeId}["${nodeName}"]\n`;

            if (row.parent_id !== null) {
                const parentId = `node${row.parent_id}`;
                mermaidContent += `    ${nodeId} --> ${parentId}\n`;
            }
        });

        mermaidContent += '  end\n';

        const mermaidFile = 'hospital_hierarchy.mmd';
        fs.writeFileSync(mermaidFile, mermaidContent);
        console.log(`Mermaid diagram saved to ${mermaidFile}`);

        await client.end();
        return mermaidFile;

    } catch (error) {
        console.error('Error:', error);
        await client.end();
        process.exit(1);
    }
}


function convertToImages(mermaidFile) {
    console.log('\nGenerating PNG...');

    exec(`./node_modules/.bin/mmdc -i ${mermaidFile} -o hospital_hierarchy.png`, (error) => {
        if (error) {
            console.error('Error generating PNG:', error);
            return;
        }
        console.log('✅ PNG generated: hospital_hierarchy.png');
    });

    console.log('Generating SVG...');
    exec(`./node_modules/.bin/mmdc -i ${mermaidFile} -o hospital_hierarchy.svg`, (error) => {
        if (error) {
            console.error('Error generating SVG:', error);
            return;
        }
        console.log('✅ SVG generated: hospital_hierarchy.svg');
    });
}

// Main execution
async function main() {
    console.log('=== Hospital Hierarchy Diagram Generator ===\n');
    const mermaidFile = await generateMermaidDiagram();
    setTimeout(() => convertToImages(mermaidFile), 500);
}

main();
