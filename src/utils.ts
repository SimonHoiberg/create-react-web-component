export function toTitleFormat(name: string) {
  if (name.includes('-')) { 
    const wordList = name.split('-');
    const capitalized = wordList.map((w) => {
      return w.charAt(0).toUpperCase() + w.slice(1);
    });

    return capitalized.join(' ');
  } else {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return capitalized.replace(/([A-Z])/g, ' $1').trim();
  }
}

export function toSnakeCase(name: string) {
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  const snaked = capitalized.replace(/([A-Z])/g, '-$1').slice(1);
  return snaked.toLowerCase();
}

export function toPascalCase(name: string) {
  const wordList = name.split('-');
  const capitalized = wordList.map((w) => {
    return w.charAt(0).toUpperCase() + w.slice(1);
  });

  return capitalized.join('');
}