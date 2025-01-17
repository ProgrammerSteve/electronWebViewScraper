const originalKeywords = [
    "Full Stack developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Engineer",
    "Frontend Engineer",
    "Backend Engineer",
    "DevOps Developer",
    "DevOps Engineer",
    "Machine Learning",
    " .NET ",
    " .NET.",
    " .NET,",
    "ASP.NET",
    "C#",
    "AWS",
    "Postgres",
    "Postgres",
    "PostgreSQL",
    "MySQL",
    "NoSQL",
    "MongoDB",
    "Oracle",
    "HTML",
    "HTML5",
    "CSS",
    "Javascript",
    "Front-end",
    "Powershell",
    "Ruby",
    "Jenkins",
    "Git",
    "Ansible",
    "Nginx",
    "JSON",
    "API",
    "Angular",
    "Angular JS",
    "React",
    "Typescript",
    "React Native",
    "Redux",
    "Jest",
    "Python",
    "Node",
    "Node.js",
    "Express.js",
    "Java",
    "Agile",
    "Scrum",
    " Go ",
    " Go.",
    " Go,",
    "Golang",
    " Ios ",
    " Ios,",
    " Ios.",
    "Android",
    " AI ",
    " AI,",
    " AI.",
    "Generative AI",
    "LLM",
    "ChatGPT",
    "LLama",
    "LLama2",
    "GraphQL",
    "Kubernetes",
    "Docker",
    "CI/CD",
    "DevOps",
    "Azure",
    "GCP",
    "Google Cloud Platform (GCP)",
    "Terraform",
    "Kotlin",
    "Swift",
    "Spring Boot",
    "Hibernate",
    "Selenium",
    "Puppeteer",
    "Electron",
    "Vue.js",
    "Svelte",
    "Django",
    "Flask",
    "Ruby on Rails",
    "PHP",
    "Laravel",
    "Symfony",
    "Elixir",
    "Rust",
    "C++",
    " C ",
    " C,",
    " C.",
    "MATLAB",
    "TensorFlow",
    "PyTorch",
    "Hadoop",
    "Spark",
    "Kafka",
    "Figma",
    "Sketch",
    "Adobe XD",
    " SASS ",
    " SASS.",
    " SASS,",
    " LESS ",
    " LESS.",
    " LESS,",
    "Bootstrap",
    "Tailwind",
    "TailwindCSS",
    "WebAssembly",
    "RESTful API",
    "SOAP",
    "OAuth",
    "OpenID Connect",
    "JIRA",
    "Confluence",
    "Bitbucket",
    "CircleCI",
    "Travis CI",
    "New Relic",
    "Splunk",
    "Prometheus",
    "Grafana",
    "Redis",
    "Memcached",
    "RabbitMQ",
    "ActiveMQ",
    "Zookeeper",
    "Elasticsearch",
    "Logstash",
    "Kibana",
    "Microservices",
    "Serverless",
    "FaaS (Functions as a Service)",
    "Event-driven architecture",
    "CQRS (Command Query Responsibility Segregation)",
    "TDD (Test-Driven Development)",
    "BDD (Behavior-Driven Development)",
    "Pair Programming",
    "Functional Programming",
    "Object-Oriented Programming (OOP)",
    "SOLID Principles",
    "Clean Code",
    "Refactoring",
    "Legacy Code",
    "Design Patterns",
    "UML (Unified Modeling Language)",
    "ERD (Entity-Relationship Diagram)",
    "API Gateway",
    "Istio",
    "Consul",
    "Linkerd",
    "Service Mesh",
    "ArgoCD",
    "Tekton",
    "Crossplane",
    "AWS Lambda",
    "Azure Functions",
    "Google Cloud Functions",
    "EventBridge",
    "Kinesis",
    "Step Functions",
    "AWS CloudFormation",
    "Azure Resource Manager",
    "Google Cloud Deployment Manager",
    "Pulumi",
    " Helm ",
    " Helm.",
    " Helm,",
    " Flux ",
    " Flux.",
    " Flux,",
    "Weaveworks",
    "Kustomize",
    "OpenShift",
    "Clojure",
    " Scala ",
    " Scala,",
    " Scala.",
    "Groovy",
    "Perl",
    "VB.NET",
    "Assembly Language",
    "Fortran",
    "COBOL",
    " R ",
    " R,",
    " R.",
    "MATLAB",
    "Julia",
    " SAS ",
    " SAS.",
    " SAS,",
    "SPSS",
    "D3.js",
    "Three.js",
    "WebGL",
    "Canvas",
    "WebRTC",
    "WebSockets",
    "PWA (Progressive Web Apps)",
    "AMP (Accelerated Mobile Pages)",
    "Cordova",
    "PhoneGap",
    "Ionic",
    "Xamarin",
    "Sencha Touch",
    "Backbone.js",
    "Marionette.js",
    "Ember.js",
    "Knockout.js",
    "Meteor",
    "NestJS",
    "FeathersJS",
    "Sails.js",
    "AdonisJS",
    "Socket.io",
    "Mocha",
    "Chai",
    "Sinon",
    "Cypress",
    "Enzyme",
    " Pact ",
    " Pact,",
    " Pact.",
    "Gatling",
    "Artillery",
    "Locust",
    "JMeter",
    "LoadRunner",
    "Blazemeter",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Matplotlib",
    "Seaborn",
    "NLTK (Natural Language Toolkit)",
    "Spacy",
    "Gensim",
    "Hugging Face",
    "OpenCV",
    "CUDA",
    "TensorRT",
    "MXNet",
    "Theano",
    "Caffe",
    "CNTK (Microsoft Cognitive Toolkit)",
    "Chainer",
    "PaddlePaddle",
    "ONNX (Open Neural Network Exchange)",
    "Ray",
    "Dask",
    "Streamlit",
    "Dash",
    "Plotly",
    "Bokeh",
    "Altair",
    "Airflow",
    "Luigi",
    "Prefect",
    "Oozie",
    "MLflow",
    "Kubeflow",
    "Metaflow",
    "DVC (Data Version Control)",
    "Snowflake",
    "BigQuery",
    "Redshift",
    "Athena",
    "Presto",
    "Trino",
    "Apache Arrow",
    "Parquet",
    "Avro",
    "ORC (Optimized Row Columnar)",
    "HBase",
    "Cassandra",
    "Neo4j",
    "Couchbase",
    "ArangoDB",
    "DynamoDB",
    "FaunaDB",
    "ScyllaDB",
    "InfluxDB",
    "TimescaleDB",
    "ClickHouse",
    "Vertica",
    "Greenplum",
    "Firebolt",
    "Rockset",
    "Elastic Stack",
    "Graylog",
    "Splunk",
    "Fluentd",
    "LogDNA",
    "Sumo Logic",
    "Datadog",
    "Honeycomb",
    "New Relic",
    "AppDynamics",
    "Dynatrace",
    "Sentry",
    "Rollbar",
    "Bugsnag",
    "Airbrake",
    "Raygun",
    "Lighthouse",
    "PWA Studio",
    "Stellar",
    "Gatsby",
    "Next.js",
    "Nuxt.js",
    "Gridsome",
    "11ty (Eleventy)",
    "Sapper",
    "RedwoodJS",
    "Blitz.js",
    "Remix",
    "Parcel",
    "Snowpack",
    "Vite",
    "Webpack",
    "Rollup",
    "ESBuild",
    "Browserify",
    "Gulp",
    "Grunt",
    "Babel",
    "TypeORM",
    "Sequelize",
    "Mongoose",
    "Bookshelf.js",
    "Prisma",
    "Objection.js",
    "Waterline",
    "Typegoose",
    "Parse Server",
    "Firestore",
    "Realm",
    "CouchDB",
    "PouchDB",
    "RxDB",
    "Dexie.js",
    "Gun.js",
    "Hoodie",
    "NoDB",
    "Appwrite",
    "Supabase",
    "Firebase",
    "AWS Amplify",
    "Netlify CMS",
    "Strapi",
    "Sanity.io",
    "Contentful",
    "Prismic",
    "DatoCMS",
    "Ghost",
    "WordPress",
    "Drupal",
    "Joomla",
    "Magento",
    "Shopify",
    "WooCommerce",
    "BigCommerce",
    "Squarespace",
    "Wix",
    "Webflow",
    "Bubble",
    "Glide",
    "Adalo",
    "Backendless",
    "OutSystems",
    "Mendix",
    "Quick Base",
    "Zoho Creator",
    "Betty Blocks",
    "Caspio",
    "Microsoft Power Apps",
    "Oracle APEX",
    "AppSheet",
    "Integromat",
    "Zapier",
    "Tray.io",
  ];
export const keywords=originalKeywords.map(k=>k.toLowerCase())