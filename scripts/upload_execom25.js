/**
 * upload_execom25.js
 *
 * What this script does:
 *  1. Reads all images from public/images/ieee-images/execom25/
 *  2. Uploads each one to Cloudflare R2 via the Worker API
 *  3. Updates app/pages/execom25.js  — replaces local /images/... paths
 *     with the new Cloudflare URLs so images are served from CDN
 *
 * Run from the project root:
 *   node scripts/upload_execom25.js
 *
 * Requirements: Node 18+ (uses native fetch). No extra packages needed.
 */

const fs   = require('fs');
const path = require('path');

// ── Config ────────────────────────────────────────────────────────────────────
const WORKER_URL  = 'https://ieee-pes-upload-worker.ieeepeskc.workers.dev';
const BEARER      = 'test-token-123';
const IMAGES_DIR  = path.join(__dirname, '../public/images/ieee-images/execom25');
const PAGE_FILE   = path.join(__dirname, '../app/pages/execom25.js');

// ── Helper: upload one file ───────────────────────────────────────────────────
async function uploadFile(filePath, fileName) {
    const ext  = path.extname(fileName).toLowerCase();
    const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
               : ext === '.png'  ? 'image/png'
               : ext === '.webp' ? 'image/webp'
               : ext === '.gif'  ? 'image/gif'
               : 'application/octet-stream';

    const fileBuffer = fs.readFileSync(filePath);
    const blob       = new Blob([fileBuffer], { type: mime });

    const formData = new FormData();
    formData.append('file', blob, fileName);
    formData.append('folder', 'execom');

    const res = await fetch(`${WORKER_URL}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${BEARER}` },
        body: formData,
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Upload failed for "${fileName}": ${res.status} ${text}`);
    }

    const json = await res.json();
    // Worker returns { url: "https://..." }
    if (!json.url) throw new Error(`No URL returned for "${fileName}": ${JSON.stringify(json)}`);
    return json.url;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
    // 1. List files in execom25 folder
    const files = fs.readdirSync(IMAGES_DIR).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
    });

    if (files.length === 0) {
        console.log('No image files found in', IMAGES_DIR);
        return;
    }

    console.log(`\nFound ${files.length} images to upload:\n`);
    files.forEach(f => console.log('  •', f));
    console.log('');

    // 2. Upload each file and collect { localPath → cloudflareUrl }
    const urlMap = {}; // key = "/images/ieee-images/execom25/<filename>"

    for (const fileName of files) {
        const filePath  = path.join(IMAGES_DIR, fileName);
        const localPath = `/images/ieee-images/execom25/${fileName}`;

        process.stdout.write(`Uploading "${fileName}" ... `);
        try {
            const url = await uploadFile(filePath, fileName);
            urlMap[localPath] = url;
            console.log('✓', url);
        } catch (err) {
            console.error('✗ FAILED:', err.message);
        }
    }

    // 3. Patch execom25.js — replace local paths with Cloudflare URLs
    console.log('\nPatching app/pages/execom25.js ...');
    let src = fs.readFileSync(PAGE_FILE, 'utf-8');

    let changed = 0;
    for (const [localPath, cdnUrl] of Object.entries(urlMap)) {
        // The local path appears inside single-quoted strings in the JSX
        const escaped = localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(`'${escaped}'`, 'g');
        const before = src;
        src = src.replace(re, `'${cdnUrl}'`);
        if (src !== before) changed++;
    }

    fs.writeFileSync(PAGE_FILE, src, 'utf-8');
    console.log(`Done — replaced ${changed} image URL(s) with Cloudflare CDN links.\n`);

    // 4. Summary
    console.log('='.repeat(60));
    console.log('UPLOAD COMPLETE');
    console.log('='.repeat(60));
    console.log('Next steps:');
    console.log('  git add app/pages/execom25.js');
    console.log('  git commit -m "Use Cloudflare CDN URLs for EXCOM 25 images"');
    console.log('  git push origin main');
    console.log('');
}

main().catch(err => {
    console.error('\nFatal error:', err);
    process.exit(1);
});
