const fs = require("fs/promises");
const path = require("path");

const ROOT_DIR = __dirname;
const OUTPUT_DIR = path.join(ROOT_DIR, "output");
const SOURCE_DIR = path.join(OUTPUT_DIR, "messy-files");
const ORGANIZED_DIR = path.join(OUTPUT_DIR, "organized");

const CATEGORIES = {
  images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"],
  documents: [".pdf", ".doc", ".docx", ".txt", ".rtf", ".md"],
  videos: [".mp4", ".avi", ".mkv", ".mov", ".wmv", ".webm"],
  audio: [".mp3", ".wav", ".flac", ".aac", ".ogg"],
  code: [".js", ".ts", ".jsx", ".tsx", ".py", ".java", ".cpp", ".html", ".css"],
  archives: [".zip", ".rar", ".tar", ".gz", ".7z", ".tar.gz"],
  spreadsheets: [".xls", ".xlsx", ".csv"],
  others: [],
};

const SAMPLE_FILES = [
  "vacation.jpg",
  "report.pdf",
  "presentation.pptx",
  "music.mp3",
  "video.mp4",
  "script.js",
  "data.csv",
  "archive.zip",
  "photo.png",
  "notes.txt",
  "app.py",
  "movie.avi",
  "song.wav",
  "backup.tar.gz",
  "random.xyz",
  "nodejs.zip",
];

function printHeader() {
  console.log("");
  console.log("========================================");
  console.log("        FileFlow Organizer CLI");
  console.log("========================================");
  console.log("");
}

function printHelp() {
  printHeader();
  console.log("Usage:");
  console.log("  node file-organizer.js init");
  console.log("  node file-organizer.js organize");
  console.log("  node file-organizer.js help");
  console.log("");
  console.log("Commands:");
  console.log("  init       Create sample messy files and category folders");
  console.log("  organize   Copy files into organized category folders");
  console.log("");
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function initializeDirectories() {
  await ensureDir(SOURCE_DIR);
  await ensureDir(ORGANIZED_DIR);

  for (const category of Object.keys(CATEGORIES)) {
    await ensureDir(path.join(ORGANIZED_DIR, category));
  }

  for (const fileName of SAMPLE_FILES) {
    const filePath = path.join(SOURCE_DIR, fileName);

    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, `Content of ${fileName}\n`, "utf8");
    }
  }

  console.log("Sample files and folders are ready.");
}

function getCategory(fileName) {
  const lowerName = fileName.toLowerCase();

  if (lowerName.endsWith(".tar.gz")) {
    return "archives";
  }

  const ext = path.extname(lowerName);

  for (const [category, extensions] of Object.entries(CATEGORIES)) {
    if (extensions.includes(ext)) {
      return category;
    }
  }

  return "others";
}

async function organizeFiles() {
  try {
    await ensureDir(SOURCE_DIR);
    await ensureDir(ORGANIZED_DIR);

    for (const category of Object.keys(CATEGORIES)) {
      await ensureDir(path.join(ORGANIZED_DIR, category));
    }

    const entries = await fs.readdir(SOURCE_DIR, { withFileTypes: true });

    const files = entries.filter((entry) => entry.isFile());

    if (files.length === 0) {
      console.log("No files found to organize.");
      return;
    }

    const stats = {
      total: 0,
      byCategory: {},
    };

    console.log("");
    console.log("File organizer running...");
    console.log(`Source      : ${SOURCE_DIR}`);
    console.log(`Destination : ${ORGANIZED_DIR}`);
    console.log("--------------------------------------------------");

    for (const file of files) {
      const sourcePath = path.join(SOURCE_DIR, file.name);
      const category = getCategory(file.name);
      const destPath = path.join(ORGANIZED_DIR, category, file.name);

      await fs.copyFile(sourcePath, destPath);

      const fileStats = await fs.stat(sourcePath);

      stats.total += 1;
      stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;

      console.log(`${file.name}  ->  ${category}  (${fileStats.size} bytes)`);
    }

    console.log("--------------------------------------------------");
    console.log(`Total files organized: ${stats.total}`);
    console.log("Category summary:", stats.byCategory);
    console.log("Done.");
  } catch (error) {
    console.error("Failed to organize files.");
    console.error(error.message);
    process.exitCode = 1;
  }
}

async function main() {
  printHeader();

  const command = process.argv[2];

  switch (command) {
    case "init":
      await initializeDirectories();
      break;

    case "organize":
      await organizeFiles();
      break;

    case "help":
    case undefined:
      printHelp();
      break;

    default:
      console.log(`Unknown command: ${command}`);
      printHelp();
      process.exitCode = 1;
      break;
  }
}

main();
