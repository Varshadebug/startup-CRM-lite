import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const classMappings = {
  'bg-white': 'bg-white dark:bg-gray-800',
  'bg-gray-50': 'bg-gray-50 dark:bg-gray-900',
  'bg-slate-800': 'bg-slate-800 dark:bg-slate-900',
  'text-gray-900': 'text-gray-900 dark:text-white',
  'text-gray-800': 'text-gray-800 dark:text-gray-100',
  'text-gray-600': 'text-gray-600 dark:text-gray-300',
  'text-gray-500': 'text-gray-500 dark:text-gray-400',
  'border-gray-200': 'border-gray-200 dark:border-gray-700',
  'border-gray-100': 'border-gray-100 dark:border-gray-800',
};

const dirs = [
  path.join(__dirname, 'src', 'components'),
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src'),
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      // skip Navbar as we manually edited it
      if (file === 'Navbar.jsx' || file === 'DarkModeToggle.jsx') continue;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      for (const [key, value] of Object.entries(classMappings)) {
        // match key if it's not followed by " dark:" or " " (whitespace) + dark variant
        // To be safe, let's just do a simple replace with regex matching word boundary
        const regex = new RegExp(`\\b${key}\\b(?![\\s'"]+dark:)`, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, value);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    // Only process top level for src, excluding components and pages to avoid double processing
    if (dir.endsWith('src')) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
         const fullPath = path.join(dir, file);
         if (!fs.statSync(fullPath).isDirectory() && fullPath.endsWith('.jsx')) {
           let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            for (const [key, value] of Object.entries(classMappings)) {
              const regex = new RegExp(`\\b${key}\\b(?![\\s'"]+dark:)`, 'g');
              if (regex.test(content)) {
                content = content.replace(regex, value);
                modified = true;
              }
            }

            if (modified) {
              fs.writeFileSync(fullPath, content, 'utf8');
              console.log(`Updated ${fullPath}`);
            }
         }
      })
    } else {
      processDirectory(dir);
    }
  }
});

console.log('Dark mode classes applied.');
