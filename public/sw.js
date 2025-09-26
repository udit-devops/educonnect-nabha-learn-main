// EduConnect Nabha - Service Worker (PWA Foundation)
// This is a basic service worker stub for offline functionality

const CACHE_NAME = 'educonnect-nabha-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('EduConnect SW: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('EduConnect SW: Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log('EduConnect SW: Serving from cache:', event.request.url);
          return response;
        }
        return fetch(event.request);
      })
      .catch(() => {
        // Fallback for offline mode
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('EduConnect SW: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('EduConnect SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// TODO: Add IndexedDB logic for offline data storage
// TODO: Add background sync for quiz submissions
// TODO: Add push notifications for teacher updates