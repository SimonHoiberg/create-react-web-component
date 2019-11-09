import createProject from './createProject';
import chalk from 'chalk';
import boxen from 'boxen';

const warning = `Warning! 
create-react-web-component is deprecated.
Use ${chalk.greenBright('direflow-cli')} instead.

Read more:
${chalk.blueBright('https://direflow.io/')}`;

export async function cli(args: string[]) {
  const box = boxen(warning, { padding: 1, align: 'center', margin: 1});
  console.log(chalk.yellow(box));
  try {
    createProject();
  } catch (err) {
    console.log('');
    console.log('Something went wrong while setting up your project');
    console.log('ERROR: ' + err.message);
  }
}
