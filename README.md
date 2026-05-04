# FileFlow Organizer CLI

[![npm version](https://img.shields.io/npm/v/fileflow-organizer-cli.svg)](https://www.npmjs.com/package/fileflow-organizer-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/fileflow-organizer-cli)](https://nodejs.org/)
[![Build Status](https://img.shields.io/github/actions/workflow/status/md-abu-kayser/fileflow-organizer-cli/ci.yml)](https://github.com/md-abu-kayser/fileflow-organizer-cli/actions)
[![Downloads](https://img.shields.io/npm/dm/fileflow-organizer-cli.svg)](https://www.npmjs.com/package/fileflow-organizer-cli)

A powerful, lightweight Node.js CLI tool designed to automatically organize messy files into well-structured, categorized folders based on file extensions. Perfect for developers, data analysts, and anyone dealing with cluttered directories. Built with performance and extensibility in mind.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Commands](#commands)
- [Configuration](#configuration)
- [Examples](#examples)
- [File Categories](#file-categories)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

✨ **Intelligent File Detection**: Automatically detects and categorizes files based on extensions  
🚀 **High Performance**: Optimized for large directories with minimal memory footprint  
🔧 **Customizable Categories**: Easily extend or modify file type mappings  
📁 **Safe Operations**: Preview mode to review changes before applying  
🔄 **Undo Functionality**: Revert organization if needed (planned feature)  
🌐 **Cross-Platform**: Works on Windows, macOS, and Linux  
📊 **Detailed Logging**: Comprehensive logs for transparency and debugging  
🛡️ **Error Handling**: Robust error handling with graceful fallbacks  
🎨 **Colorful Output**: Enhanced CLI experience with colored terminal output

## Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (comes with Node.js)

### Global Installation (Recommended)

```bash
npm install -g fileflow-organizer-cli
```

### Local Installation

```bash
git clone https://github.com/md-abu-kayser/fileflow-organizer-cli.git
cd fileflow-organizer-cli
npm install
npm link  # Optional: to use globally
```

### Verify Installation

```bash
fileflow --version
# or
node file-organizer.js --version
```

## Quick Start

1. **Initialize** your project directory:

   ```bash
   fileflow init
   ```

2. **Organize** your files:

   ```bash
   fileflow organize
   ```

3. **Preview** changes first (recommended):
   ```bash
   fileflow organize --preview
   ```

That's it! Your files are now neatly organized.

## Usage

### Basic Syntax

```bash
fileflow [command] [options]
```

### Global Options

- `-h, --help`: Display help information
- `-v, --version`: Show version number
- `--verbose`: Enable verbose logging
- `--dry-run`: Simulate operations without making changes

## Commands

### `init`

Initialize the organizer in the current directory. Creates necessary configuration files and sets up the workspace.

```bash
fileflow init [options]
```

**Options:**

- `--force`: Overwrite existing configuration
- `--template <name>`: Use a specific template

### `organize`

Organize files in the current directory based on predefined categories.

```bash
fileflow organize [options] [directory]
```

**Options:**

- `-p, --preview`: Show what would be organized without making changes
- `-r, --recursive`: Organize files in subdirectories recursively
- `-f, --force`: Overwrite existing files without confirmation
- `--exclude <patterns>`: Exclude files matching glob patterns
- `--include <patterns>`: Only include files matching glob patterns
- `--target <directory>`: Specify target directory for organized files

**Examples:**

```bash
# Organize current directory
fileflow organize

# Preview organization
fileflow organize --preview

# Organize recursively
fileflow organize --recursive

# Organize specific directory
fileflow organize /path/to/messy/folder

# Exclude certain files
fileflow organize --exclude "*.tmp,*.log"
```

### `help`

Display help information for commands.

```bash
fileflow help [command]
```

## Configuration

FileFlow uses a simple JSON configuration file (`fileflow.config.json`) for customization.

### Default Configuration

```json
{
  "categories": {
    "archives": ["zip", "rar", "7z", "tar", "gz"],
    "audio": ["mp3", "wav", "flac", "aac", "ogg"],
    "code": ["js", "py", "java", "cpp", "html", "css", "php"],
    "documents": ["pdf", "doc", "docx", "txt", "rtf"],
    "images": ["jpg", "jpeg", "png", "gif", "bmp", "svg"],
    "spreadsheets": ["xls", "xlsx", "csv"],
    "videos": ["mp4", "avi", "mkv", "mov", "wmv"],
    "others": []
  },
  "options": {
    "recursive": false,
    "overwrite": false,
    "verbose": false
  }
}
```

### Customizing Categories

Add or modify categories in your `fileflow.config.json`:

```json
{
  "categories": {
    "my-custom-category": ["ext1", "ext2", "ext3"]
  }
}
```

## Examples

### Example 1: Organizing a Downloads Folder

```bash
cd ~/Downloads
fileflow init
fileflow organize --preview
fileflow organize
```

**Before:**

```
Downloads/
├── project.zip
├── song.mp3
├── photo.jpg
├── document.pdf
├── script.py
└── data.csv
```

**After:**

```
Downloads/
├── organized/
│   ├── archives/
│   │   └── project.zip
│   ├── audio/
│   │   └── song.mp3
│   ├── images/
│   │   └── photo.jpg
│   ├── documents/
│   │   └── document.pdf
│   ├── code/
│   │   └── script.py
│   └── spreadsheets/
│       └── data.csv
└── fileflow.config.json
```

### Example 2: Recursive Organization

```bash
fileflow organize --recursive /path/to/large/project
```

This will organize files in all subdirectories, maintaining the folder structure.

### Example 3: Custom Exclusions

```bash
fileflow organize --exclude "*.log,*.tmp,node_modules/**"
```

Excludes log files, temporary files, and the entire `node_modules` directory.

## File Categories

| Category     | Extensions                        | Description        |
| ------------ | --------------------------------- | ------------------ |
| Archives     | zip, rar, 7z, tar, gz             | Compressed files   |
| Audio        | mp3, wav, flac, aac, ogg          | Audio files        |
| Code         | js, py, java, cpp, html, css, php | Programming files  |
| Documents    | pdf, doc, docx, txt, rtf          | Text documents     |
| Images       | jpg, jpeg, png, gif, bmp, svg     | Image files        |
| Spreadsheets | xls, xlsx, csv                    | Data spreadsheets  |
| Videos       | mp4, avi, mkv, mov, wmv           | Video files        |
| Others       | \*                                | Unrecognized files |

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Setup

```bash
git clone https://github.com/md-abu-kayser/fileflow-organizer-cli.git
cd fileflow-organizer-cli
npm install
npm run dev  # If available
```

### Testing

```bash
npm test
npm run test:watch
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 **Email**: abu.kayser.official.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/md-abu-kayser/fileflow-organizer-cli/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/md-abu-kayser/fileflow-organizer-cli/discussions)
- 📖 **Documentation**: [Wiki](https://github.com/md-abu-kayser/fileflow-organizer-cli/wiki)

---

**Made with ❤️ by [Md Abu Kayser](https://github.com/md-abu-kayser)**

_Star this repo if you find it useful!_ ⭐
