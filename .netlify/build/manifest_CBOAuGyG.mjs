import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_CbkL2QEi.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///E:/repos/aspire-detailing/","cacheDir":"file:///E:/repos/aspire-detailing/node_modules/.astro/","outDir":"file:///E:/repos/aspire-detailing/dist/","srcDir":"file:///E:/repos/aspire-detailing/src/","publicDir":"file:///E:/repos/aspire-detailing/public/","buildClientDir":"file:///E:/repos/aspire-detailing/dist/","buildServerDir":"file:///E:/repos/aspire-detailing/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"form/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/form","isIndex":false,"type":"page","pattern":"^\\/form\\/?$","segments":[[{"content":"form","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/form.html","pathname":"/form","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"success/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/success","isIndex":false,"type":"page","pattern":"^\\/success\\/?$","segments":[[{"content":"success","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/success.astro","pathname":"/success","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["E:/repos/aspire-detailing/src/pages/index.astro",{"propagation":"none","containsHead":true}],["E:/repos/aspire-detailing/src/pages/success.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/form@_@html":"pages/form.astro.mjs","\u0000@astro-page:src/pages/success@_@astro":"pages/success.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CBOAuGyG.mjs","E:/repos/aspire-detailing/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","E:/repos/aspire-detailing/src/assets/gallery_images/IMG_0534_edited.jpg":"chunks/IMG_0534_edited_CylRFyLV.mjs","E:/repos/aspire-detailing/src/assets/gallery_images/IMG_0535_edited.jpg":"chunks/IMG_0535_edited_Duw1ETlI.mjs","E:/repos/aspire-detailing/src/assets/gallery_images/IMG_0541_edited.jpg":"chunks/IMG_0541_edited_DqHrwnlQ.mjs","E:/repos/aspire-detailing/src/assets/gallery_images/IMG_0543_edited.jpg":"chunks/IMG_0543_edited_9EmAIYpb.mjs","E:/repos/aspire-detailing/src/assets/gallery_images/IMG_0545_edited.jpg":"chunks/IMG_0545_edited_sJ1GCG0o.mjs","E:/repos/aspire-detailing/src/assets/gallery_images/IMG_0547_edited.jpg":"chunks/IMG_0547_edited_B1rhuFjw.mjs","E:/repos/aspire-detailing/src/assets/gallery_images/IMG_3520.jpg":"chunks/IMG_3520_Rhva1gOp.mjs","E:/repos/aspire-detailing/src/assets/gallery_images/IMG_3523.jpg":"chunks/IMG_3523_BHZTfbUD.mjs","E:/repos/aspire-detailing/src/assets/gallery_images/IMG_3524.jpg":"chunks/IMG_3524_W0Yf60m-.mjs","E:/repos/aspire-detailing/src/assets/gallery_images/IMG_3526.jpg":"chunks/IMG_3526_DfG_utnf.mjs","E:/repos/aspire-detailing/src/assets/gallery_images/IMG_3528.jpg":"chunks/IMG_3528_DXXPfYQE.mjs","E:/repos/aspire-detailing/src/assets/gallery_images/IMG_3529.jpg":"chunks/IMG_3529_Bej-7BG-.mjs","E:/repos/aspire-detailing/src/components/Gallery.astro?astro&type=script&index=0&lang.ts":"_astro/Gallery.astro_astro_type_script_index_0_lang.DUehadpq.js","E:/repos/aspire-detailing/src/components/Quote_Form.astro?astro&type=script&index=0&lang.ts":"_astro/Quote_Form.astro_astro_type_script_index_0_lang.BRJbbQvF.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["E:/repos/aspire-detailing/src/components/Gallery.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const e=document.getElementById(\"imageModal\"),i=document.getElementById(\"modalImage\"),o=document.querySelector(\".close\");document.querySelectorAll(\".gallery__image-container\").forEach(t=>{t.addEventListener(\"click\",function(){parseInt(this.getAttribute(\"data-image-index\")||\"0\");const c=this.querySelector(\".gallery__image\");e&&i&&c&&(e.style.display=\"flex\",i.src=c.src)})});function n(){e&&(e.style.display=\"none\")}o&&o.addEventListener(\"click\",n),e&&e.addEventListener(\"click\",function(t){t.target===e&&n()}),document.addEventListener(\"keydown\",function(t){t.key===\"Escape\"&&e&&e.style.display===\"flex\"&&n()})});"],["E:/repos/aspire-detailing/src/components/Quote_Form.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const a=document.querySelector(\".quote-form__form\"),i=document.querySelector(\".quote-form__button\");if(!a||!i)return;const l=a.querySelectorAll(\"input, select, textarea\");l.forEach(o=>{o.addEventListener(\"blur\",d),o.addEventListener(\"input\",c)}),a.addEventListener(\"submit\",u);function d(o){const e=o.target,r=document.getElementById(e.id+\"-error\");if(!r)return!0;let n=!0,t=\"\";if(e.hasAttribute(\"required\")&&!e.value.trim()&&(n=!1,t=\"This field is required\"),e.type===\"email\"&&e.value&&(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(e.value)||(n=!1,t=\"Please enter a valid email address\")),e.type===\"tel\"&&e.value){const s=/^[\\+]?[1-9][\\d]{0,15}$/,f=e.value.replace(/[\\s\\-\\(\\)]/g,\"\");s.test(f)||(n=!1,t=\"Please enter a valid phone number\")}return e.id===\"zipcode\"&&e.value&&(/^\\d{5}$/.test(e.value)||(n=!1,t=\"Please enter a valid 5-digit ZIP code\")),n?(r.textContent=\"\",e.classList.remove(\"error\")):(r.textContent=t,e.classList.add(\"error\")),n}function c(o){const e=o.target,r=document.getElementById(e.id+\"-error\");r&&(r.textContent=\"\",e.classList.remove(\"error\"))}function u(o){o.preventDefault();let e=!0;if(l.forEach(t=>{d({target:t})||(e=!1)}),!e){const t=a.querySelector(\".error\");t&&t.focus();return}i.classList.add(\"loading\"),i.disabled=!0;const r=i.querySelector(\".quote-form__button-text\");r&&(r.textContent=\"Sending...\");const n=new FormData(a);fetch(\"/\",{method:\"POST\",headers:{\"Content-Type\":\"application/x-www-form-urlencoded\"},body:new URLSearchParams(n).toString()}).then(t=>{if(t.ok)window.location.href=\"/success\";else throw new Error(\"Form submission failed\")}).catch(t=>{console.error(\"Error:\",t),alert(\"Sorry, there was an error submitting your form. Please try again.\")}).finally(()=>{i.classList.remove(\"loading\"),i.disabled=!1,r&&(r.textContent=\"Get My Quote\")})}});"]],"assets":["/_astro/AspireLogo.CLabubzF.png","/_astro/hero-image.B945moo_.jpg","/_astro/IMG_0541_edited.MPtOzGr2.jpg","/_astro/IMG_0545_edited.pLRlHT_0.jpg","/_astro/IMG_0547_edited.NmWuDuHn.jpg","/_astro/IMG_0534_edited.Dh5StjqO.jpg","/_astro/IMG_0543_edited.D3UXF3XQ.jpg","/_astro/IMG_0535_edited.C2Csl8Pa.jpg","/_astro/IMG_3523.tzq27gSM.jpg","/_astro/IMG_3528.C1XbDTW1.jpg","/_astro/IMG_3529.DkXmuYKB.jpg","/_astro/IMG_3524.B1Y8ryTD.jpg","/_astro/IMG_3520.DsTrNZyx.jpg","/_astro/IMG_3526.Cly8MoQ1.jpg","/_astro/index.Dyi-iukn.css","/favicon.svg","/form.html","/form/index.html","/success/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"f4jC3kE6McrwkA6hISy3SHdXCHy3tlg7GySRkrYWU2Y=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
