module.exports = function (plop) {
  /** @type {import('plop').NodePlopAPI} */
  plop.addHelper("upperCase", function (text) {
    return text.toUpperCase();
  });
  const pascalCase = (s) =>
      s.replace(/\w+/g, function (w) {
        return w[0].toUpperCase() + w.slice(1);
      });
  const files = {
    svgComponent: "plop-templates/svg.tsx.hbs",
    mainComponent: "plop-templates/main-component.tsx.hbs",
    styledComponent: "plop-templates/styled-component.tsx.hbs",
  };
  
  const createFunctionComponent = _ => ({
    type: "add",
    path: `src/components/{{kebabCase name}}/{{pascalCase name}}.tsx`,
    templateFile: files.mainComponent,
  });
  
    const createSvgComponent = {
      type: "add",
      path: `src/svgs/{{pascalCase name}}.tsx`,
      templateFile: files.svgComponent,
    };
  
  const createStyledComp = _ => ({
    type: "add",
    path: `src/components/{{kebabCase name}}/styles/S{{pascalCase name}}{{pascalCase suffix}}.tsx`,
    templateFile: files.styledComponent,
  });
  
  const createStyle = _ => ({
    type: "add",
    path: `src/components/{{kebabCase name}}/styles/S{{pascalCase name}}.tsx`,
    templateFile: files.styledComponent,
  });
  
  plop.setActionType("Usage:", function (answers, config, plop) {
    const {name, suffix} = answers;
    if (name && suffix) {
      return `Usage: <S${pascalCase(name)}${pascalCase(suffix)} />`;
    }
    if (name) {
      return `Usage: <${pascalCase(name)} />`;
    }
    return ``;
  });
  
  /* Input Options */
  const getComponentName = {
    type: "input",
    name: "name",
    message: "What is the component name?",
    
    validate: function (value) {
      if (/.+/.test(value)) {
        return true;
      }
      return "name is required";
    },
  };
  
  const getStyleSuffix = {
    type: "input",
    name: "suffix",
    message: "What is the styled component suffix?",
    validate: function (value) {
      if (/.+/.test(value)) {
        return true;
      }
      return "name is required";
    },
  };
  
  
  /* Generators */
  plop.setGenerator("fc", {
    description: "Function Component",
    prompts: [
      getComponentName,
    ],
    actions: () => [
      createFunctionComponent(),
      createStyle(),
      {
        type: "Usage:",
      },
    ]
    ,
  });
  
  plop.setGenerator("svg", {
    description: "SVG Component",
    prompts: [
      getComponentName,
    ],
    actions: (data) => [
      createSvgComponent,
      {
        type: "Usage:",
      },
    ]
    ,
  });
  
  plop.setGenerator("s", {
    description: "Styled Component",
    prompts: [
      getComponentName,
      getStyleSuffix,
    ],
    actions: (data) => [
      createStyledComp(),
      {
        type: "Usage:",
      },
    ]
    ,
  });
};
