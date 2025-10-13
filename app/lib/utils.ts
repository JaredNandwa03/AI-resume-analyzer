import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a file size in bytes to a human-readable string (KB, MB, GB)
 * @param bytes - The size in bytes
 * @param decimals - Number of decimal places to show (default: 2)
 * @returns A formatted string with appropriate unit
 */
export function formatSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
  // Calculate the appropriate unit
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Format with the specified number of decimals
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}
export const generateUUID = () => {
  return crypto.randomUUID();
}
