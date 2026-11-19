const fs = require('fs');
const path = require('path');

const WORKER_URL = 'https://ieee-pes-upload-worker.ieeepeskc.workers.dev';
const BEARER = 'test-token-123';
const DIR = path.join(__dirname, '../public/images/ieee-images/execom25');
const PAGE_FILE = path.join(__dirname, '../app/pages/execom25.js');

const files = [
    { name: 'Deepthi N_.jpg', key: 'DEEPTHI N' },
    { name: 'Jes Gigo_.jpg', key: 'JES GIGO' }
];

async function uploadOne(fileName) {
    const filePath = path.join(DIR, fileName);
    const fileBuffer = fs.readFileSync(filePath);
    const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('file', blob, fileName);
    formData.append('folder', 'execom');
    formData.append('fileName', fileName.replace(/[^a-zA-Z0-9.-]/g, '-'));

    const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${BEARER}` },
        body: formData,
    });
    const json = await res.json();
    if (!json.success || !json.url) throw new Error(JSON.stringify(json));
    return json.url;
}

async function run() {
    let pageSrc = fs.readFileSync(PAGE_FILE, 'utf-8');
    for (const item of files) {
        console.log(`Uploading ${item.name} ...`);
        const url = await uploadOne(item.name);
        console.log(`  ✓ Uploaded -> ${url}`);
        
        const regex = new RegExp(`(\\{ name: '${item.key}',\\s+role: '[^']+',\\s+imageUrl: ')[^']+(' \\})`);
        pageSrc = pageSrc.replace(regex, `$1${url}$2`);
    }
    fs.writeFileSync(PAGE_FILE, pageSrc, 'utf-8');
    console.log('Successfully updated app/pages/execom25.js with new URLs!');
}

run().catch(console.error);
