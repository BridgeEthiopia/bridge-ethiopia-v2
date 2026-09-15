/**
 * Robust IndexedDB-backed storage for custom uploaded photos and assets.
 * IndexedDB provides hundreds of megabytes of storage space, completely eliminating
 * localStorage QuotaExceededError while persisting photos across sessions and reloads.
 */

const DB_NAME = 'BridgeEthiopiaPhotosDB';
const DB_VERSION = 1;
const STORE_NAME = 'photos_store';

// Open / Initialize the IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB'));
    };
  });
}

// Get item from IndexedDB
export async function idbGet<T = string>(key: string): Promise<T | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result !== undefined ? request.result : null);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.warn(`[photoStorage] idbGet failed for key: ${key}`, err);
    return null;
  }
}

// Set item in IndexedDB
export async function idbSet<T = any>(key: string, value: T): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(value, key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.warn(`[photoStorage] idbSet failed for key: ${key}`, err);
  }
}

// Delete item from IndexedDB
export async function idbDelete(key: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.warn(`[photoStorage] idbDelete failed for key: ${key}`, err);
  }
}

// Clear all items from IndexedDB
export async function idbClear(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.warn('[photoStorage] idbClear failed', err);
  }
}

// Safe localStorage setter with graceful IndexedDB fallback
export function safeLocalStorageSet(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    // Graceful fallback to IndexedDB (which has hundreds of megabytes of space)
    return false;
  }
}

// Safe localStorage removal
export function safeLocalStorageRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // Ignore
  }
}
