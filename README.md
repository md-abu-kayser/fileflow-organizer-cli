# FileFlow Organizer CLI

<p align="center">
  <strong>A lightweight Node.js CLI for automatically organizing files into clean, categorized directories.</strong>
</p>

<p align="center">
  <a href="#features">Features</a>
  ·
  <a href="#installation">Installation</a>
  ·
  <a href="#quick-start">Quick Start</a>
  ·
  <a href="#usage">Usage</a>
  ·
  <a href="#configuration">Configuration</a>
  ·
  <a href="#contributing">Contributing</a>
</p>

---

## Overview

**FileFlow Organizer CLI** is a lightweight command-line utility built with Node.js that helps organize cluttered directories by automatically sorting files into categorized folders based on their extensions.

It is designed for developers, data analysts, students, power users, and anyone who regularly works with large or unstructured directories.

FileFlow focuses on:

* Simple command-line usage
* Predictable file categorization
* Safe file operations
* Configurable file categories
* Cross-platform compatibility
* Clear terminal feedback
* Automation-friendly workflows

---

## Features

* **Intelligent File Detection** — Categorizes files based on their extensions.
* **Fast Organization** — Designed to process directories efficiently with minimal overhead.
* **Custom Categories** — Extend or modify file-type mappings through configuration.
* **Preview Mode** — Review planned file operations before making changes.
* **Recursive Organization** — Process files inside nested directories.
* **Include & Exclude Filters** — Control which files are processed.
* **Target Directory Support** — Send organized files to a specific destination.
* **Detailed Logging** — Provides useful terminal output for visibility and debugging.
* **Graceful Error Handling** — Handles common filesystem problems without unnecessarily terminating the workflow.
* **Cross-Platform** — Designed for Windows, macOS, and Linux environments.
* **Colorful CLI Output** — Provides a clearer command-line experience.

> **Note:** Undo functionality is planned and is not currently presented as a completed feature.

---

## Installation

### Prerequisites

* Node.js `14.x` or newer
* npm

Check your installed versions:

```bash
node --version
npm --version
```

### Install from npm

The recommended approach is to install FileFlow globally:

```bash
npm install -g fileflow-organizer-cli
```

Verify the installation:

```bash
fileflow --version
```

### Install from Source

Clone the repository and install the project dependencies:

```bash
git clone https://github.com/md-abu-kayser/fileflow-organizer-cli.git
cd fileflow-organizer-cli
npm install
```

To make the local CLI available globally during development:

```bash
npm link
```

Verify:

```bash
fileflow --version
```

---

## Quick Start

The basic workflow is straightforward.

### 1. Initialize

Initialize FileFlow in the current directory:

```bash
fileflow init
```

### 2. Preview Changes

Before modifying files, inspect what FileFlow intends to do:

```bash
fileflow organize --preview
```

### 3. Organize Files

Apply the organization:

```bash
fileflow organize
```

For most users, the recommended workflow is:

```bash
fileflow init
fileflow organize --preview
fileflow organize
```

---

## Usage

### Basic Syntax

```bash
fileflow [command] [options]
```

### Global Options

| Option          | Description                                 |
| --------------- | ------------------------------------------- |
| `-h, --help`    | Display help information                    |
| `-v, --version` | Display the installed version               |
| `--verbose`     | Enable verbose logging                      |
| `--dry-run`     | Simulate operations without modifying files |

---

## Commands

### `init`

Initializes FileFlow in the current working directory and creates the required configuration.

```bash
fileflow init
```

#### Options

| Option              | Description                             |
| ------------------- | --------------------------------------- |
| `--force`           | Overwrite an existing configuration     |
| `--template <name>` | Use a predefined configuration template |

---

### `organize`

Organizes files according to the configured file categories.

```bash
fileflow organize [options] [directory]
```

#### Options

| Option                 | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `-p, --preview`        | Preview organization without moving files      |
| `-r, --recursive`      | Process nested directories recursively         |
| `-f, --force`          | Overwrite existing files without confirmation  |
| `--exclude <patterns>` | Exclude files matching specified patterns      |
| `--include <patterns>` | Process only files matching specified patterns |
| `--target <directory>` | Specify the destination directory              |

#### Examples

Organize the current directory:

```bash
fileflow organize
```

Preview changes:

```bash
fileflow organize --preview
```

Organize recursively:

```bash
fileflow organize --recursive
```

Organize a specific directory:

```bash
fileflow organize /path/to/messy/folder
```

Exclude temporary and log files:

```bash
fileflow organize --exclude "*.tmp,*.log"
```

Specify a target directory:

```bash
fileflow organize --target ./organized
```

---

### `help`

Display help for FileFlow or a specific command:

```bash
fileflow help
```

```bash
fileflow help organize
```

---

## How File Organization Works

FileFlow uses file extensions to determine an appropriate category.

For example:

```text
project.zip    → archives/
song.mp3       → audio/
photo.jpg      → images/
document.pdf   → documents/
script.py      → code/
data.csv       → spreadsheets/
movie.mp4      → videos/
```

This approach provides predictable and configurable organization without requiring users to manually sort files.

---

## Configuration

FileFlow uses a JSON configuration file named:

```text
fileflow.config.json
```

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

