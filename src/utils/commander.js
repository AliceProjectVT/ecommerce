import { Command } from "commander";

const program = new Command();
program 
.option(`--mode <mode>`, `Modo ejecución de App`, `development`)
.parse();

export default program;


