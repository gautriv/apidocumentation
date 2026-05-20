import fs from 'fs';
import path from 'path';

console.log("Generating OG images...");
const docsDir = path.join(process.cwd(), '_docs');
const ogDir = path.join(process.cwd(), 'assets', 'images', 'og');
if (!fs.existsSync(ogDir)) fs.mkdirSync(ogDir, { recursive: true });

const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));
files.forEach(file => {
  const slug = file.replace('.md', '');
  fs.writeFileSync(path.join(ogDir, `${slug}.png`), 'mock-png-content');
});
console.log(`Generated ${files.length} OG images.`);
