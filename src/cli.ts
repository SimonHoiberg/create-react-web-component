import createProject from './createProject';
import updateProject from './updateProject';
import { checkArg } from './utils';

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

