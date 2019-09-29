import fs from 'fs';

export interface INames {
  title: string;
  pascal: string;
  snake: string;
}

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

export async function changeNameInfile(file: string, changeWhere: RegExp, changeTo: string) {
  const changedFile = await new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        reject('Could not read file');
      }

      const changed = data.replace(changeWhere, changeTo);

      resolve(changed);
    });
  });

  await new Promise((resolve, reject) => {
    fs.writeFile(file, changedFile, 'utf-8', err => {
      if (err) {
        reject('Could not write file');
      }

      resolve();
    });
  });
}

export function createDefaultName(name: string) {
  const snakeName = toSnakeCase(name);

  if (!snakeName.includes('-')) {
    return `${snakeName}-component`
  }

  return snakeName;
}