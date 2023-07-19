const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "nz9g1d",
  e2e: {
    experimentalStudio: true,
    defaultCommandTimeout: 3000,
    // retries: {
    //   runMode: 3,
    //   openMode: 3,
    // },
    // baseUrl: "http://localhost:8000",
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here

      const appUrl = config.env.type || "localhost";

      const allUrls = {
        localhost: "http://localhost:8000",
        test: "http://someurl",
      };

      config.baseUrl = allUrls[appUrl];

      on("after:spec", (spec, results) => {
        if (results && results.video && results.stats.failures === 0) {
          //delete video if the spec passed
          fs.unlinkSync(results.video);
        }
      });

      return config;
    },
  },
});
