import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
// @ts-ignore
import { createRequest } from "solid-start/runtime/fetch.js";
// @ts-ignore
import prepareManifest from "solid-start/runtime/prepareManifest.js";
import { fetch, Headers, Response, Request } from "undici";
import entry from "./app.js";

Object.assign(globalThis, {
  Request,
  Response,
  fetch
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  readFileSync(join(__dirname, "..", "..", "dist", "rmanifest.json"), "utf-8")
);
const assetManifest = JSON.parse(
  readFileSync(join(__dirname, "..", "..", "dist", "manifest.json"), "utf-8")
);
prepareManifest(manifest, assetManifest);

export default async (req: any) => {
  req.headers = {};
  req.method = "GET";
  const webRes = await entry({
    request: createRequest(req),
    responseHeaders: new Headers(),
    manifest
  });
  return webRes.text();
};
