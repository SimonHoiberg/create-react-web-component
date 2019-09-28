import createProject from './createProject';

export async function cli(args: string[]) {
  try {
    createProject();
    
  } catch (err) {
    console.log('');
    console.log('Something went wrong while setting up your project');
    console.log('ERROR: ' + err.message);
  }
}
