// Minimal sanitizer: strips <script> tags. For production, prefer a library like DOMPurify.
export function sanitizeHtml(html) {
  if (typeof html !== 'string') return '';
  return html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
}


