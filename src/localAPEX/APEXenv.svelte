<script>
  import { themes } from "./constants";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";
  import initAPEXlang from "./initAPEXlang";

  window.v3 = "24.1.3";
  window.v2 = v3.split(".").slice(0, 2).join(".");
  window.applyVersion = (url) => {
    return url.replace(/#v3#/g, window.v3).replace(/#v2#/g, window.v2);
  };
  window.faVersion = "2.3";

  window.theme = sessionStorage.getItem("theme") || themes[0].name;
  window.themeSrc = themes
    .find((t) => t.name === window.theme)
    .src.map(
      (src) => "https://static.oracle.com/cdn" + window.applyVersion(src)
    );

  let jqueryReady = false;

  function allLoaded() {
    apex.debug.setLevel(apex.debug.LOG_LEVEL.APP_TRACE);
    console.log("apex.debug", apex.debug);

    apex.jQuery(function () {
      apex.page.init(this, function () {
        try {
          (function () {
            apex.debug.trace("init apex done");
          })();
          (function () {
            apex.jQuery("body").addClass("t-PageBody--leftNav");
          })();
        } catch (e) {
          apex.debug.error(e);
        }
        apex.item.waitForDelayLoadItems().done(function () {
          try {
            //apex.theme42.initializePage.noSideCol();

            apex.page.warnOnUnsavedChanges();
          } finally {
            initAPEXlang(window.apex);

            apex.event.trigger(apex.gPageContext$, "apexreadyend");
            window.dispatchEvent(new Event("apexready"));
          }
        });
      });
    });
  }
</script>

<div id="wwvFlowForm">
  <script>
    function loadCSS(href) {
      let replacedHref = window.applyVersion(href);
      const link = document.createElement("link");
      link.href = replacedHref;
      link.rel = "stylesheet";
      link.type = "text/css";

      const head = document.getElementsByTagName("head")[0];
      head.appendChild(link);
    }

    loadCSS(
      "https://static.oracle.com/cdn/apex/#v3#/themes/theme_42/#v2#/css/Core.min.css?v=#v3#"
    );
    loadCSS(
      "https://static.oracle.com/cdn/apex/#v3#/app_ui/css/Theme-Standard.css?v=#v3#"
    );
    loadCSS(
      "https://static.oracle.com/cdn/apex/#v3#/app_ui/css/Core.css?v=#v3#"
    );
    loadCSS(
      `https://static.oracle.com/cdn/apex/#v3#/libraries/font-apex/${window.faVersion}/css/font-apex.min.css?v=#v3#`
    );

    for (const theme of window.themeSrc) {
      loadCSS(theme);
    }
  </script>
  <script>
    function loadFont(family, url) {
      const styleTag = document.createElement("style");
      styleTag.innerHTML = `@font-face { 
        font-family: "${family}"; 
        src: url(${url}) format("woff2")
             url(${url.replace(".woff2", ".woff")}) format("woff");
        font-weight: 400; 
        font-style: normal; 
      }`;
    }

    loadFont(
      "Font APEX Small",
      `https://static.oracle.com/cdn/apex/23.2.4/libraries/font-apex/${window.faVersion}/fonts/Font-APEX-Small.woff2?`
    );
    loadFont(
      "Font APEX Large",
      `https://static.oracle.com/cdn/apex/23.2.4/libraries/font-apex/${window.faVersion}/fonts/Font-APEX-Large.woff2?`
    );
  </script>
  <script>
    var apex_img_dir = "\u002Fi\u002F";
    var apex = {
      env: {
        APP_USER: "ADMIN",
        APP_ID: "111",
        APP_PAGE_ID: "500",
        APP_SESSION: "3364513634026",
        APP_FILES:
          "r\u002Funited-codes\u002F111\u002Ffiles\u002Fstatic\u002Fv31\u002F",
        WORKSPACE_FILES:
          "r\u002Funited-codes\u002Ffiles\u002Fstatic\u002Fv1\u002F",
        APEX_VERSION: window.v3,
        APEX_BASE_VERSION: window.v2,
      },
      libVersions: {
        ckeditor5: "36.0.0",
        cropperJs: "1.5.13",
        domPurify: "3.0.5",
        fullcalendar: "6.1.8",
        hammer: "2.0.8",
        jquery: "3.6.4",
        jqueryUi: "1.13.2",
        maplibre: "2.4.0",
        markedJs: "5.1.2",
        prismJs: "1.29.0",
        oraclejet: "15.0.7",
        tinymce: "6.7.1",
        turndown: "7.1.1",
        monacoEditor: "0.32.1",
        lessJs: "4.1.3",
      },
    };
  </script>
  <script
    src={window.applyVersion(
      "https://apex.oracle.com/i/libraries/apex/minified/desktop_all.min.js?v=#v3#"
    )}
    onload={allLoaded}
  ></script>
  <ThemeSwitcher />
</div>

<!-- <style>
  @font-face {
    font-family: "Font APEX Small";
    src:
      url(https://static.oracle.com/cdn/apex/23.2.4/libraries/font-apex/2.2.1/fonts/Font-APEX-Small.woff2?)
        format("woff2"),
      url(https://static.oracle.com/cdn/apex/23.2.4/libraries/font-apex/2.2.1/fonts/Font-APEX-Small.woff?)
        format("woff");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Font APEX Large";
    src:
      url(https://static.oracle.com/cdn/apex/23.2.4/libraries/font-apex/2.2.1/fonts/Font-APEX-Large.woff2?)
        format("woff2"),
      url(https://static.oracle.com/cdn/apex/23.2.4/libraries/font-apex/2.2.1/fonts/Font-APEX-Large.woff?)
        format("woff");
    font-weight: 400;
    font-style: normal;
  }
</style> -->
