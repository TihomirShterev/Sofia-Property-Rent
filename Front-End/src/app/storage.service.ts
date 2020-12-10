import { PLATFORM_ID, Provider } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";

interface IStorage {
  setItem<T>(key: string, item: T): T;
  getItem<T>(key: string): T;
}

export class StorageService implements IStorage {
  setItem<T>(key, item): T { return item; }
  getItem<T>(key): T { return null; }
}

export function storageFactory(platformId: string): any {
  if (isPlatformBrowser(platformId)) {
    return new BrowserStorage();
  }

  if (isPlatformServer(platformId)) {
    return new ServerStorage();
  }

  throw new Error("No implementation for this platform" + platformId);
}

export const storageServiceProvider: Provider = {
  provide: StorageService,
  useFactory: storageFactory,
  deps: [PLATFORM_ID]
}

export class BrowserStorage {
  localStorage = localStorage;

  setItem<T>(key: string, item: T): T {
    const str = typeof item === "string" ? item : JSON.stringify(item);
    this.localStorage.setItem(key, str);

    return item;
  }

  getItem<T>(key: string): T {
    let item;
    const tmp = this.localStorage.getItem(key); // tmp -> temporary

    if (!tmp) { return null; }

    try {
      item = JSON.parse(tmp);
    } catch {
      item = tmp;
    }
    
    return item;
  }
}

// този сървис ще го използваме, когато искаме да правим server side rendering за приложението
export class ServerStorage {
// понеже на сървъра нямаме localStorage, си имплементираме обект, 
// който симулира API-a, който localStorage-a има
  localStorage = {
    data: {},
    setItem<T>(key: string, item: T): void {
      this.data[key] = item;
    },
    getItem<T>(key: string): T {
      return this.data[key];
    }
  };

  setItem<T>(key: string, item: T): T {
    this.localStorage.setItem(key, JSON.stringify(item));

    return item;
  }

  getItem<T>(key: string): T {
    let item;
    const tmp = this.localStorage.getItem(key) as any;

    if (!tmp) { return null; }

    try {
      item = JSON.parse(tmp);
    } catch {
      item = tmp;
    }
    
    return item;
  }
}