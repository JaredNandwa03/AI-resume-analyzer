export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

/**
 * Fallback function that returns a default image when PDF conversion fails
 */
function getDefaultImage(fileName: string): Promise<PdfConversionResult> {
    return new Promise((resolve) => {
        // Use a default image from the public folder
        const defaultImageUrl = "/images/pdf.png";
        
        // Create a new image to load the default image
        const img = new Image();
        img.crossOrigin = "anonymous";
        
        img.onload = () => {
            // Create a canvas to draw the image
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw the image on the canvas
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                
                // Convert canvas to blob
                canvas.toBlob((blob) => {
                    if (blob) {
                        const originalName = fileName.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });
                        
                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        resolve({
                            imageUrl: defaultImageUrl,
                            file: null,
                            error: "Using default image (fallback)"
                        });
                    }
                }, "image/png");
            } else {
                resolve({
                    imageUrl: defaultImageUrl,
                    file: null,
                    error: "Using default image (fallback)"
                });
            }
        };
        
        img.onerror = () => {
            console.error("Failed to load default image");
            resolve({
                imageUrl: defaultImageUrl,
                file: null,
                error: "Using default image URL (fallback)"
            });
        };
        
        img.src = defaultImageUrl;
    });
}

/**
 * Simplified PDF to image conversion that uses a more reliable approach
 */
export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        // Basic validation
        if (!file || file.type !== 'application/pdf') {
            console.error("Invalid file type:", file.type);
            return getDefaultImage(file.name);
        }
        
        // Create a URL for the PDF file
        const pdfUrl = URL.createObjectURL(file);
        
        // Dynamically import PDF.js only when needed
        try {
            // @ts-expect-error - pdfjs-dist import
            const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
            pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
            
            // Load the PDF document
            const loadingTask = pdfjs.getDocument(pdfUrl);
            const pdf = await loadingTask.promise;
            
            if (!pdf || pdf.numPages < 1) {
                console.error("Invalid PDF document or no pages");
                return getDefaultImage(file.name);
            }
            
            // Get the first page
            const page = await pdf.getPage(1);
            
            // Set up canvas with a fixed size for better reliability
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
            
            const canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            const context = canvas.getContext("2d");
            if (!context) {
                console.error("Could not create canvas context");
                return getDefaultImage(file.name);
            }
            
            // Fill with white background
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            // Render the PDF page
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
            
            // Convert to image
            return new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    if (blob) {
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });
                        
                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        console.error("Failed to create blob");
                        return getDefaultImage(file.name);
                    }
                }, "image/png", 0.9);
            });
            
        } catch (pdfError) {
            console.error("PDF.js error:", pdfError);
            return getDefaultImage(file.name);
        } finally {
            // Clean up the URL object
            URL.revokeObjectURL(pdfUrl);
        }
    } catch (err) {
        console.error("PDF conversion error:", err);
        return getDefaultImage(file.name);
    }
}