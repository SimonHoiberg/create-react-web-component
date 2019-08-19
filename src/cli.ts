import createProject from './createProject';
import updateProject from './updateProject';

export async function cli(args: string[]) {
  try {
    if (args.length > 2 && checkArg(args[2])) {
      updateProject();
      return;
    }

    createProject();
    
  } catch (err) {
    console.log('');
    console.log('Something went wrong while setting up your project');
    console.log('ERROR: ' + err.message);
  }
}

function checkArg(arg: string): boolean {
  if (arg === '--update') {
    return true;
  }

  if (arg === '-update') {
    return true;
  }

  if (arg === '--u') {
    return true;
  }

  if (arg === '-u') {
    return true;
  }

  return false;
}
