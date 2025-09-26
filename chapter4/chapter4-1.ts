type Language = {
  de: URL;
  en: URL;
  fr: URL;
  ja: URL;
};

function isAvailable<Obj extends object>(
  obj: Obj,
  key: string | number | symbol
): key is keyof Obj {
  return key in obj;
}

console.log(
  isAvailable<Language>({ 
    de: new URL('https://example.com/de'), 
    en: new URL('https://example.com/en'), 
    fr: new URL('https://example.com/fr'), 
    ja: new URL('https://example.com/ja') 
  }, 'de'));
