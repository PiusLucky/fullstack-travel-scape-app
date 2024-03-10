import Cookies from "js-cookie";
import { storageKeys } from "./storageKeys";
import { COOKIE_EXPIRY_TIME } from "@/lib/constants";

class CookieStorageManager {
  // Add an item to cookie
  addOrUpdateItem<T>(key: string, value: T): void {
    try {
      let formattedValue = "";
      if (typeof value === "string") {
        formattedValue = value;
      } else {
        formattedValue = JSON.stringify(value);
      }
      Cookies.set(key, formattedValue, {
        expires: COOKIE_EXPIRY_TIME,
      });
    } catch (error) {
      console.error("Error adding item to cookie:", error);
    }
  }

  // Retrieve an item from cookie
  getItem<T>(key: string): T | null {
    try {
      const item = Cookies.get(key);
      if (item) {
        return JSON.parse(item) as T;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving item from cookie:", error);
      return null;
    }
  }

  // Remove an item from cookie
  removeItem(key: string): void {
    try {
      Cookies.remove(key);
    } catch (error) {
      console.error("Error removing item from cookie:", error);
    }
  }

  clearAll(): void {
    const allKeys = Object.values(storageKeys);
    for (let key of allKeys) {
      this.removeItem(key);
    }
  }
}

export default CookieStorageManager;
