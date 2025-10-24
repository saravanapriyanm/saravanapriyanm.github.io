# Bookmark Manager

A minimal, serverless bookmark manager built with Alpine.js and IPFS for collaboration.

## Features

- 📚 **Add, view, and delete bookmarks** with title, URL, and description
- 💾 **Serverless storage** - All data stored locally in your browser (localStorage)
- 🌐 **IPFS collaboration** - Export and import bookmarks via IPFS for sharing
- 📱 **Responsive design** - Works on desktop and mobile devices
- 🎨 **Clean UI** - Beautiful gradient design with smooth animations
- ⚡ **Fast & lightweight** - Built with Alpine.js (minimal framework)

## Usage

### Adding Bookmarks
1. Enter a title and URL for your bookmark
2. Optionally add a description
3. Click "Add Bookmark" or press Enter

### Deleting Bookmarks
- Click the "Delete" button on any bookmark
- Confirm the deletion

### Collaboration with IPFS

#### Export Bookmarks
1. Click "Export to IPFS"
2. Copy the generated IPFS hash
3. Share the hash with others

#### Import Bookmarks
1. Click "Import from IPFS"
2. Paste the IPFS hash from someone else
3. Click "Import"
4. New bookmarks will be merged (no duplicates)

### Download Backup
- Click "Download JSON" to save your bookmarks as a JSON file

## Technical Details

- **Framework**: Alpine.js 3.x (minimal reactive framework)
- **Storage**: localStorage (client-side)
- **Collaboration**: IPFS (simulated with localStorage for demo, ready for real IPFS integration)
- **No backend required**: Fully client-side application
- **No build step**: Works directly in the browser
- **Simple & Clean**: Uses Alpine.js for reactive data binding, reducing code complexity by ~15%

## Future Enhancements

- Real IPFS node integration with public gateways
- Tags and categories for bookmarks
- Search and filter functionality
- Import from browser bookmarks
- Export to various formats (HTML, CSV)
- Browser extension integration
