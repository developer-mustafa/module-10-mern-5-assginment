import http from 'http';
import fs from 'fs';
import { createServer } from 'http';
import { parse } from 'url';
import { writeFile } from 'fs/promises';
import multer from 'multer';

const PORT = 5500;

const server = createServer(async (req, res) => {
  const { pathname } = parse(req.url, true);

  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is Home Page');
  } else if (pathname === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is About Page');
  } else if (pathname === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is Contact Page');
  } else if (pathname === '/file-write') {
    try {
      await writeFile('demo.txt', 'hello world');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File created and content written successfully!');
    } catch (error) {
      console.error('Error writing file:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else if (pathname === '/upload') {
    // Example using multer for file upload
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    upload.single('file')(req, res, (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        const uploadedFile = req.file;
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`File uploaded successfully! Original name: ${uploadedFile.originalname}`);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
