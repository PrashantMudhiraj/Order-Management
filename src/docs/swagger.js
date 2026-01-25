// src/docs/swagger.js
import fs from "fs";
import path from "path";
import yaml from "yaml";

const filePath = path.join(process.cwd(), "/src/docs/openapi/v1.yaml");
export const openApiSpec = yaml.parse(fs.readFileSync(filePath, "utf8"));
