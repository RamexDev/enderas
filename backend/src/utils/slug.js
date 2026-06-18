import slugifyLib from 'slugify';

export function generateSlug(text) {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}
