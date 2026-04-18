const { createGlobPatternsForDependencies } = require("@nx/angular/tailwind");
const path = require("path");

module.exports = () => {
  return {
    postcssPlugin: "nx-tailwind-graph-to-source",
    Once(root) {
      root.walkAtRules("nxgraphsource", (atRule) => {
        const cssFilePath = root.source?.input?.file || process.cwd();
        const appRoot = findNearestAppRoot(cssFilePath);

        if (!appRoot) return;

        const globPattern = getGlobPattern(atRule.params);

        const globs = [
          ...createGlobPatternsForDependencies(appRoot, globPattern),
          path.join(appRoot, globPattern),
        ];

        globs.reverse().forEach((glob) => {
          atRule.parent.insertBefore(atRule, {
            name: "source",
            type: "atrule",
            params: `"${glob.replace(/\\/g, "/")}"`
          });
        });

        atRule.remove();
      });
    },
  };
};

module.exports.postcss = true;

function findNearestAppRoot(startPath) {
  let dir = path.dirname(startPath);

  while (dir !== path.resolve(dir, "..")) {
    const relative = path.relative(process.cwd(), dir);
    if (relative.startsWith("apps") || relative.startsWith("libs")) {
      return dir;
    }
    dir = path.resolve(dir, "..");
  }
  return null;
}

function getGlobPattern(params) {
  if (params === "") {
    return "/**/*.{html,ts}";
  }
  return params.replace(/^['"](.*)['"]$/, "$1");
}
