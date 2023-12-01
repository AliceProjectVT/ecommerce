import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parentDirname = path.join(__dirname, '..');


export default parentDirname;


export { parentDirname as __dirname };