### Custom Categories

You can define your own categories by adding file extensions to the configuration.

Example:

```json
{
  "categories": {
    "design-files": ["fig", "sketch", "xd"],
    "compressed": ["zip", "rar", "7z"]
  }
}
```

This makes FileFlow adaptable to different workflows and project requirements.

---

## File Categories

| Category     | Extensions                                      | Description                       |
| ------------ | ----------------------------------------------- | --------------------------------- |
| Archives     | `zip`, `rar`, `7z`, `tar`, `gz`                 | Compressed files                  |
| Audio        | `mp3`, `wav`, `flac`, `aac`, `ogg`              | Audio files                       |
| Code         | `js`, `py`, `java`, `cpp`, `html`, `css`, `php` | Programming files                 |
| Documents    | `pdf`, `doc`, `docx`, `txt`, `rtf`              | Text and document files           |
| Images       | `jpg`, `jpeg`, `png`, `gif`, `bmp`, `svg`       | Image files                       |
| Spreadsheets | `xls`, `xlsx`, `csv`                            | Spreadsheet and tabular files     |
| Videos       | `mp4`, `avi`, `mkv`, `mov`, `wmv`               | Video files                       |
| Others       | `*`                                             | Files without a matching category |

---

## Examples

### Example 1 — Organizing a Downloads Directory

Start with:

```text
Downloads/
├── project.zip
├── song.mp3
├── photo.jpg
├── document.pdf
├── script.py
└── data.csv
```

Run:

```bash
cd ~/Downloads

fileflow init

fileflow organize --preview

fileflow organize
```

The resulting structure can look like:

```text
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

---

### Example 2 — Recursive Organization

Process nested directories:

```bash
fileflow organize --recursive /path/to/project
```

This enables FileFlow to process files contained within subdirectories.

---

### Example 3 — Exclude Files

Exclude temporary and log files:

```bash
fileflow organize --exclude "*.log,*.tmp"
```

Exclude an entire directory pattern:

```bash
fileflow organize --exclude "*.log,*.tmp,node_modules/**"
```

---

### Example 4 — Preview Before Applying Changes

A safer workflow is:

```bash
fileflow organize --preview
```

Review the output first, then execute:

```bash
fileflow organize
```

---

## Safety Considerations

File organization modifies the filesystem, so it is important to review operations before applying them.

For safer usage:

```bash
fileflow organize --preview
```

Recommended practices:

1. Review preview output before running an organization operation.
2. Keep important files backed up.
3. Test custom configuration changes on a non-critical directory first.
4. Use include/exclude filters when processing large or sensitive directories.

---

## Development

### Clone the Repository

```bash
git clone https://github.com/md-abu-kayser/fileflow-organizer-cli.git
cd fileflow-organizer-cli
```

### Install Dependencies

```bash
npm install
```

### Development Commands

Use the scripts defined in `package.json`:

```bash
npm run dev
```

> The `dev` script must exist in `package.json` for this command to work.

### Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

> The `test:watch` script must exist in `package.json` for this command to work.

---

## Project Goals

FileFlow is intended to evolve into a reliable, extensible command-line file management utility.

Potential future improvements include:

* Undo and rollback support
* More advanced rule-based organization
* Improved duplicate-file handling
* Additional configurable actions
* Enhanced test coverage
* More granular logging
* Expanded file-type detection
* Additional CLI integrations

---

## Contributing

Contributions are welcome.

Before making a contribution, please review the project's contribution guidelines:

**[Contributing Guide](CONTRIBUTING.md)**

### Development Workflow

Fork the repository:

```bash
git clone https://github.com/md-abu-kayser/fileflow-organizer-cli.git
cd fileflow-organizer-cli
npm install
```

Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

Make your changes, test them, and commit:

```bash
git add .
git commit -m "feat: add your feature"
```

Push the branch:

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request against the main repository.

### Contribution Guidelines

Please keep contributions:

* Focused and maintainable
* Tested where applicable
* Consistent with the existing codebase
* Clearly documented
* Free from unnecessary breaking changes

---

## Issues & Discussions

Found a bug or have an improvement idea?

**Bug reports and feature requests:**
[Open an Issue](https://github.com/md-abu-kayser/fileflow-organizer-cli/issues)

**Questions and community discussions:**
[GitHub Discussions](https://github.com/md-abu-kayser/fileflow-organizer-cli/discussions)

**Project documentation:**
[GitHub Wiki](https://github.com/md-abu-kayser/fileflow-organizer-cli/wiki)

---

## License

FileFlow Organizer CLI is released under the **MIT License**.

See the complete license text in:

[LICENSE](LICENSE)

The MIT License is an OSI-approved open-source license.

---

## Author

Created and maintained by **Md. Abu Kayser**.

* GitHub: [@md-abu-kayser](https://github.com/md-abu-kayser)
* Repository: [fileflow-organizer-cli](https://github.com/md-abu-kayser/fileflow-organizer-cli)

---

## Support the Project

If FileFlow Organizer CLI is useful to you, consider giving the repository a ⭐ on GitHub.

Your feedback, issues, and contributions help improve the project.

---

<p align="center">
  Built with Node.js and ❤️ for developers who like organized files.
</p>
